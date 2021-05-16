<template>
  <LinkButton
    v-bind="$attrs"
    :style="{ borderColor: 'currentColor' }"
    class="rounded-full border px-6">
    <slot />
  </LinkButton>
</template>

<script>
export default {
  name: 'RoundedButton',
  inheritAttrs: false
}
</script>
