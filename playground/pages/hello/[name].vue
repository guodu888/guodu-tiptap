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
    <div i-carbon-pedestrian text-4xl inline-block />
    <p>
      Hi, {{ props.name }}
    </p>
    <p text-sm op50>
      <em>Dynamic route!</em>
    </p>

    <div>
      <button
        class="btn m-3 text-sm mt-8"
        @click="router.back()"
      >
        Back
      </button>
    </div>
  </div>
</template>
