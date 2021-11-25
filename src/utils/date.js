export { default as formatDuration } from 'format-duration'
import { ref } from 'vue'
import { useRafFn, useNow } from '@vueuse/core'

import day from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'

day.extend(relativeTime)
day.extend(utc)

export const dayjs = day
export const now = useNow()

export const utcToDate = date => {
  return date ? dayjs.utc(date).toDate() : null
}
export const formatDate = (date, format) => {
  return dayjs(date).format(format || 'MMMM D YYYY, HH:mm:ss')
}

export const diffToNow = (date) => {
  return date ? dayjs(date).diff(now.value) : 0
}

export const timeAgo = date => {
  const val = dayjs.utc(date)
  const ago = ref(val.fromNow())

  useRafFn(() => ago.value = val.fromNow(), { immediate: true })

  return ago.value
}

export const isTimeAfter = (date, value, unit = 'second') => {
  return date ? dayjs().diff(date, unit) > value : true
}
