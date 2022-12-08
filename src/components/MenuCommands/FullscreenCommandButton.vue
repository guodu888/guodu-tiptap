<!--
 * @Author: shaohang-shy
 * @Date: 2022-12-08 08:41:21
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-12-08 08:41:21
 * @Description: FullscreenCommandButton
-->
<script setup lang="ts">
import CommandButtom from './CommandButton.vue'
const isFullscreen = inject('isFullscreen', false)
const toggleFullscreen = inject<(ifFull: boolean) => void>('toggleFullscreen', () => {})
</script>

<template>
  <CommandButtom
    :command="() => toggleFullscreen(!isFullscreen)"
    :tooltip="isFullscreen ? '退出全屏' : '全屏'"
    :icon="isFullscreen ? 'compress' : 'expand'"
    :is-active="isFullscreen"
  />
</template>
