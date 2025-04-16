import Reminders from "@/view/reminders/reminders.vue"
import { defineStore } from "pinia"
export interface Reminder {
    finished: boolean,
    content?: {
        main: string,
        secondary: string,
        time: Date,
    }
}
export default defineStore("remindersList", {
    state: (): {
        list: Reminder[]
    } => ({
        //使用时套一个字段更加方便使用
        list: []
    }),
    actions: {
        forEach<T>(handle: (item: Reminder) => T) {
            for (const i of this.list) {
                handle(i)
            }
        },
        changeStatus(index: number, status: boolean) {
            this.list[index].finished = status
        }
    }
})


