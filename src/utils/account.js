import { computed } from 'vue'
import { accountNames as store } from '../store'

export const accountNames = computed({
  get() {
    return store.value || []
  },
  set(value) {
    store.value = value
  }
})
