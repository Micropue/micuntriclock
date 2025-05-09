import { defineStore } from "pinia"
import { setRemindersToIndexedDB } from "@/progress/reminders"
type Id = number
export interface Reminder {
    id?: Id,
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
            let realindex: number
            for (const i in this.list) {
                if (this.list[i].id == index) {
                    realindex = Number(i)
                    break
                }
            }
            this.list[realindex!].finished = status
            setRemindersToIndexedDB()
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
        },
        delete(id: Id) {
            let index
            for (const i in this.list) {
                if (this.list[i].id === id) {
                    index = i
                    break
                }
            }
            this.list.splice(Number(index), 1)
            setRemindersToIndexedDB()
        }
    }
})


