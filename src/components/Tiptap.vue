<script setup lang="ts">
import { onMounted, provide, ref, unref, watchEffect } from 'vue'
import type { Extensions } from '@tiptap/core'
import { EditorContent, useEditor } from '@tiptap/vue-3'
const props = withDefaults(defineProps<{
  extensions: Extensions
  content?: string
  theme?: 'light' | 'dark'
  showLineNo?: boolean
}>(), {
  content: '',
  theme: 'light',
  showLineNo: false,
})
const emits = defineEmits(['update:content'])

const theme = ref(props.theme)
provide('theme', theme)
watchEffect(() => {
  theme.value = props.theme
})
const editor = useEditor({
  content: props.content,
  onUpdate: () => {
    emits('update:content', editor.value?.getHTML())
  },
  extensions: [...props.extensions],
})
defineExpose({ editor })
watchEffect(() => {
  unref(editor)?.setOptions({
    editorProps: {
      attributes: {
        spellcheck: String(false),
      },
    },
  })
})
watchEffect(() => {
  if (editor.value?.getHTML() !== props.content)
    editor.value?.commands.setContent(props.content, false)
})
onMounted(() => {
  emits('update:content', editor.value?.getHTML())
})
onUnmounted(() => {
  editor.value?.destroy()
})
const isFullscreen = ref(false)
const toggleFullscreen = (val: boolean) => {
  isFullscreen.value = val
}
provide('isFullscreen', isFullscreen)
provide('toggleFullscreen', toggleFullscreen)
</script>

<template>
  <div
    class="guodu-tiptap-editor border-1 border-solid border-#ebeef5 box-border flex rounded-8px flex-col max-h-100% relative w-100%"
    :class="{ 'guodu-tiptap-editor-dark': props.theme === 'dark', 'guodu-tiptap-editor-fullscreen': isFullscreen, 'guodu-tiptap-line-no': props.showLineNo }"
  >
    <MenuBar :editor="editor" />
    <MenuBubble :editor="editor" />
    <EditorContent
      :editor="editor"
      class="edit-content box-border flex-grow p-15px leading-7 text-left overflow-unset overflow-auto"
    />
  </div>
</template>

<style lang="scss">
.ProseMirror {
  height: 100%;
}

.guodu-tiptap-line-no {
  .ProseMirror {
    counter-reset: section;
    padding-left: 32px;

    > {

      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      ul,
      ol,
      table,
      blockquote {

        position: relative;
        counter-increment: section;

        &:before {
          text-align: left;
          text-indent: 0;
          display: block;
          position: absolute;
          left: -32px;
          top: 50%;
          transform: translateY(-50%);
          // 展示是第几个元素
          content: counter(section);
          // content: "A";
          color: #999;
          font-size: 16px;
          font-weight: 100;
        }
      }

      ul,
      ol {
        &:before {
          left: -56px;
        }
      }

      blockquote {
        &:before {
          left: -37px;
        }
      }
      ul[data-type=taskList] {
        &:before {
          left: -37px;
        }
      }
    }
  }
}

.guodu-tiptap-editor {
  --black-color: #000;
  --white-color: #fff;
  --light-background-color: #f5f7fa;
  --darken-background-color: #e4e9f2;
  --primary-color: #409eff;
  --light-primary-color: #b3d8ff;
  --lighter-primary-color: #d9ecff;
  --extra-light-primary-color: #ecf5ff;
  --danger-color: #f56c6c;
  --primary-text-color: #303133;
  --regular-text-color: #606266;
  --placeholder-text-color: #c0c4cc;
  --border-color: #dcdfe6;
  --lighter-border-color: #ebeef5;

  --hover-outline-color: #ffc83d;
  background-color: var(--white-color);
}

.guodu-tiptap-editor-dark {
  --extra-light-primary-color: rgba(232, 244, 254, 0.25);
  background-color: var(--black-color);
}

.guodu-tiptap-editor-fullscreen {
  border-radius: 0 !important;
  bottom: 0 !important;
  height: 100% !important;
  left: 0 !important;
  margin: 0 !important;
  position: fixed !important;
  right: 0 !important;
  top: 0 !important;
  width: 100% !important;
  z-index: 500 !important;
}

.edit-content {
  box-sizing: border-box;
  font-family: sans-serif;
  line-height: 1.7;
  overflow-x: auto;
  text-align: left;

  >* {
    box-sizing: border-box;
  }

  p {
    margin-bottom: 0;
    margin-top: 0;
    outline: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin-top: 20px;
    margin-bottom: 20px;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  ul,
  ol {
    counter-reset: none;
    list-style-type: none;
    margin-bottom: 0;
    margin-left: 24px;
    margin-top: 0;
    padding-bottom: 5px;
    padding-left: 0;
    padding-top: 5px;
  }

  li>p {
    margin: 0;

    &:first-child::before {
      content: counter(guodu-tiptap-counter) '.';
      display: inline-block;
      left: -5px;
      line-height: 1;
      margin-left: -24px;
      position: relative;
      text-align: right;
      top: 0;
      width: 24px;
    }
  }

  ul li>p {
    &:first-child::before {
      content: '\2022';
      text-align: center;
    }
  }

  ol {
    counter-reset: guodu-tiptap-counter;

    li>p:first-child::before {
      counter-increment: guodu-tiptap-counter;
    }
  }

  a {
    color: var(--primary-color);
    cursor: pointer;
  }

  blockquote {
    border-left: 5px solid #edf2fc;
    border-radius: 2px;
    color: var(--regular-text-color);
    margin: 10px 0;
    padding-left: 1em;
  }

  code {
    background-color: var(--lighter-primary-color);
    border-radius: 4px;
    color: var(--primary-color);
    display: inline-block;
    font-size: 14px;
    font-weight: 700;
    padding: 0 8px;
  }

  pre {
    background-color: var(--primary-text-color);
    color: var(--lighter-primary-color);
    font-size: 16px;
    overflow-x: auto;
    padding: 14px 20px;
    margin: 10px 0;
    border-radius: 5px;

    code {
      background-color: transparent;
      border-radius: 0;
      color: inherit;
      display: block;
      font-family: 'Menlo,Monaco,Consolas,Courier,monospace';
      font-size: inherit;
      font-weight: normal;
      padding: 0;
    }
  }

  img {
    display: inline-block;
    float: none;
    max-width: 100%;
    max-width: 100%;
    vertical-align: bottom;

    &[data-display='inline'] {
      margin-left: 12px;
      margin-right: 12px;
    }

    &[data-display='block'] {
      display: block;
    }

    &[data-display='left'] {
      float: left;
      margin-left: 0;
      margin-right: 12px;
    }

    &[data-display='right'] {
      float: right;
      margin-left: 12px;
      margin-right: 0;
    }
  }

  ul[data-type='taskList'] {
    margin-left: 5px;

    .task-item-wrapper {
      display: flex;
    }

    li[data-type='taskItem'] {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      margin-bottom: 0;
      width: 100%;

      &[data-text-align='right'] {
        justify-content: flex-end !important;
      }

      &[data-text-align='center'] {
        justify-content: center !important;
      }

      &[data-text-align='justify'] {
        text-align: space-between !important;
      }

      .todo-content {
        padding-left: 10px;
        width: 100%;

        >p {
          font-size: 16px;

          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }

      &[data-done='done'] {
        >.todo-content>p {
          color: var(--primary-color);
          text-decoration: line-through;
        }
      }
    }
  }

  hr {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  @for $i from 1 through 7

  /* max-indent */
    {
    $indent-base: 1em;

    [data-indent='#{$i}'] {
      text-indent: $indent-base * $i;
    }

    [data-indent='#{$i}'] * {
      text-indent: 0;
    }
  }

  .tableWrapper {
    margin: 1em 0;
    overflow-x: auto;
  }

  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
  }

  th,
  td {
    border: 2px solid var(--lighter-border-color);
    box-sizing: border-box;
    min-width: 1em;
    padding: 3px 5px;
    position: relative;
    vertical-align: top;

    &.selectedCell {
      background-color: var(--extra-light-primary-color);
    }
  }

  th {
    font-weight: 500;
    text-align: left;
  }

  .column-resize-handle {
    background-color: var(--light-primary-color);
    bottom: 0;
    pointer-events: none;
    position: absolute;
    right: -2px;
    top: 0;
    width: 4px;
    z-index: 20;
  }

  .iframe {
    height: 0;
    padding-bottom: 56.25%;
    position: relative;
    width: 100%;

    &__embed {
      border: 0;
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
    }
  }

  .resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }
}

.ProseMirror {
  outline: 0;
}

.has-focus {
  border-radius: 3px;
  box-shadow: 0 0 0 3px #68cef8;
}

.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}

.ProseMirror {
  >*+* {
    margin-top: 0.75em;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }

    .hljs-comment,
    .hljs-quote {
      color: #616161;
    }

    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #F98181;
    }

    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #FBBC88;
    }

    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #B9F18D;
    }

    .hljs-title,
    .hljs-section {
      color: #FAF594;
    }

    .hljs-keyword,
    .hljs-selector-tag {
      color: #70CFF8;
    }

    .hljs-emphasis {
      font-style: italic;
    }

    .hljs-strong {
      font-weight: 700;
    }
  }
}

.ProseMirror {
  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    td,
    th {
      min-width: 1em;
      border: 2px solid #ced4da;
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;

      >* {
        margin-bottom: 0;
      }
    }

    th {
      font-weight: bold;
      text-align: left;
      background-color: rgba(239, 241, 243, 0.3);
    }

    .selectedCell:after {
      z-index: 2;
      position: absolute;
      content: "";
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(200, 200, 255, 0.4);
      pointer-events: none;
    }

    .column-resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      bottom: -2px;
      width: 4px;
      background-color: #adf;
      pointer-events: none;
    }

    p {
      margin: 0;
    }
  }
}

.tableWrapper {
  padding: 1rem 0;
  overflow-x: auto;
}

.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}

ul[data-type="taskList"] {
  list-style: none;
  padding: 0;

  p {
    margin: 0;
  }

  li {
    display: flex;

    >label {
      flex: 0 0 auto;
      margin-right: 0.5rem;
      user-select: none;
    }

    >div {
      flex: 1 1 auto;
    }
  }
}
</style>
