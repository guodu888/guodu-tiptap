<!--
 * @Author: shaohang-shy
 * @Date: 2022-08-11 09:13:50
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-08-11 09:14:10
 * @Description: 404
-->
<script setup lang="ts">
const router = useRouter()
function goHome() {
  router.replace('/')
}
</script>

<template>
  <div class="w-full text-center py-20">
    Not Found <span class="color-blue cursor-pointer" @click="goHome">Back Home</span>
  </div>
</template>
