import useRemindersStore, { type Reminder } from '@/store/reminder-list'
import { REMINDERLIST_LOCALSTORAGE_NAME } from '@/config/config'

export function getRemindersFromLocalStorage(): string | null | undefined {
    const store = useRemindersStore()
    const storage = window.localStorage.getItem(REMINDERLIST_LOCALSTORAGE_NAME)
    if (!storage) return
    try {
        const list = JSON.parse(storage) as Reminder[]
        list.forEach(item => {
            store.list.push(item)
        })
    } catch {
        throw new Error("无法正确解析LocalStorage")
    }
    return storage
}

export function setRemindersToLocalStorage(): void {
    const store = useRemindersStore()
    const list = Array.from(store.list)
    window.localStorage.setItem(REMINDERLIST_LOCALSTORAGE_NAME, JSON.stringify(list))
}