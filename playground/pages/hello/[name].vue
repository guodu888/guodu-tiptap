<!--
 * @Author: shaohang-shy
 * @Date: 2022-08-11 09:19:16
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-08-11 09:25:54
 * @Description: HelloPage
-->
<script setup lang="ts">
const props = defineProps<{ name: string }>()
const router = useRouter()
</script>

<template>
  <div>
    <div i-carbon-pedestrian inline-block text-4xl />
    <p>
      Hi, {{ props.name }}
    </p>
    <p text-sm op50>
      <em>Dynamic route!</em>
    </p>

    <div>
      <button
        class="m-3 mt-8 text-sm btn"
        @click="router.back()"
      >
        Back
      </button>
    </div>
  </div>
</template>
