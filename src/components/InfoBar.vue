<template>
  <div class="border-b dark:bg-black dark:border-gray-darkest">
    <div class="flex items-center justify-between container py-4">
      <div class="flex space-x-6">
        <Balance
          :amount="$app.totalTLM"
          :decimals="4"
          type="TLM" />
        <Balance
          :amount="$app.totalWAX"
          type="WAX" />
      </div>
      <div class="flex items-center space-x-4">
        <span class="text-gray-dark text-sm">
          Binance TLM Price: {{ $app.tlmPrice }} {{ $app.moneyType }}
        </span>
        <Balance
          :amount="$app.totalMoney"
          :type="$app.moneyType">
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
  inject: ['$app']
}
</script>
