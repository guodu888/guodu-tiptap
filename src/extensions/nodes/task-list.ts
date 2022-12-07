import type { TaskListOptions } from '@tiptap/extension-task-list'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import type { Editor } from '@tiptap/vue-3'
import CommandButton from '~/components/MenuCommands/CommandButton.vue'
import type { MenuBtnView, MenuOptions } from '~/typings'
export default TaskList.extend<TaskListOptions & MenuOptions, any>({
  addOptions() {
    return {
      ...this.parent?.(),
      menuBtnView({ editor }: { editor: Editor }): MenuBtnView {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              editor.commands.toggleTaskList()
            },
            isActive: editor.isActive('tasklist'),
            icon: 'tasks',
            tooltip: '待办列表',
          },
        }
      },
    }
  },
  addExtensions() {
    return [TaskItem]
  },
})
