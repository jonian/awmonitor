<template>
  <router-view />
</template>

<script>
import { binance } from '@/apis'
import { Account } from '@/models'

export default {
  name: 'App',
  provide() {
    return {
      $app: this
    }
  },
  data() {
    return {
      updatedAt: new Date(),
      updateId: null,
      moneyType: 'USDT',
      tlmPrice: 0,
      totalTLM: null,
      totalWAX: null,
      accounts: []
    }
  },
  computed: {
    loading() {
      return this.accounts.some(({ loading }) => loading)
    },
    totalMoney() {
      return this.totalTLM ? this.totalTLM * this.tlmPrice : null
    }
  },
  methods: {
    async updateTlmPrice() {
      try {
        const data = await binance.avgPrice(this.moneyType)
        this.tlmPrice = parseFloat(data.price)
      } catch (e) {
        this.tlmPrice = 0
      }
    },
    async updateAccounts() {
      const lastIdx = this.accounts.length - 1

      this.accounts.forEach(async (account, index) => {
        await account.update()

        if (index == lastIdx) {
          this.totalTLM = this.sumAmounts('tlm')
          this.totalWAX = this.sumAmounts('wax')
        }
      })
    },
    sumAmounts(key) {
      return this.accounts.reduce((total, item) => {
        const amount = item[key] || 0
        return total + amount
      }, 0)
    },
    share() {
      alert('Not ready yet')
    },
    refresh() {
      this.updateTlmPrice()
      this.updateAccounts()

      this.updatedAt = new Date()
      this.scheduleRefresh()
    },
    scheduleRefresh() {
      clearTimeout(this.updateId)
      this.updateId = setTimeout(() => this.refresh(), 60000)
    },
    addAccount(name) {
      const account = new Account(name)
      this.accounts.push(account)
    },
    removeAccount(name) {
      const index = this.accounts.findIndex(account => account.name == name)
      this.accounts.splice(index, 1)
    }
  },
  mounted() {
    this.refresh()
  }
}
</script>
