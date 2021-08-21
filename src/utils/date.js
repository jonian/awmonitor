import { ref } from 'vue'
import { useRafFn } from '@vueuse/core'

import day from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'

day.extend(relativeTime)
day.extend(utc)

export const dayjs = day

export const timeAgo = date => {
  const val = dayjs.utc(date)
  const ago = ref(val.fromNow())

  useRafFn(() => ago.value = val.fromNow(), { immediate: true })

  return ago.value
}
