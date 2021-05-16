<template>
  <div
    v-if="showTip"
    class="flex flex-col items-center justify-between p-8 bg-primary text-white rounded-md shadow-sm sm:flex-row">
    <h2 class="text-2xl font-bold mb-6 sm:mb-0">Do you like this project?</h2>
    <RoundedButton
      text="Send a tip"
      icon="smile"
      @click="onSendClick" />
  </div>
  <div
    v-else
    class="flex items-center justify-between text-gray-light dark:text-gray-darker">
    <span>Do you like this project?</span>
    <span
      class="flex items-center space-x-2 cursor-pointer"
      @click="onSendClick">
      <Icon name="smile" />
      <span>Send a tip</span>
    </span>
  </div>
  <Dialog
    v-model="showDialog"
    :cancel-button="false"
    confirm-button="Done"
    size="small"
    title="Send WAXP Tokens"
    class="dark text-white"
    @confirm="onConfirm">
    <div class="flex flex-col items-center justify-center min-h-full my-4 space-y-4">
      <img
        :src="qrCodeUrl"
        width="250"
        height="250"
        class="max-w-full h-auto rounded-3xl" />
      <strong class="block text-lg">
        WAX Account Name: {{ account }}
      </strong>
    </div>
  </Dialog>
</template>

<script>
import { showTip } from '@/store'

export default {
  name: 'SupportCard',
  data() {
    return {
      showDialog: false,
      account: 'la1dk.wam'
    }
  },
  computed: {
    showTip() {
      return showTip.value
    },
    qrCodeUrl() {
      return `https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=${this.account}&choe=UTF-8`
    }
  },
  methods: {
    onSendClick() {
      this.showDialog = true
    },
    onConfirm() {
      showTip.value = false
    }
  }
}
</script>
