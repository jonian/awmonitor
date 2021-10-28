import delay from 'delay'

import { reactive, computed } from 'vue'
import { wax, atomicassets, alienworlds } from '@/apis'
import { dayjs, isOnline } from '@/utils'

const parseAmount = val => val ? parseFloat(val.slice(0, -4)) : 0.0

const parseBalance = quantity => {
  if (quantity) {
    return { quantity, amount: parseAmount(quantity) }
  } else {
    return { quantity: '0.0000 TLM', amount: 0.0 }
  }
}

const parseTransaction = async (data) => {
  try {
    const res = await wax.getTransaction(data.last_mine_tx)
    const val = res.traces[1].act.data
    data.info = { ...val, amount: parseAmount(val.quantity) }
  } catch {
    data.info = { quantity: '0.0000 TLM', amount: 0.0 }
  }

  try {
    const res = await atomicassets.getAsset(data.current_land)
    data.land = res.data.data
  } catch (e) {
    data.land = { commission: 0 }
  }

  return data
}

const parseLimit = (key, data) => {
  const limit = data[`${key}_limit`]

  if (limit != null) {
    const resources = Object(data.self_delegated_bandwidth || data.total_resources)
    const staked = parseAmount(resources[`${key}_weight`])
    const percent = limit.max ? Math.round(limit.used / limit.max * 100) : 100

    return { ...limit, percent, staked }
  } else {
    return { used: 0, available: 0, max: 0, percent: 100, staked: 0 }
  }
}

const parseRamLimit = ({ ram_quota, ram_usage, total_resources }) => {
  if (ram_usage != null) {
    const percent = Math.round(ram_usage / ram_quota * 100)
    const available = total_resources.ram_bytes

    return { used: ram_usage, available, max: ram_quota, percent, staked: 0 }
  } else {
    return { used: 0, available: 0, max: 0, percent: 0, staked: 0 }
  }
}

export default class Account {
  constructor(name) {
    this.name = name
    this.data = reactive({
      loading: false,
      error: null,
      account: {},
      history: [],
      claims: [],
      lastMine: null,
      nextMine: null,
      player: {},
      tlm: {},
      wax: {}
    })

    this.tag = computed(() => this.data.player.tag)
    this.tlm = computed(() => this.data.tlm.amount)
    this.wax = computed(() => this.data.wax.amount)
    this.cpu = computed(() => parseLimit('cpu', this.data.account))
    this.net = computed(() => parseLimit('net', this.data.account))
    this.ram = computed(() => parseRamLimit(this.data.account))

    this.loading = computed(() => this.data.loading)
    this.error = computed(() => this.data.error)

    this.history = computed(() => this.data.history)
    this.lastMine = computed(() => this.data.lastMine)
    this.nextMine = computed(() => this.data.nextMine)
    this.claims = computed(() => this.data.claims)

    this.init()
  }

  loadState() {
    const store = localStorage.getItem(`store-${this.name}`)
    const state = JSON.parse(store || '{}')

    if (isOnline.value) {
      state.history = []
      state.lastMine = null
    }

    Object.keys(state).forEach(key => {
      if (!key.match(/error|loading/)) {
        this.data[key] = state[key]
      }
    })
  }

  saveState() {
    const state = Object.keys(this.data).reduce((object, key) => {
      if (key == 'history' && this.data.lastMine) {
        object[key] = [{ ...this.data.lastMine, stale: true }]
      } else if (!key.match(/error|loading/)) {
        object[key] = this.data[key]
      }

      return object
    }, {})

    localStorage.setItem(`store-${this.name}`, JSON.stringify(state))
  }

  async init() {
    this.loadState()

    this.data.error = null
    this.data.loading = true

    try {
      await delay.range(500, 800)
      await this._updatePlayer()
    } catch (err) {
      this.data.error = err
    } finally {
      this.data.loading = false
      this.saveState()
    }
  }

  async update(onUpdate) {
    this.data.error = null
    this.data.loading = true

    try {
      await delay.range(500, 800)

      await this._updateAccount()
      await this._updateTLM()
      await this._updateWAX()
      await this._updateMiner()
      await this._updateNext()
      await this._updateClaims()
      await this._updateHistory()
    } catch (err) {
      this.data.error = err
    } finally {
      this.data.loading = false
      this.saveState()
    }

    onUpdate && onUpdate(this)
  }

  async _updateAccount() {
    this.data.account = await wax.getAccount(this.name)
  }

  async _updateTLM() {
    const data = await wax.getTLM(this.name)
    this.data.tlm = parseBalance(data[0])
  }

  async _updateWAX() {
    const data = await wax.getWAX(this.name)
    this.data.wax = parseBalance(data[0])
  }

  async _updatePlayer() {
    const data = await wax.getPlayer(this.name)
    this.data.player = data.rows[0]
  }

  async _updateMiner() {
    const data = await wax.getMiner(this.name)
    const mine = data.rows[0]
    const last = this.data.history.find(item => item.last_mine_tx == mine.last_mine_tx)

    if (last == null) {
      this.data.lastMine = await parseTransaction(mine)
      this.data.history  = [...this.data.history, this.data.lastMine].splice(-5)
    } else {
      last.stale = false
    }

    if (this.data.history.length == 2 && this.data.history[0].stale) {
      this.data.history = Array.of(this.data.history[1])
    }
  }

  async _updateHistory() {
    this.data.history.forEach(async item => {
      if (item.info.amount == 0) {
        await parseTransaction(item)
      }
    })
  }

  async _updateNext() {
    const mine = await alienworlds.getLastMine(this.name)
    const date = dayjs.utc(this.data.lastMine.last_mine)

    this.data.nextMine = date.add(mine.params.delay, 'second').toString()
  }

  async _updateClaims() {
    const data = await wax.getClaims(this.name)
    this.data.claims = data.rows.reduce((ids, item) => ([...ids, ...item.template_ids]), [])
  }
}
