<template>
  <div
    :class="color"
    :style="{ width: size, height: size }"
    ref="gauge" />
</template>

<script>
import Gauge from 'svg-gauge'

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
    color: {
      type: String,
      default: null
    }
  },
  watch: {
    value(newValue, oldValue) {
      if (newValue != oldValue) {
        this.updateValue(newValue)
      }
    }
  },
  data() {
    return {
      gauge: null
    }
  },
  methods: {
    updateValue(value) {
      return this.gauge && this.gauge.setValueAnimated(value, 1)
    }
  },
  mounted() {
    this.gauge = Gauge(this.$refs.gauge, {
      max: 100,
      dialStartAngle: -90,
      dialEndAngle: -90.001,
      value: 0,
      label: () => `${Math.round(this.value)}%`
    })

    this.updateValue(this.value)
  }
}
</script>

<style lang="scss">
.gauge {
  font-size: 1rem;
  font-weight: bold;

  .dial, .value {
    stroke-width: 20;
    stroke-linecap: round;
  }

  .dial {
    stroke: theme('colors.gray.lighter');
  }

  .value {
    stroke: theme('colors.primary');
  }

  .value-text {
    fill: theme('colors.black');
  }
}

.cyan .gauge .value {
  stroke: theme('colors.cyan');
}

.orange .gauge .value {
  stroke: theme('colors.orange');
}

.yellow .gauge .value {
  stroke: theme('colors.yellow');
}

.dark .gauge {

  .dial {
    stroke: theme('colors.gray.darkest');
  }

  .value-text {
    fill: theme('colors.gray.light');
  }
}
</style>
