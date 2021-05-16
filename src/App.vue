<template>
  <router-view />
</template>

<script>
import { binance } from '@/apis'
import { Account } from '@/models'

import { isDark, screen } from '@/utils'
import { moneyType, accountNames } from '@/utils'

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
      const lastIdx = this.accounts.length - 1

      this.accounts.forEach(async (account, index) => {
        await account.update()

        if (index == lastIdx) {
          this.totalTLM = this.sumAmounts('tlm')
          this.totalWAX = this.sumAmounts('wax')
        }
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
        account.update()

        this.accounts.push(account)
        this.saveAccountNames()
      }
    },
    removeAccount(name) {
      const index = this.accounts.findIndex(account => account.name == name)
      this.accounts.splice(index, 1)
      this.saveAccountNames()
    }
  }
}
</script>
