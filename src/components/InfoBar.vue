<template>
  <div class="border-b dark:bg-black dark:border-gray-darkest">
    <div class="flex items-center justify-between container py-4">
      <div class="flex space-x-6">
        <Balance
          :amount="totalTLM"
          :decimals="4"
          type="TLM" />
        <Balance
          :amount="totalWAX"
          type="WAX" />
      </div>
      <div class="flex items-center space-x-4">
        <span class="text-gray-dark text-sm">
          Binance TLM Price: {{ tlmPrice }} {{ moneyType }}
        </span>
        <Balance
          :amount="totalMoney"
          :type="moneyType">
          <Icon
            name="setting"
            class="text-gray-light" />
        </Balance>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoBar',
  inject: ['$app'],
  data() {
    return {
      moneyType: 'USDT',
      tlmPrice: 0.38191635
    }
  },
  computed: {
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
    sumAmounts(key) {
      return this.$app.accounts.reduce((total, item) => {
        const amount = item[key] || 0
        return total + amount
      }, 0)
    }
  }
}
</script>
