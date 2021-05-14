import { ref, reactive, computed } from 'vue'
import { wax, pink, eosrio, greymass } from '@/apis'

const parseAmount = val => val ? parseFloat(val.slice(0, -4)) : 0.0
const parseBalance = val => val ? { quantity: val, amount: parseAmount(val) } : { amount: 0.0 }

const parseTransaction = async (data) => {
  try {
    const res = await eosrio.getTransaction(data.last_mine_tx)
    data.info = res.actions[1].act.data
  } catch {
    try {
      const res = await greymass.getTransaction(data.last_mine_tx)
      const val = res.traces[1].act.data
      data.info = { ...val, amount: parseAmount(val.quantity) }
    } catch {
      data.info = { amount: 0.0 }
    }
  }

  return data
}

const parseLimit = (key, data) => {
  const limit = data[`${key}_limit`]

  if (limit != null) {
    const resources = Object(data.self_delegated_bandwidth || data.total_resources)
    const staked = parseAmount(resources[`${key}_weight`])
    const percent = Math.round(limit.used / limit.max * 100)

    return { ...limit, percent, staked }
  }
}

const parseRamLimit = ({ ram_quota, ram_usage, total_resources }) => {
  if (ram_usage != null) {
    const percent = Math.round(ram_usage / ram_quota * 100)
    const available = total_resources.ram_bytes

    return { used: ram_usage, available, max: ram_quota, percent, staked: 0 }
  }
}

export default class Account {
  constructor(name) {
    this.name = name
    this.loading = ref(false)
    this.error = ref(null)
    this.history = ref([])

    this.data = reactive({
      account: {},
      player: {},
      history: [],
      tlm: {},
      wax: {}
    })

    this.tag = computed(() => this.data.player.tag)
    this.tlm = computed(() => this.data.tlm.amount)
    this.wax = computed(() => this.data.wax.amount)
    this.cpu = computed(() => parseLimit('cpu', this.data.account))
    this.net = computed(() => parseLimit('net', this.data.account))
    this.ram = computed(() => parseRamLimit(this.data.account))

    this.history = computed(() => this.data.history)
    this.lastMine = computed(() => this.data.history.slice(-1)[0])

    this.update()
  }

  async update() {
    this.error.value = null
    this.loading.value = true

    try {
      await this._updateAccount()
      await this._updateTLM()
      await this._updateWAX()
      await this._updatePlayer()
      await this._updateMiner()
    } catch (err) {
      this.error.value = err
    } finally {
      this.loading.value = false
    }
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
    const data = await pink.getPlayer(this.name)
    this.data.player = data.rows[0]
  }

  async _updateMiner() {
    const data = await pink.getMiner(this.name)
    const mine = await parseTransaction(data.rows[0])

    this.data.history = this.data.history.concat(mine).splice(-5)
  }
}
