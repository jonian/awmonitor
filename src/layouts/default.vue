<template>
  <div class="min-h-screen flex flex-col bg-white text-black dark:bg-black dark:text-white">
    <Header />
    <InfoBar />
    <main class="flex items-stretch flex-grow">
      <div class="container py-12">
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
