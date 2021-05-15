<template>
  <div class="flex items-center justify-between mb-6">
    <div class="flex items-center space-x-4">
      <h2 class="font-bold text-xl">Accounts</h2>
      <Icon
        name="plus-circle"
        class="text-primary transform scale-150 cursor-pointer"
        @click="onAddAccount" />
    </div>
    <span class="text-sm text-gray-light">
      Last update: {{ updatedAt }}
    </span>
  </div>
  <div class="flex flex-col space-y-6">
    <template v-for="account in $app.accounts">
      <AccountCard
        v-if="!account.loading && !account.error"
        :key="account.name"
        :account="account" />
    </template>
    <SupportCard />
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  inject: ['$app'],
  data() {
    return {
      newAccount: null
    }
  },
  computed: {
    updatedAt() {
      const date = this.$app.updatedAt
      const time = date.toLocaleTimeString([], { hour12: false })

      return `${date.toDateString()} ${time}`
    }
  },
  methods: {
    onAddAccount() {
      if (this.newAccount) {
        this.$app.addAccount(this.newAccount)
        this.newAccount = null
      }
    }
  }
}
</script>
