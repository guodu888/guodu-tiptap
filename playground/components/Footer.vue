<!--
 * @Author: shaohang-shy
 * @Date: 2022-08-10 19:13:08
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-08-31 18:44:41
 * @Description: Footer
-->
<script lang="ts" setup></script>

<template>
  <nav class="mt-6 w-full flex inline-flex items-center justify-center gap-2 text-xl">
    <div icon-btn @click="toggleDark()">
      <div i-carbon-sun dark:i-carbon-moon />
    </div>

    <a
      i-carbon-logo-github icon-btn
      rel="noreferrer"
      href="https://github.com/shy1118999/guodu-tiptap"
      target="_blank"
      title="GitHub"
    />
  </nav>
</template>
