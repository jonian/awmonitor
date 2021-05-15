import { useStorage } from '@vueuse/core'

export const colorSchema = useStorage(
  'color-schema',
  'auto'
)

export const moneyType = useStorage(
  'money-type',
  'USDT'
)
