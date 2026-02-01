import dayjs from "dayjs";

export function formattedDate(date: Date, format: string) {
    if (date.toString() === "" || date === undefined) {
        return "";
    }
    return dayjs(date).format(format)
}