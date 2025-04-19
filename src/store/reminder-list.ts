import { defineStore } from "pinia"
import { setRemindersToIndexedDB } from "@/progress/reminders"
export interface Reminder {
    finished: boolean,
    content?: {
        main: string,
        secondary: string,
        time: string,
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
        },
        add(config: {
            main: string,
            secondary: string,
            time: string,
        }) {
            this.list.push({
                finished: false,
                content: config
            })
            setRemindersToIndexedDB()
        }
    }
})


