<template>
  <strong>
    {{ timer }}
  </strong>
</template>

<script>
import formatDuration from 'format-duration'

import { dayjs } from '@/utils'
import { useNow } from '@vueuse/core'

const now = useNow()

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
      return dayjs(this.date || now.value).diff(now.value)
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
