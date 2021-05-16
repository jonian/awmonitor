import { useClipboard } from '@vueuse/core'

const { copy } = useClipboard({ read: false })
export const copyToClipboard = copy
