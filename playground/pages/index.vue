<!--
 * @Author: shaohang-shy
 * @Date: 2022-08-10 18:57:59
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-08-11 09:23:50
 * @Description: index page
-->
<script setup lang="ts">
const name = $ref('')

const router = useRouter()
function toSayHello() {
  if (name)
    router.push(`/hello/${encodeURIComponent(name)}`)
}
</script>

<template>
  <div>
    <p>Hello World!</p>
    <Counter :initial="0" />
    <div>
      <input v-model="name" placeholder="What's your name?" class="px-4 py-2 w-100 text-center bg-transparent border border-rounded border-gray-200 dark:border-gray-700 outline-none active:outline-none" @keydown.enter="toSayHello">
      <button class="btn px-4 py-2 mx-2" :disabled="!name" @click="toSayHello">
        Go
      </button>
    </div>
  </div>
</template>
