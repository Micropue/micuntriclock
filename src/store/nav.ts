import { defineStore } from "pinia"

export default defineStore("nav", {
    state: () => {
        return {
            hided: false
        }
    },
    actions:{
        hide(){
            this.hided = true
        },
        display(){
            this.hided = false
        }
    }
})