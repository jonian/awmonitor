<template>
  <div class="flex flex-col items-center justify-center space-y-6 h-full">
    <Icon
      name="plus-circle"
      class="text-6xl text-primary" />
    <div class="flex flex-col items-center justify-center space-y-4">
      <h3 class="font-bold text-xl">
        No monitored accounts
      </h3>
      <p class="block text-center text-gray-dark max-w-md">
        You are not monitoring any accounts. Click the "Add Account" button to start monitoring.
      </p>
    </div>
    <AddAccountButton>
      <template v-slot:default="{ open }">
        <SimpleButton
          text="Add Account"
          class="text-white bg-primary"
          @click="open" />
      </template>
    </AddAccountButton>
  </div>
</template>

<script>
export default {
  name: 'AddAccountSection',
  inject: ['$app']
}
</script>
