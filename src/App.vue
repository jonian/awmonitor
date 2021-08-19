<template>
  <router-view />
</template>

<script>
import { binance } from '@/apis'
import { Account } from '@/models'

import { isDark, screen } from '@/utils'
import { moneyType, accountNames } from '@/utils'

import delay from 'delay'

export default {
  name: 'App',
  provide() {
    return {
      $app: this,
      $screen: screen.value
    }
  },
  watch: {
    isDark: {
      handler(value) {
        document.documentElement.classList.toggle('dark', value)
      },
      immediate: true
    },
    accountNames: {
      handler() {
        if (!this._saveAccounts) {
          this.accounts = this.accountNames.map(name => new Account(name))
          this.refresh()
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      updatedAt: new Date(),
      updateId: null,
      tlmPrice: 0,
      totalTLM: null,
      totalWAX: null,
      accounts: []
    }
  },
  computed: {
    isDark() {
      return isDark.value
    },
    moneyType() {
      return moneyType.value
    },
    accountNames() {
      return accountNames.value
    },
    hasAccounts() {
      return this.accountNames.length > 0
    },
    loading() {
      return this.accounts.some(({ loading }) => loading)
    },
    totalMoney() {
      return this.totalTLM == null ? null : this.totalTLM * this.tlmPrice
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
      this.accounts.forEach(async (account) => {
        await delay(1000)
        await account.update()

        this.updateTotals()
      })
    },
    saveAccountNames() {
      this._saveAccounts = true
      accountNames.value = this.accounts.map(({ name }) => name)

      this.$nextTick(() => this._saveAccounts = false)
    },
    sumAmounts(key) {
      return this.accounts.reduce((total, item) => {
        const amount = item[key] || 0
        return total + amount
      }, 0)
    },
    updateTotals() {
      this.totalTLM = this.sumAmounts('tlm')
      this.totalWAX = this.sumAmounts('wax')
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
      if (!this.accountNames.includes(name)) {
        const account = new Account(name)
        account.update(() => this.updateTotals())

        this.accounts.push(account)
        this.saveAccountNames()
      }
    },
    removeAccount(name) {
      const index = this.accounts.findIndex(account => account.name == name)
      this.accounts.splice(index, 1)

      this.saveAccountNames()
      this.updateTotals()
    }
  }
}
</script>
