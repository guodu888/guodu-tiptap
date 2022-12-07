<!--
 * @Author: shaohang-shy
 * @Date: 2022-08-10 19:13:08
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-08-31 18:44:41
 * @Description: Footer
-->
<script lang="ts" setup></script>

<template>
  <nav text-xl mt-6 inline-flex gap-2>
    <button icon-btn @click="toggleDark()">
      <div dark:i-carbon-moon i-carbon-sun />
    </button>

    <a
      icon-btn i-carbon-logo-github
      rel="noreferrer"
      href="https://github.com/shy1118999/shy-vue-template"
      target="_blank"
      title="GitHub"
    />
  </nav>
</template>
