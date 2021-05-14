<template>
  <div class="flex flex-nowrap items-center space-x-2">
    <img
      :src="imagePath"
      :alt="type"
      :style="{ width: '1rem', height: '1rem' }">
    <span class="text-sm">{{ type }} Total</span>
    <strong class="text-sm">{{ amount.toFixed(decimals) }}</strong>
    <Icon
      v-bind="iconAttrs"
      class="transform scale-150" />
  </div>
</template>

<script>
export default {
  name: 'Balance',
  props: {
    type: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    decimals: {
      type: Number,
      default: 2
    },
    change: {
      type: Number,
      default: 0
    }
  },
  computed: {
    imagePath() {
      return `/${this.type.toLowerCase()}.png`
    },
    iconAttrs() {
      if (this.change < 0) {
        return { name: 'angle-down', class: 'text-danger' }
      }

      if (this.change > 0) {
        return { name: 'angle-up', class: 'text-success' }
      }

      return { name: 'angle-up', class: 'text-gray-light' }
    }
  }
}
</script>
