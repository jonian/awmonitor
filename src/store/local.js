import { useStorage } from '@vueuse/core'

export const colorSchema = useStorage(
  'color-schema',
  'auto'
)

export const moneyType = useStorage(
  'money-type',
  'USDT'
)

export const accountNames = useStorage(
  'account-names',
  []
)

export const showTip = useStorage(
  'show-tip',
  true
)

export const tlmPrice = useStorage(
  'tlm-price',
  0
)

export const updatedAt = useStorage(
  'updated-at',
  null
)
