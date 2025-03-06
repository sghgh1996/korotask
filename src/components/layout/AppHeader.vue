<template>
  <header class="bg-slate-900 text-white py-4 px-8 flex justify-between items-center">
    <div>
      <router-link to="/" class="text-2xl font-bold">
        KoroTask
      </router-link>
    </div>

    <nav aria-label="Primary Navigation" class="flex space-x-8">
      <router-link to="/" class="hover:text-gray-400">
        Home
      </router-link>
      <router-link
        to="/posts"
        class="hover:text-gray-400"
      >
        Posts
      </router-link>
    </nav>
  </header>
</template>
