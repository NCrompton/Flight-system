import { ChangeEvent, useEffect, useRef, useState } from "react"
import { getAirlineById } from "../api/api"
import Flight from "../model/flight"
import { convertToString } from "../util/time"
import InputTime from "./InputTime"
import "../static/FlightInfo.css"
import { Time } from "../model/utilmodel"
import InputPrice from "./InputPrice"
import UpdatePopup from "./UpdatePopup"

export default function FlightInfo({
	flight,
	handleChange,
	className,
	style,
}: {
	[key: string]: any
}) {
	const [time, setTime] = useState<Time>({ hour: 0, minute: 0 })
	const [price, setPrice] = useState<number>(0)
	const [updateAlert, setAlert] = useState<boolean>(false)

	const [flightModel, name, setFlight, updateFlightInfo] = useReloadFlightModel(flight)
	const originalFlight = flight ?? {}

	const handleChangeTime = (t: Time) => {
		if (time.hour === undefined || time.minute === undefined) return
		updateFlightInfo({
			...flightModel,
			boarding_time: convertToString(t),
		})
		setTime(t)
	}

	const handleChangePrice = (p: number) => {
		if (p === undefined) return
		updateFlightInfo({ ...flightModel, price: p })
		setPrice(p)
	}

	const onConfirm = () => {
		handleChange ? handleChange(flightModel) : console.log("no confirmation action is provided")
	}

	return (
		<div className={className} style={style}>
			<div className="d-flex mt-3 align-items-center gap-5">
				<div className="gap-1 d-flex align-items-end">
					<div className="fs-3">{flightModel.flight_no}</div>
					<span className="badge bg-primary">Flight Number</span>
				</div>
				<div className="gap-1 d-flex align-items-end">
					<div className="fs-3">{name}</div>
					<span className="badge bg-primary">Airline</span>
				</div>
			</div>
			<hr />
			<div className="row gap-1">
				<EditBox
					className="col-sm-4"
					label="Aircraft"
					data={flightModel.aircraft}
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						const aircraft = e.target.value
						updateFlightInfo({ ...flightModel, aircraft })
					}}
				/>
				<EditBox className="col-sm-4" label="Price" data={`US$ ${flightModel.price}`}>
					<InputPrice className="" setPrice={handleChangePrice} price={price} />
				</EditBox>
			</div>
			<div className="row gap-1">
				<EditBox
					className="col-sm-12"
					label="Boarding Time"
					data={flightModel.boarding_time}
				>
					<InputTime className="m-2" setTime={handleChangeTime} time={time} tz />
				</EditBox>
				<EditBox className="col-sm-4" label="Duration (minute)" data={flightModel.duration}>
					<input
						className="flight-input"
						type="number"
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							const duration = parseInt(e.target.value)
							updateFlightInfo({ ...flightModel, duration })
						}}
					/>
				</EditBox>
			</div>
			<div className="row gap-2">
				<EditBox
					className="col-sm-4"
					label="From"
					data={flightModel.from}
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						const from = e.target.value
						updateFlightInfo({ ...flightModel, from })
					}}
				/>
				<EditBox
					className="col-sm-4"
					label="To"
					data={flightModel.to}
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						const to = e.target.value
						updateFlightInfo({ ...flightModel, to })
					}}
				/>
				<EditBox className="col-sm-2" label="Distance" data={`${flightModel.distance}km`}>
					<input
						className="flight-input"
						type="number"
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							const distance = parseInt(e.target.value)
							updateFlightInfo({ ...flightModel, distance })
						}}
					/>
				</EditBox>
				<div className="d-flex gap-2 align-items-center ms-2 mt-1">
					<label className="">Active ({flightModel.active ? "true" : "false"})</label>
					<input
						className="form-check"
						type="checkbox"
						checked={flightModel.active}
						onChange={(e) =>
							setFlight({
								...flightModel,
								active: e.target.checked,
							})
						}
					/>
				</div>
			</div>
			<div className="">
				<button className="btn btn-secondary mt-2" onClick={() => setAlert(true)}>
					Update
				</button>
			</div>
			<UpdatePopup
				visibility={updateAlert}
				setVisible={setAlert}
				NewModel={flightModel}
				OldModel={originalFlight}
				onConfirm={onConfirm}
			/>
		</div>
	)
}

function EditBox({ label, data, className, onChange, children }: { [key: string]: any }) {
	const [edit, setEdit] = useState<boolean>(false)

	return (
		<div className={className}>
			<div className="d-flex gap-3 align-items-center p-2">
				<label className="flight-label">{label}:</label>
				{edit ? (
					<div className="d-flex align-items-center gap-1">
						<div className="position-relative d-flex">
							{children ?? <input className="flight-input" onChange={onChange} />}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-x-circle position-absolute close-icon"
								viewBox="0 0 16 16"
								onClick={() => setEdit(false)}
							>
								<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
								<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
							</svg>
						</div>
					</div>
				) : (
					<div className="d-flex align-items-center gap-3">
						{data}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							className="bi bi-pencil-fill"
							viewBox="0 0 16 16"
							onClick={() => setEdit(true)}
						>
							<path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
						</svg>
					</div>
				)}
			</div>
		</div>
	)
}

const useReloadFlightModel = (flight: Flight): [Flight, string, Function, Function] => {
	const [flightModel, setFlight] = useState<Flight>(flight ?? {})

	const [airlineName, setName] = useState<string>("")

	//TODO: Use Redux for airline name
	const getModelAirlineName = async (id: number | undefined) => {
		if (id === undefined) return
		console.log("fetching airline name...")
		const airline = (await getAirlineById(id)) ?? { name: "" }
		setName(airline.name)
	}

	const updateFlightInfo = async (newFlight: Flight) => {
		setFlight(newFlight)
		//console.log(flightModel)
	}

	useEffect(() => {}, [flightModel])

	useEffect(() => {
		setFlight(flight ?? {})
		if (flight === undefined) return
		if (flight.airline === undefined) return
		getModelAirlineName(flight.airline)
	}, [flight])

	return [flightModel, airlineName, setFlight, updateFlightInfo]
}
