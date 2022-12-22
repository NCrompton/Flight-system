import { ChangeEvent, useEffect, useState } from "react"
import { superbase } from "../api/api"
import Flight from "../model/flight"
import Airline from "../model/airline"
import { Time, currencyList } from "../model/utilmodel"
import InputTime from "./InputTime"
import InputPrice from "./InputPrice"
import { getAirline, addAirline } from "../api/api"

export default function AddFlight() {
	const [flight, setFlight] = useState<Flight>({
		flight_no: "",
		airline: 4,
		from: "",
		to: "",
		distance: 0,
	})
	const [airlines, setAirlines] = useState<Array<Airline>>([])
	const [duration, setDuration] = useState<Time>({ hour: 0, minute: 0 })
	const [time, setTime] = useState<Time>({ hour: 0, minute: 0 })

	const addFlight = async () => {
		console.log("Adding Flight...")
		const newFlight: Flight = flight || console.log("error")
		//const { error } = await superbase.from("Flight").insert(newFlight)
		//error ? console.log(error) : console.log("Success")
		console.log(newFlight)
	}

	const loadAirline = async () => {
		const airlines = await getAirline()
		setAirlines(airlines ?? [])
	}

	const changePrice = (newPrice: number) => {
		setFlight({ ...flight, price: newPrice })
	}

	//TODO rewrite this
	useEffect(() => {
		loadAirline()
	}, [])

	useEffect(() => {
		if (time.minute === undefined || time.hour === undefined) return
		setFlight({
			...flight,
			boarding_time: `${time.hour.toString()}:${time.minute.toString()}`,
		})
	}, [time])

	useEffect(() => {
		if (duration.minute === undefined || duration.hour === undefined) return
		setFlight({
			...flight,
			duration: duration.hour * 60 + duration.minute,
		})
	}, [duration])

	return (
		<div>
			<div className="row g-3 align">
				<label className="col-sm-2 col-form-label">Flight ID</label>
				<div className="col-sm-3">
					<input
						className="form-control"
						onChange={(e) => setFlight({ ...flight, flight_no: e.target.value })}
					/>
				</div>
				<div className="col-sm-1"></div>
				<label className="col-sm-2 col-form-label">Airline</label>
				<div className="col-sm-3">
					<select
						className="form-select"
						aria-label="Airline Selection"
						defaultValue=""
						onChange={(e) =>
							setFlight({ ...flight, airline: parseInt(e.target.value) })
						}
					>
						{airlines.map((airline) => {
							return airline.id && airline.name ? (
								<option value={airline.id} key={airline.id}>
									{airline.name}
								</option>
							) : (
								<></>
							)
						})}
					</select>
				</div>
				<label className="col-form-label col-sm-2">Aircraft</label>
				<div className="col-sm-3">
					<input
						className="form-control"
						onChange={(e) => setFlight({ ...flight, aircraft: e.target.value })}
					/>
				</div>
				<div className="col-sm-1"></div>
				<label className="col-form-label col-sm-2">Price</label>
				<div className="col-sm-3">
					<InputPrice setPrice={changePrice} baseCurrency={currencyList[0]} />
				</div>
				<label className="col-form-label col-sm-2">Boarding Time</label>
				<div className="col-sm-3 position-relative">
					<InputTime setTime={setTime} tz />
				</div>
				<div className="col-sm-1"></div>
				<label className="col-sm-2 form-label">Duration</label>
				<div className="col-sm-3">
					<InputTime setTime={setDuration} />
				</div>
				<label className="col-form-label col-sm-2">Route</label>
				<div className="col-sm-3">
					<label className="col-form-label">From</label>
					<input
						className="form-control"
						onChange={(e) => setFlight({ ...flight, from: e.target.value })}
					/>
				</div>
				<div className="col-sm-3">
					<label className="col-form-label">To</label>
					<input
						className="form-control"
						onChange={(e) => setFlight({ ...flight, to: e.target.value })}
					/>
				</div>
				<div className="col-sm-3">
					<label className="col-form-label">Distance</label>
					<div className="input-group">
						<input
							type="number"
							className="form-control"
							onChange={(e) =>
								setFlight({ ...flight, distance: parseInt(e.target.value) })
							}
						/>
						<span className="input-group-text">KM</span>
					</div>
				</div>
				<div className="col-sm-2"></div>
				<div className="col-sm-5 d-flex gap-3">
					<button className="btn btn-secondary" onClick={addFlight}>
						Add Flight
					</button>
					<button className="btn btn-secondary" onClick={getAirline}>
						Update Airline
					</button>
				</div>
			</div>
		</div>
	)
}
