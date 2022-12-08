<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },

    command: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      selectedIndex: 0,
    }
  },

  watch: {
    items() {
      this.selectedIndex = 0
    },
  },

  methods: {
    onKeyDown({ event }) {
      if (event.key === 'ArrowUp') {
        this.upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        this.downHandler()
        return true
      }

      if (event.key === 'Enter') {
        this.enterHandler()
        return true
      }

      return false
    },

    upHandler() {
      this.selectedIndex = ((this.selectedIndex + this.items.length) - 1) % this.items.length
    },

    downHandler() {
      this.selectedIndex = (this.selectedIndex + 1) % this.items.length
    },

    enterHandler() {
      this.selectItem(this.selectedIndex)
    },

    selectItem(index) {
      const item = this.items[index]

      if (item)
        this.command(item)
    },
  },
}
</script>

<template>
  <div class="flex flex-col w-40">
    <template v-if="items.length">
      <div v-for="(item, index) in items" :key="index" class="flex flex-row py-2 px-2 box-border justify-between cursor-pointer" hover="color-blue" :class="{ 'color-blue': index === selectedIndex }" @click="selectItem(index)">
        <div class="text-base">
          {{ item.title }}
        </div>
        <div class="border-1 px-2 rounded text-sm">
          {{ item.key }}
        </div>
      </div>
    </template>
    <div v-else class="item">
      No result
    </div>
  </div>
</template>
