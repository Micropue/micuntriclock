import useRemindersStore, { type Reminder } from '@/store/reminder-list'
import { REMINDERLIST_INDEXEDDB_NAME } from '@/config/config'
import { openDB } from 'idb'

const db = await openDB('reminders', 2, {
    upgrade(db) {
        if (!db.objectStoreNames.contains(REMINDERLIST_INDEXEDDB_NAME)) {
            db.createObjectStore(REMINDERLIST_INDEXEDDB_NAME, { keyPath: 'id', autoIncrement: true })
        }
    }
})

export async function getRemindersFromLocalStorage(): Promise<Reminder[]> {
    const store = useRemindersStore()
    const result = await db.getAll(REMINDERLIST_INDEXEDDB_NAME) as Reminder[]
    result.forEach(i => {
        store.list.push(i)
    })
    return store.list
}

export async function setRemindersToLocalStorage(): Promise<void> {
    const store = useRemindersStore()
    const list = store.list
    let arr = new Array()
    list.forEach(item => {
        arr.push(item)
    })
    arr = JSON.parse(JSON.stringify(arr))
    for (const v of arr) {
        await db.add(REMINDERLIST_INDEXEDDB_NAME, v)
    }
}