<template>
  <header
    class="bg-slate-900 text-white py-3 md:py-4 px-4 md:px-8 flex justify-between items-center shadow-md"
  >
    <div>
      <RouterLink
        to="/"
        class="text-xl md:text-2xl font-bold hover:text-gray-200 transition-colors"
      >
        KoroTask
      </RouterLink>
    </div>

    <nav aria-label="Primary Navigation" class="flex space-x-4 md:space-x-8">
      <RouterLink
        to="/"
        class="hover:text-gray-400 transition-colors py-1 px-2"
        active-class="border-b-2 border-blue-400"
      >
        Home
      </RouterLink>
      <RouterLink
        to="/posts"
        class="hover:text-gray-400 transition-colors py-1 px-2"
        active-class="border-b-2 border-blue-400"
      >
        Posts
      </RouterLink>
    </nav>
  </header>
</template>
