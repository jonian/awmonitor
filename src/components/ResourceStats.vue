<template>
  <div class="flex flex-col items-center justify-center space-y-2">
    <Gauge
      :color="color"
      :value="stats.percent" />
    <div class="flex flex-col items-center text-xs">
      <span class="font-bold text-gray-darkest dark:text-gray-lightest">
        {{ title }}
      </span>
      <span
        :style="{ minWidth: '5.5rem' }"
        class="text-gray-dark whitespace-nowrap text-center">
        {{ text }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResourceStats',
  props: {
    stats: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    metric: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: null
    }
  },
  computed: {
    text() {
      const min = Math.floor(this.stats.used / 1000)
      const max = Math.floor(this.stats.max / 1000)

      return `${min}${this.metric} / ${max}${this.metric}`
    }
  }
}
</script>
