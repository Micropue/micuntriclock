import { createRouter, createWebHistory, createWebHashHistory } from "vue-router"
const routes = [
    {
        name: "home",
        path: "/",
        component: () => import("../view/home.vue"),
        meta: {
            displayName: "时钟"
        },
        children: [
            { path: "new", name: "new", component: () => import("../components/new.vue") }
        ]
    },
    {
        name: "reminders",
        path: "/reminders",
        component: () => import('../view/reminders/reminders.vue'),
        meta: {
            displayName: "所有提醒事项"
        },
        children: [
            { path: "new", name: "reminder-new", component: () => import("../components/new.vue") }
        ]
    },
    {
        name: "search",
        path: "/search",
        component: () => import('../view/search/search.vue'),
        meta: {
            displayName: "搜索"
        }
    }
]
export const router = createRouter({
    history: createWebHistory(),
    routes
})