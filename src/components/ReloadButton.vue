<template>
  <component
    v-if="$app.hasAccounts"
    :is="tag"
    :text="text"
    :disabled="$app.loading || !$app.isOnline"
    :icon-class="{ 'animate-spin': $app.loading }"
    icon="refresh"
    class="text-success"
    @click="onClick" />
</template>

<script>
export default {
  name: 'ReloadButton',
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
  computed: {
    text() {
      return this.showText ? 'Refresh' : null
    }
  },
  methods: {
    onClick() {
      this.$app.refresh()
    }
  }
}
</script>
