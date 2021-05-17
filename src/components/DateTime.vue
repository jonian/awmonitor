<template>
  <component
    v-bind="$attrs"
    :is="tag">
    {{ text || empty }}
  </component>
</template>

<script>
import { dayjs } from '@/utils'

const formats = {
  long: 'MMMM D YYYY, HH:mm:ss',
  short: 'MM D YYYY, HH:mm',
  time: 'HH:mm'
}

export default {
  name: 'DateTime',
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number, Date, Object],
      default: null
    },
    empty: {
      type: String,
      default: 'Date unavailable'
    },
    tag: {
      type: String,
      default: 'span'
    },
    format: {
      type: String,
      default: 'long'
    },
    utc: {
      type: Boolean,
      default: null
    },
    relative: {
      type: Boolean,
      default: null
    }
  },
  watch: {
    value: {
      handler() {
        this.updateDate()
        this.updateText()
      },
      immediate: true
    }
  },
  data() {
    return {
      date: null,
      text: null
    }
  },
  methods: {
    updateDate() {
      if (!this.value) {
        this.date = null
      } else if (this.utc) {
        this.date = dayjs.utc(this.value)
      } else {
        this.date = dayjs(this.value)
      }
    },
    updateText() {
      if (!this.date) {
        this.text = null
      } else if (this.relative) {
        this.text = this.date.fromNow()
      } else {
        this.text = this.date.format(formats[this.format] || this.format)
      }
    }
  }
}
</script>
