<template>
  <router-view />
</template>

<script>
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
      accounts: []
    }
  },
  computed: {
    loading() {
      return this.accounts.some(({ loading }) => !loading)
    }
  },
  methods: {
    share() {
      alert('Not ready yet')
    },
    refresh() {
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
    this.scheduleRefresh()
  }
}
</script>
