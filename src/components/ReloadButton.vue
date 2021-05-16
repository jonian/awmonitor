<template>
  <RoundedButton
    :disabled="$app.loading"
    text="Refresh"
    class="text-success"
    icon="redo"
    @click="onClick" />
</template>

<script>
export default {
  name: 'ReloadButton',
  inject: ['$app'],
  methods: {
    onClick() {
      this.$app.refresh()
    }
  }
}
</script>
