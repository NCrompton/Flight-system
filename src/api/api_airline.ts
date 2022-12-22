import Airline from "../model/airline"
import { superbase } from "./superbase"
import { PostgrestError } from "@supabase/supabase-js"

export async function getAirline(): Promise<Array<Airline> | undefined> {
	console.log("refetching airline...")

	const { data, error } = await superbase.from("Airline").select("*")
	console.log(error ?? "Retrieved!")
	if (error) return

	const airlines: Array<Airline> = data
	console.log(airlines)
	return airlines
}

export async function getAirlineById(id: number): Promise<Airline | undefined> {
	console.log("fetching airline name...")

	const { data, error } = await superbase.from("Airline").select("name").eq("id", id)
	console.log(error ?? "Retrieved!")
	if (error) return

	const airline: Airline = data[0]
	console.log(airline)
	return airline
}

export async function addAirline(airline: Airline): Promise<PostgrestError | undefined> {
	const data: Airline = airline
	const { error } = await superbase.from("Airline").insert(data)
	error ? console.log(error) : console.log("success")
	return error ?? undefined
}
