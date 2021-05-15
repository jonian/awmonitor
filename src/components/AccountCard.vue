<template>
  <div class="bg-white border rounded-md shadow-sm dark:bg-black dark:border-gray-darkest">
    <div class="flex p-6 border-b dark:border-gray-darkest">
      <div class="flex flex-col flex-grow space-y-4">
        <div class="flex items-baseline space-x-2">
          <strong>Miner: {{ account.tag || 'unknown' }}</strong>
          <strong class="text-gray-dark text-sm">{{ account.name }}</strong>
          <Icon
            name="trash"
            class="text-danger cursor-pointer"
            @click="onDelete" />
        </div>
        <div class="flex flex-col space-y-2 text-gray-darkest dark:text-gray-lightest">
          <div class="flex space-x-6">
            <Balance
              :amount="account.tlm"
              :decimals="4"
              type="TLM" />
            <Balance
              :amount="account.wax"
              type="WAX" />
          </div>
          <div class="flex items-baseline space-x-2">
            <Icon
              name="processor"
              class="text-gray-dark" />
            <span class="text-sm">CPU Staked</span>
            <strong class="text-sm">{{ account.cpu.staked.toFixed(2) }} WAX</strong>
          </div>
        </div>
      </div>
      <div class="flex flex-nowrap items-center space-x-4">
        <ResourceStats
          :stats="account.cpu"
          title="CPU"
          metric="ms"
          class="text-cyan" />
        <ResourceStats
          :stats="account.net"
          title="NET"
          metric="ms"
          class="text-yellow" />
        <ResourceStats
          :stats="account.ram"
          title="RAM"
          metric="KB"
          class="text-orange" />
      </div>
    </div>
    <div class="flex px-6 py-4">
      <div class="flex flex-grow items-baseline space-x-4">
        <div class="flex items-baseline flex-nowrap space-x-2">
          <Icon name="calendar-alt" class="text-gray-dark" />
          <span class="text-sm">Last Mined</span>
          <strong class="text-sm">{{ lastMinedAt }}</strong>
        </div>
        <div class="flex items-center space-x-1 text-xs">
          <a
            v-for="mine in account.history"
            :key="mine.last_mine_tx"
            :href="transactionLink(mine.last_mine_tx)"
            target="_blank">
            <Tag :text="mine.info.quantity" />
          </a>
        </div>
      </div>
      <div class="flex items-baseline justify-between space-x-4 font-semibold text-primary">
        <div
          v-for="link in links"
          :key="link.href"
          class="flex flex-nowrap items-baseline space-x-2">
          <Icon name="external-link-alt" />
          <a :href="link.href" target="_blank" class="text-sm">{{ link.text }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountCard',
  inject: ['$app'],
  props: {
    account: {
      type: Object,
      required: true
    }
  },
  computed: {
    links() {
      return [
        { text: 'View on Bloks', href: `https://wax.bloks.io/account/${this.account.name}` },
        { text: 'View NFT', href: `https://wax.atomichub.io/explorer/account/${this.account.name}` }
      ]
    },
    lastMinedAt() {
      if (!this.account.lastMine) {
        return 'Loading...'
      } else {
        const date = new Date(this.account.lastMine.last_mine)
        const time = date.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })

        return `${date.toDateString()} ${time}`
      }
    }
  },
  methods: {
    onDelete() {
      return this.$app.removeAccount(this.account.name)
    },
    transactionLink(id) {
      return `https://wax.bloks.io/transaction/${id}`
    }
  }
}
</script>
