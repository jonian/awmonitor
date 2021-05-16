import { ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'

export const screen = ref({
  xxs: useMediaQuery('(min-width: 360px)'),
  xs: useMediaQuery('(min-width: 480px)'),
  sm: useMediaQuery('(min-width: 640px)'),
  md: useMediaQuery('(min-width: 768px)'),
  lg: useMediaQuery('(min-width: 1024px)')
})
