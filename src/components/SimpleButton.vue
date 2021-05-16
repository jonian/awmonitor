<template>
  <LinkButton
    v-bind="$attrs"
    class="rounded-md px-4">
    <slot />
  </LinkButton>
</template>

<script>
export default {
  name: 'SimpleButton',
  inheritAttrs: false
}
</script>
