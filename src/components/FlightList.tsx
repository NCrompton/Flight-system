import { getFlight, editFlight } from "../api/api"
import { useEffect, useState } from "react"
import type Flight from "../model/flight"
import { Time } from "../model/utilmodel"
import { calTime, convertTime } from "../util/time"
import FlightInfo from "./FlightInfo"
import "../static/FlightList.css"

export default function FlightList() {
	const [flights, setFlights] = useState<Array<Flight>>([])
	const [targetFlight, setTarget] = useState<number>(-1)
	const [airlineList, setList] = useState<Array<boolean>>([])
	const loadData = async () => {
		const flights = await getFlight()
		setFlights(flights ?? [])
	}

	const calDuration = (timeString: string | undefined, duration: number | undefined) => {
		if (timeString === undefined) return
		if (duration === undefined) return
		const time: Time = convertTime(timeString)
		const duration_t: Time = calTime(time, duration) ?? {}
		if (duration_t.hour === undefined || duration_t.minute === undefined) return
		return `${duration_t.hour}:${
			duration_t.minute < 10 ? "0" + duration_t.minute : duration_t.minute
		}:00`
	}

	const handleOpen = (i: number) => {
		targetFlight === i ? setTarget(-1) : setTarget(i)
		const list = airlineList
		list[i] = true
		setList(list)
	}

	const onChangeData = (model: Flight) => {
		if (model === undefined) return
		console.log(model)
		editFlight(model)
	}

	return (
		<div className="">
			<table className="table">
				<thead>
					<tr>
						<th className="col">Flight No.</th>
						<th className="col">Airline</th>
						<th className="col">Aircraft</th>
						<th className="col">From</th>
						<th className="col">To</th>
						<th className="col">Distance</th>
						<th className="col">Price</th>
						<th className="col">Boarding Time</th>
						<th className="col">Arrival Time</th>
					</tr>
				</thead>
				<tbody>
					{flights.map((flight, i) => (
						<>
							<tr key={flight.flight_no} onClick={() => handleOpen(i)}>
								<td className="col">{flight.flight_no}</td>
								<td className="col">{flight.airline}</td>
								<td className="col">{flight.aircraft}</td>
								<td className="col">{flight.from}</td>
								<td className="col">{flight.to}</td>
								<td className="col">{flight.distance}</td>
								<td className="col">US${flight.price}</td>
								<td className="col">{flight.boarding_time}</td>
								<td className="col">
									{calDuration(flight.boarding_time, flight.duration)}
								</td>
							</tr>
							{targetFlight === i || airlineList[i] ? (
								<tr className="flight-info-row">
									<td colSpan={9}>
										<FlightInfo
											className={`flight-info-col ${
												targetFlight === i ? "display" : "none"
											}`}
											flight={flight}
											handleChange={onChangeData}
											style={
												targetFlight === i
													? { height: "" }
													: { height: "0px" }
											}
										/>
									</td>
								</tr>
							) : (
								<></>
							)}
						</>
					))}
				</tbody>
			</table>
			{/* <button
				className="btn btn-secondary"
				onClick={() => {
					const f: Flight = {
						flight_no: "TS999",
						airline: 4,
						aircraft: "B797",
						price: 200,
						from: "Hong Kong",
						to: "Tokyo",
						distance: 2800,
					}
					setFlights([f, ...flights])
				}}
			>
				Add Sample
			</button> */}
			<button className="btn btn-secondary m-2" onClick={loadData}>
				Load
			</button>
		</div>
	)
}
