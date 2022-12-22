import Flight from "../model/flight"
import { superbase } from "./superbase"
import { PostgrestError } from "@supabase/supabase-js"

const COLLECTION = "Flight"
const KEY_COL = "flight_no"

async function getFlight() {
	console.log("refetching flight...")

	const { data, error } = await superbase.from("Flight").select("*")
	console.log(error ?? "Retrieved!")
	if (error) return

	const flights: Array<Flight> = data
	console.log(flights)
	return flights
}

async function addFlight(flight: Flight): Promise<PostgrestError | undefined> {
	const data: Flight = flight
	const { error } = await superbase.from("Flight").insert(data)
	error ? console.log(error) : console.log("success")
	return error ?? undefined
}

async function editFlight(flight: Flight): Promise<PostgrestError | undefined> {
	if (flight.flight_no === undefined) return
	const target: Flight = flight
	const { data, error } = await superbase
		.from(COLLECTION)
		.update(target)
		.eq(KEY_COL, target.flight_no)
	error ? console.log(error) : console.log(`updated ${flight.flight_no}`)
	data ? console.log(data) : console.log("no data found")
	return error ?? undefined
}

export { getFlight, addFlight, editFlight }
