import { computed } from 'vue'
import { moneyType as store } from '../store'

export const moneyType = computed({
  get() {
    return store.value
  },
  set(value) {
    store.value = value
  }
})
