<template>
  <div class="bg-white border rounded-md shadow-sm dark:bg-black dark:border-gray-darkest">
    <div class="flex flex-col p-4 border-b dark:border-gray-darkest md:p-6 sm:flex-row">
      <div class="flex flex-col flex-grow space-y-4">
        <div class="flex items-baseline space-x-2">
          <strong class="flex-grow sm:flex-grow-0">Miner: {{ account.tag || 'unknown' }}</strong>
          <strong class="text-gray-dark text-sm">{{ account.name }}</strong>
          <Icon
            name="trash"
            class="text-danger cursor-pointer"
            @click="onDelete" />
        </div>
        <div class="flex flex-col space-y-2 text-gray-darkest dark:text-gray-lightest">
          <div class="flex flex-col lg:space-x-6 lg:flex-row">
            <Balance
              :amount="account.tlm"
              :expanded="!$screen.sm"
              :decimals="4"
              type="TLM" />
            <Balance
              :amount="account.wax"
              :expanded="!$screen.sm"
              type="WAX" />
          </div>
          <div class="flex items-baseline space-x-2 mr-1">
            <Icon
              name="processor"
              class="text-gray-dark" />
            <span class="text-sm flex-grow sm:flex-grow-0">CPU Staked</span>
            <strong class="text-sm">{{ account.cpu.staked.toFixed(2) }} WAX</strong>
          </div>
        </div>
      </div>
      <div class="flex flex-nowrap items-center justify-between space-x-4 mt-6 sm:mt-0">
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
    <div class="flex flex-col lg:flex-row">
      <div class="flex flex-grow flex-col items-baseline space-y-4 p-4 border-b sm:flex-row sm:space-x-4 sm:space-y-0 md:px-6 lg:border-0 dark:border-gray-darkest">
        <div class="flex items-baseline flex-nowrap space-x-2">
          <Icon name="calendar-alt" class="text-gray-dark" />
          <span class="text-sm">Last Mined</span>
          <DateTime
            :value="lastMinedAt"
            tag="strong"
            empty="Loading..."
            class="text-sm"
            relative
            utc />
        </div>
        <div class="flex items-center space-x-1 text-xs">
          <a
            v-for="mine in history"
            :key="mine.last_mine_tx"
            :href="transactionLink(mine.last_mine_tx)"
            target="_blank">
            <Tag :text="mine.info.quantity" />
          </a>
        </div>
      </div>
      <div class="flex px-4 py-2 items-baseline justify-between space-x-4 font-semibold text-primary md:px-6 lg:py-4">
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
  inject: ['$app', '$screen'],
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
      const lastMine = this.account.lastMine
      return lastMine && lastMine.last_mine
    },
    history() {
      const items = [...this.account.history]

      return this.$screen.md
        ? items
        : this.$screen.xs ? items.splice(-4) : items.splice(-3)
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
