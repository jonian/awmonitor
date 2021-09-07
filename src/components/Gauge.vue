<template>
  <div :style="{ width: size, height: size }">
    <svg
      :viewBox="viewBox"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg">
      <g>
        <text
          x="50"
          y="50"
          font-size="100%"
          font-family="sans-serif"
          font-weight="normal"
          text-anchor="middle"
          alignment-baseline="middle"
          dominant-baseline="central"
          fill="currentColor"
          class="text-black dark:text-gray-light">
          {{ value }}%
        </text>
        <circle
          :stroke-width="strokeWidth"
          :cy="radius"
          :cx="radius"
          :r="innerRadius"
          fill="none"
          stroke="currentColor"
          class="text-gray-lighter dark:text-gray-darkest" />
        <circle
          :style="{ strokeDashoffset: dashOffset }"
          :stroke-width="strokeWidth"
          :stroke-dasharray="dashArray"
          :cy="radius"
          :cx="radius"
          :r="innerRadius"
          stroke="currentColor"
          stroke-linecap="round"
          fill="none"
          class="transition-all duration-1000 ease-out transform origin-center -rotate-90" />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Gauge',
  props: {
    value: {
      type: Number,
      default: 0
    },
    size: {
      type: String,
      default: '4rem'
    },
    radius: {
      type: Number,
      default: 50
    },
    strokeWidth: {
      type: Number,
      default: 20
    }
  },
  watch: {
    value: 'updatePercent'
  },
  data() {
    return {
      percent: 0
    }
  },
  computed: {
    innerRadius() {
      return this.radius - this.strokeWidth / 2
    },
    dashArray() {
      return this.innerRadius * 2 * Math.PI
    },
    dashOffset() {
      return this.dashArray - (this.percent / 100) * this.dashArray
    },
    viewBox() {
      return `0 0 ${this.radius * 2} ${this.radius * 2}`
    }
  },
  methods: {
    updatePercent() {
      this.percent = Math.min(Math.max(this.value, 1), 100)
    }
  },
  mounted() {
    setTimeout(() => this.updatePercent(), 50)
  }
}
</script>
