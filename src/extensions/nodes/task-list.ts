import type { TaskListOptions } from '@tiptap/extension-list'
import { TaskItem, TaskList } from '@tiptap/extension-list'
import CommandButton from '~/components/MenuCommands/CommandButton.vue'
import type { MenuOptions } from '~/typings'

export default TaskList.extend<TaskListOptions & MenuOptions, any>({
  addOptions() {
    return {
      ...this.parent?.(),
      itemTypeName: 'taskItem',
      HTMLAttributes: {}, // ✅ 必须有，至少给个空对象
      menuBtnView({ editor }) {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              editor.commands.toggleTaskList()
            },
            isActive: editor.isActive('taskList'),
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
