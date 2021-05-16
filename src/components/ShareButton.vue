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
      <img
        :src="qrCodeUrl"
        width="250"
        height="250"
        class="max-w-full h-auto rounded-3xl bg-white" />
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

import LinkButton from '@/components/LinkButton.vue'
import RoundedButton from '@/components/RoundedButton.vue'

export default {
  name: 'ShareButton',
  inject: ['$app'],
  components: {
    LinkButton,
    RoundedButton
  },
  props: {
    tag: {
      type: String,
      default: 'RoundedButton'
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
      const link = 'https://awmonitor.netlify.app'

      if (this.$app.hasAccounts) {
        const hash = hashids.encode(this.$app.accountNames)
        return `${link}/share/${hash}`
      } else {
        return link
      }
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
