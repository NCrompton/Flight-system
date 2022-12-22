import { info } from "console"
import { Time } from "../model/utilmodel"

export function calTime(time: Time, length: number): Time | undefined {
	if (time.hour === undefined || time.minute === undefined) return

	const tmp_minute = length % 60
	let tmp_hour = (length - tmp_minute) / 60

	var tmp = carryMinute(tmp_hour, tmp_minute + time.minute)
	const minute = tmp.minute

	var { hour, day } = carryHour(time.hour + tmp.hour, 0)

	const result_time: Time = { day, hour, minute }
	return result_time
}

function carryHour(hour: number, day: number): { hour: number; day: number } {
	let tmp_hour = hour
	let tmp_day = day
	if (tmp_hour > 24) {
		tmp_day += 1
		tmp_hour -= 24
		return carryHour(tmp_hour, tmp_day)
	} else {
		return { hour: tmp_hour, day: tmp_day }
	}
}

function carryMinute(hour: number, minute: number): { hour: number; minute: number } {
	let tmp_hour = hour
	let tmp_minute = minute
	if (tmp_minute > 60) {
		tmp_hour += 1
		tmp_minute -= 60
		return carryMinute(tmp_hour, tmp_minute)
	} else {
		return { hour: tmp_hour, minute: tmp_minute }
	}
}

export function convertTime(timeString: string) {
	const timeArray: Array<string> = timeString.split(":")
	//timeArray.map(s => +s === undefined)
	const result_time: Time = {
		hour: parseInt(timeArray[0]),
		minute: parseInt(timeArray[1]),
		second: parseInt(timeArray[2]),
	}
	return result_time
}

export function convertToString(time: Time): string {
	if (!time.year && !time.month && !time.day && !time.hour && !time.minute && !time.second)
		return ""
	const yearString = time.year ?? undefined
	const monthString =
		time.month === undefined ? undefined : time.month < 10 ? `0${time.month}` : time.month
	const dayString = time.day === undefined ? undefined : time.day < 10 ? `0${time.day}` : time.day
	const hourString = time.hour === undefined ? "00" : time.hour < 10 ? `0${time.hour}` : time.hour
	const minuteString =
		time.minute === undefined ? "00" : time.minute < 10 ? `0${time.minute}` : time.minute
	const secondString =
		time.second === undefined ? "00" : time.second < 10 ? `0${time.second}` : time.second
	if (!yearString && !monthString && !dayString)
		return `${hourString}:${minuteString}:${secondString}`
	if (!monthString && monthString && dayString) return `${monthString} - ${dayString}`
	return `${hourString}:${minuteString}:${secondString}`
}
