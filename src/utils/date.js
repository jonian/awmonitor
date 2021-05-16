import day from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'

day.extend(relativeTime)
day.extend(utc)

export const dayjs = day
