<template>
  <div>
    <NuxtLayout>
      <v-app>
        <v-main>
          <NuxtPage />
        </v-main>
      </v-app>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
// useSeoMeta({
//   title: 'Economic Youth',
//   ogTitle: 'Economic Youth',
//   description: 'Welcome to most progressive Online Economic courses in the Egyptian Market, providing you with simplicity and latest content supporting younger Generations',
//   ogDescription: 'Welcome to most progressive Online Economic courses in the Egyptian Market, providing you with simplicity and latest content supporting younger Generations',
//   ogImage: 'https://yasserc.netlify.app/mainicon.ico',
//   twitterCard: 'summary_large_image',
// })
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.1s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;

}
</style>
