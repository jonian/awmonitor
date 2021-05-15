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
      accounts: []
    }
  },
  computed: {
    loading() {
      return this.accounts.some(({ loading }) => !loading)
    },
    totalTLM() {
      return this.sumAmounts('tlm')
    },
    totalWAX() {
      return this.sumAmounts('wax')
    },
    totalMoney() {
      return this.totalTLM * this.tlmPrice
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
      this.accounts.forEach(account => account.update(true))

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
    this.updateTlmPrice()
    this.scheduleRefresh()
  }
}
</script>
