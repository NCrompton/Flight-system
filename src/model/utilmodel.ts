export type Timezone = {
	name: string
	time_different: number
}

export type Time = {
	year?: number
	month?: number
	day?: number
	hour?: number
	minute?: number
	second?: number
}

export type Currency = {
	name: string
	rate: number
}

const test = [1, 2]

export const timezoneList: Array<Timezone> = [
	{ name: "GMT", time_different: 0 },
	{ name: "HKT", time_different: 8 },
	{ name: "EST", time_different: -5 },
]

const updateCurrencyTime: Time = { year: 2022, month: 11, day: 25, hour: 3, minute: 40 }

export const currencyList: Array<Currency> = [
	{ name: "USD", rate: 100 },
	{ name: "HKD", rate: 13 },
	{ name: "GBP", rate: 121 },
	{ name: "JPY", rate: 0.72 },
	{ name: "EUR", rate: 104 },
	{ name: "CAD", rate: 75 },
]
