<template>
  <div
    :class="{ 'justify-between': expanded }"
    class="flex flex-nowrap items-center space-x-2">
    <span class="flex items-center space-x-2">
      <slot>
        <img
          :src="imagePath"
          :alt="type"
          :style="{ width: '1rem', height: '1rem' }">
      </slot>
      <span class="text-sm whitespace-nowrap">
        {{ type }} Total
      </span>
    </span>
    <span class="flex items-center space-x-2">
      <strong class="text-sm">{{ value.toFixed(decimals) }}</strong>
      <Icon
        v-bind="iconAttrs"
        class="transform scale-150" />
    </span>
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
      default: null
    },
    decimals: {
      type: Number,
      default: 2
    },
    expanded: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    amount(newValue, oldValue) {
      if (oldValue == null || newValue == oldValue) {
        this.change = 0
      } else if (newValue > oldValue) {
        this.change = 1
      } else {
        this.change = -1
      }
    }
  },
  data() {
    return {
      change: 0
    }
  },
  computed: {
    value() {
      return this.amount || 0
    },
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
