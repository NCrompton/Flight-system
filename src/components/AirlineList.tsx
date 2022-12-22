import { useEffect, useState } from "react"
import { getAirline, superbase } from "../api/api"
import type Airline from "../model/airline"

export default function AirlineList() {
	const [airlines, setAirlines] = useState<Array<Airline>>([])
	const loadData = async () => {
		const airlines = await getAirline()
		setAirlines(airlines ?? [])
	}

	/* useEffect(() => {
		loadData()
	}, []) */
	const add = async () => {
		const data: Airline = {
			name: "Cathay Pacific",
			hub: "Hong Kong",
			founded_at: new Date(1946, 9, 24),
			code: "CX",
		}
		const { error } = await superbase.from("Airline").insert(data)
		error ? console.log(error) : console.log("success")
	}
	return (
		<div>
			<table className="table table-hover">
				<thead>
					<tr>
						<th>Name</th>
						<th>Code</th>
						<th>Hub</th>
						<th>Age</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Test</td>
						<td>TS</td>
						<td>Kougar Town</td>
						<td>1492-05-10</td>
					</tr>
					{airlines.map((airline) => (
						<tr key={airline.name}>
							<td>{airline.name}</td>
							<td>{airline.code}</td>
							<td>{airline.hub}</td>
							<td>{airline.founded_at?.toString()}</td>
						</tr>
					))}
				</tbody>
			</table>
			<button className="btn btn-primary m-2" onClick={loadData}>
				Load
			</button>
		</div>
	)
}
