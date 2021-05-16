<template>
  <RoundedButton
    text="Share"
    class="text-primary"
    icon="share-alt"
    @click="visible = true" />
  <Dialog
    v-model="visible"
    :cancel-button="false"
    confirm-button="Copy URL"
    size="small"
    title="Share dashboard"
    class="dark text-white"
    @confirm="onCopy">
    <div class="flex flex-col items-center justify-center min-h-full my-4 space-y-4">
      <img
        :src="qrCodeUrl"
        width="250"
        height="250"
        class="max-w-full h-auto rounded-3xl" />
      <strong class="block text-lg">
        Scan QR code or copy URL
      </strong>
      <span class="block text-xs text-center">
        {{ shareUrl.replace('https://', '') }}
      </span>
    </div>
  </Dialog>
</template>

<script>
import { hashids, copyToClipboard } from '@/utils'

export default {
  name: 'ShareButton',
  inject: ['$app'],
  data() {
    return {
      visible: false
    }
  },
  computed: {
    shareUrl() {
      const hash = hashids.encode(this.$app.accountNames)
      return `https://awmonitor.netlify.app/share/${hash}`
    },
    qrCodeUrl() {
      return `https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=${this.shareUrl}&choe=UTF-8`
    }
  },
  methods: {
    async onCopy() {
      await copyToClipboard(this.shareUrl)
    }
  }
}
</script>
