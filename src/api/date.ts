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



//更好的时间格式化函数
/**
 * 
 * @param regexp 格式请详见md文档
 * @returns 返回一个类时间对象
 */
export const date: (regexp?: string) => {
    toString(): string;
    year: number;
    month: number | string;
    date: number | string;
    day: number;
    timestamp: number;
    hour: number | string;
    minute: number | string;
    second: number | string;
} = (regexp: string = "Y-m-d H:i:s") => {
    const _ = new Date()
    const year = _.getFullYear()
    const month = (_.getMonth() + 1) < 10 ? `0${_.getMonth() + 1}` : `${_.getMonth() + 1}`
    const date = _.getDate() < 10 ? `0${_.getDate()}` : `${_.getDate()}`
    const day = _.getDay()
    const timestamp = _.getTime()
    const hour = _.getHours() < 10 ? `0${_.getHours()}` : `${_.getHours()}`
    const minute = _.getMinutes() < 10 ? `0${_.getMinutes()}` : `${_.getMinutes()}`
    const second = _.getSeconds() < 10 ? `0${_.getSeconds()}` : `${_.getSeconds()}`
    const monthsString = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const toString = () => {
        const regexps = [
            { regex: /Y/, text: year },
            { regex: /m/, text: month },
            { regex: /F/, text: monthsString[Number(month) - 1] },
            { regex: /d/, text: date },
            { regex: /w/, text: day },
            { regex: /H/, text: hour },
            { regex: /i/, text: minute },
            { regex: /s/, text: second },
            { regex: /A/, text: Number(hour) >= 12 ? 'PM' : 'AM' }
        ]
        const result = (() => {
            let _regexp = regexp || "Y-m-d H:i:s"
            regexps.forEach(item => {
                _regexp = _regexp.replace(new RegExp(item.regex, 'g'), String(item.text))
            })
            return _regexp
        })()
        return result
    }
    return {
        year,
        month,
        date,
        day,
        timestamp,
        hour,
        minute,
        second,
        toString,
    }
}