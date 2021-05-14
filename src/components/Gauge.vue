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
  data() {
    return {
      gauge: null
    }
  },
  mounted() {
    this.gauge = Gauge(this.$refs.gauge, {
      max: 100,
      dialStartAngle: -90,
      dialEndAngle: -90.001,
      value: this.value,
      label: () => `${Math.round(this.value)}%`
    })
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
