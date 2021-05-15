import { computed } from 'vue'
import { usePreferredDark } from '@vueuse/core'
import { colorSchema } from '../store'

const preferredDark = usePreferredDark()

export const isDark = computed({
  get() {
    return colorSchema.value === 'auto'
      ? preferredDark.value
      : colorSchema.value === 'dark'
  },
  set(value) {
    if (value === preferredDark.value) {
      colorSchema.value = 'auto'
    } else {
      colorSchema.value = value ? 'dark' : 'light'
    }
  }
})
