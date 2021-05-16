<template>
  <div class="flex items-center justify-between mb-6">
    <div class="flex items-center space-x-4">
      <h2 class="font-bold text-xl">Accounts</h2>
      <AddAccountButton />
    </div>
    <span class="text-sm text-gray-light">
      Last update: {{ updatedAt }}
    </span>
  </div>
  <div class="flex flex-col space-y-6">
    <AccountCard
      v-for="account in $app.accounts"
      :key="account.name"
      :account="account" />
    <SupportCard />
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  inject: ['$app'],
  computed: {
    updatedAt() {
      const date = this.$app.updatedAt
      const time = date.toLocaleTimeString([], { hour12: false })

      return `${date.toDateString()} ${time}`
    }
  }
}
</script>
