<template>
  <component
    :is="tag"
    :text="text"
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
    <div class="flex flex-col items-center justify-center min-h-full py-4 space-y-4">
      <QrCode :value="shareUrl" />
      <strong class="block text-lg">
        Scan QR code or copy URL
      </strong>
      <span class="block text-xs text-center break-all px-4">
        {{ shareUrl.replace('https://', '') }}
      </span>
    </div>
  </Dialog>
</template>

<script>
import { appURL, hashids, copyToClipboard } from '@/utils'

export default {
  name: 'ShareButton',
  inject: ['$app'],
  props: {
    tag: {
      type: [String, Object],
      default: () => RoundedButton
    },
    showText: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: false
    }
  },
  computed: {
    text() {
      return this.showText ? 'Share' : null
    },
    shareUrl() {
      if (this.$app.hasAccounts) {
        const hash = hashids.encode(this.$app.accountNames)
        return `${appURL}/share/${hash}`
      } else {
        return appURL
      }
    }
  },
  methods: {
    async onCopy() {
      await copyToClipboard(this.shareUrl)
    }
  }
}
</script>
