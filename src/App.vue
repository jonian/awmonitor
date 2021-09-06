<template>
  <router-view />
</template>

<script>
import { binance } from '@/apis'
import { Account } from '@/models'

import { isDark, isOnline, screen, isTimeAfter } from '@/utils'
import { moneyType, accountNames } from '@/utils'
import { tlmPrice, updatedAt } from '@/store'

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
    isOnline: {
      handler() {
        if (isTimeAfter(this.updatedAt, 60)) {
          this.scheduleRefresh(3000)
        }
      }
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
      updateId: null,
      totalTLM: null,
      totalWAX: null,
      accounts: []
    }
  },
  computed: {
    isDark() {
      return isDark.value
    },
    isOnline() {
      return isOnline.value
    },
    moneyType() {
      return moneyType.value
    },
    tlmPrice() {
      return tlmPrice.value
    },
    updatedAt() {
      return updatedAt.value
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
        tlmPrice.value = parseFloat(data.price)
      } catch (e) {
        return
      }
    },
    async updateAccounts() {
      for (const account of this.accounts) {
        await account.update()
      }

      this.updateTotals()
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
      this.updateTotals()

      if (this.isOnline) {
        this.updateTlmPrice()
        this.updateAccounts()

        updatedAt.value = new Date()
        this.scheduleRefresh()
      }
    },
    scheduleRefresh(ms = 60000) {
      clearTimeout(this.updateId)
      this.updateId = setTimeout(() => this.refresh(), ms)
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
