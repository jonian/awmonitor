<template>
  <div class="flex items-center justify-between p-8 bg-primary text-white rounded-md shadow-sm">
    <h2 class="text-2xl font-bold">Do you like this project?</h2>
    <RoundedButton
      icon="smile"
      @click="onSendClick">
      Send a tip
    </RoundedButton>
  </div>
</template>

<script>
export default {
  name: 'SupportCard',
  methods: {
    onSendClick() {
      this.$emit('send')
    }
  }
}
</script>
