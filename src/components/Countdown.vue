<template>
  <strong>
    {{ timer }}
  </strong>
</template>

<script>
import { diffToNow, formatDuration } from '@/utils'

export default {
  name: 'Countdown',
  props: {
    date: {
      type: Date,
      default: null
    }
  },
  computed: {
    diff() {
      return diffToNow(this.date)
    },
    timer() {
      if (this.diff > 0) {
        return formatDuration(this.diff, { leading: true })
      } else {
        return 'Time to mine!'
      }
    }
  }
}
</script>
