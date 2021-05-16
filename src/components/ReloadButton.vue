<template>
  <component
    :is="tag"
    :text="text"
    :disabled="$app.loading"
    class="text-success"
    icon="redo"
    @click="onClick" />
</template>

<script>
import LinkButton from '@/components/LinkButton.vue'
import RoundedButton from '@/components/RoundedButton.vue'

export default {
  name: 'ReloadButton',
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
