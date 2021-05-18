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
    <div class="flex flex-col items-center justify-center min-h-full py-4 space-y-4">
      <QrCode :value="account" />
      <strong class="block text-lg">
        WAX Account Name: {{ account }}
      </strong>
    </div>
  </Dialog>
</template>

<script>
import { showTip } from '@/store'
import { waxAccount } from '@/utils'

export default {
  name: 'SupportCard',
  data() {
    return {
      showDialog: false,
      account: waxAccount
    }
  },
  computed: {
    showTip() {
      return showTip.value
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
