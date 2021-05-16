<template>
  <div
    v-if="$app.hasAccounts"
    class="border-b dark:bg-black dark:border-gray-darkest">
    <div class="flex flex-col items-stretch justify-between container py-4 lg:flex-row">
      <div class="flex flex-col justify-between sm:flex-row lg:space-x-6">
        <Balance
          :amount="$app.totalTLM"
          :decimals="4"
          type="TLM" />
        <Balance
          :amount="$app.totalWAX"
          type="WAX" />
      </div>
      <div class="flex flex-col-reverse items-justify justify-between sm:items-center sm:flex-row-reverse lg:flex-row lg:space-x-4">
        <span class="flex justify-between text-gray-dark text-sm space-x-2 mt-2 mr-1 sm:mt-0 lg:mr-0">
          <span>Binance TLM Price:</span>
          <span>{{ $app.tlmPrice }} {{ $app.moneyType }}</span>
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
