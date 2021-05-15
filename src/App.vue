<template>
  <router-view />
  <Dialog
    v-model="showShare"
    :cancel-button="false"
    confirm-button="Copy URL"
    size="small"
    title="Share dashboard"
    class="dark text-white"
    @confirm="onCopyUrl">
    <div class="flex flex-col items-center justify-center my-4 space-y-4">
      <img
        :src="qrCodeUrl"
        width="250"
        height="250"
        class="max-w-full h-auto rounded-3xl" />
      <strong class="block text-lg">
        Scan QR code or copy URL
      </strong>
      <span class="block text-xs text-center">
        {{ shareUrl.replace('https://', '') }}
      </span>
    </div>
  </Dialog>
</template>

<script>
import { binance } from '@/apis'
import { Account } from '@/models'

import { isDark, moneyType, accountNames, hashids } from '@/utils'
import { useClipboard } from '@vueuse/core'

const { copy } = useClipboard({ read: false })

export default {
  name: 'App',
  provide() {
    return {
      $app: this
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
      accounts: [],
      showShare: false
    }
  },
  computed: {
    shareUrl() {
      const hash = hashids.encode(this.accountNames)
      return `https://awmonitor.netlify.app/share/${hash}`
    },
    qrCodeUrl() {
      return `https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=${this.shareUrl}&choe=UTF-8`
    },
    isDark() {
      return isDark.value
    },
    moneyType() {
      return moneyType.value
    },
    accountNames() {
      return accountNames.value
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
    async onCopyUrl() {
      await copy(this.shareUrl)
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
    share() {
      this.showShare = true
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
      account.update()

      this.accounts.push(account)
      this.saveAccountNames()
    },
    removeAccount(name) {
      const index = this.accounts.findIndex(account => account.name == name)
      this.accounts.splice(index, 1)
      this.saveAccountNames()
    }
  }
}
</script>
