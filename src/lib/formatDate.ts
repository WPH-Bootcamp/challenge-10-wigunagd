import dayjs from "dayjs";

export function formattedDate(date: Date, format: string){
    return dayjs(date).format(format)
}