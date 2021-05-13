<template>
  <div class="min-h-screen flex flex-col text-black dark:text-white">
    <Header />
    <InfoBar />
    <main class="flex items-stretch flex-grow bg-gray-lightest dark:bg-black">
      <div class="container py-4">
        <router-view />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>
