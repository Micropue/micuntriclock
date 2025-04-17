export class CalulateDifferenceInDays {
    time: Date = new Date()!
    inspectionTime: Date = new Date()
    /**
     * 
     * @param time 检查时间
     * @param inspectionTime 被检查的时间 (或今天)
     */
    constructor(time?: Date, inspectionTime?: Date) {
        if (time)
            this.time = time
        if (inspectionTime)
            this.inspectionTime = inspectionTime
    }
    /**
     * 返回两段时间的差值
     */
    differenceSeconds(): number {
        return this.inspectionTime.getTime() - this.time.getTime()
    }
    /**
     * 是否是同一天
     */
    is_sameDate(): boolean {
        const rst = Math.round(this.inspectionTime.getTime() / 1000) - Math.round(this.time.getTime() / 1000)
        return rst >= 0 && rst <= 86400
    }
    /**
     * 检查天数差值
     */
    differenceDate(): number {
        const inspectionTime = Math.round(this.inspectionTime.getTime() / 1000)
        const time = Math.round(this.time.getTime() / 1000)
        return Math.round((inspectionTime - time) / 86400)
    }
    /**
     * 是否在今天的范围内
     */
    is_today(checkedDate: Date): boolean {
        const date = new Date()
        const totalYear = date.getFullYear()
        const totalMonth = date.getMonth() + 1
        const totalDate = date.getDate()
        const range = {
            min: new Date(`${totalYear}-${totalMonth < 10 ? "0" + totalMonth : totalMonth}-${totalDate < 10 ? "0" + totalDate : totalDate} 00:00:00`).getTime(),
            max: new Date(`${totalYear}-${totalMonth < 10 ? "0" + totalMonth : totalMonth}-${totalDate < 10 ? "0" + totalDate : totalDate} 23:59:59`).getTime()
        }
        return checkedDate.getTime() >= range.min && checkedDate.getTime() <= range.max
    }
}