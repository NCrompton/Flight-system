import React, { useEffect, useRef, useState } from "react"
import Airline from "../model/airline"
import "../static/AddForm.css"
import { addAirline, superbase } from "../api/api"

export default function AddForm() {
	type FoundedDate = {
		year: number
		month: number
		day: number
	}

	type Status = {
		type: "S" | "F" | undefined
		msg: string
	}

	const offset = new Date().getTimezoneOffset()
	const name = useRef<HTMLInputElement>(null)
	const code = useRef<HTMLInputElement>(null)
	const hub = useRef<HTMLInputElement>(null)
	const [fdate, setDate] = useState(new Date())
	const [status, setStatus] = useState<Status>({ type: undefined, msg: "" })
	const [founded_at, setFounded] = useState<FoundedDate>({
		year: 0,
		month: 0,
		day: 0,
	})

	const submitFlight = async () => {
		const nameValue: string | undefined = name.current?.value
		const codeValue: string | undefined = code.current?.value
		const hubValue: string | undefined = hub.current?.value
		if (nameValue && codeValue && hubValue) {
			const date = new Date(founded_at.year, founded_at.month - 1, founded_at.day)
			const newFlight: Airline = {
				name: nameValue,
				code: codeValue,
				hub: hubValue,
				founded_at: date,
			}
			const error = await addAirline(newFlight)
			error
				? setStatus({ type: "F", msg: error.message })
				: setStatus({ type: "S", msg: "Success" })
		} else {
			setStatus({ type: "F", msg: "Insufficient information" })
		}
	}

	const updateDate = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDate(new Date(e.target.value))
	}

	const syncDate = () => {
		setFounded({ year: fdate.getFullYear(), month: fdate.getMonth() + 1, day: fdate.getDate() })
	}
	const syncDateRe = (v: FoundedDate) => {
		setFounded(v)
		if (!v.year || !v.month || !v.day) return
		if (1900 > v.year || v.year > 2100) return
		if (0 > v.month || v.month > 11) return
		if (1 > v.day || v.day > 31) return
		const tmp = new Date(v.year, v.month - 1, v.day)
		const datetime = new Date(tmp.getTime() - offset * 60 * 1000)
		setDate(datetime)
	}

	useEffect(() => {
		syncDate()
	}, [fdate])

	return (
		<div className="">
			<div className="row g-3 ">
				<label className="col-form-label col-sm-2">Name</label>
				<div className="col-sm-4">
					<input type="text" className="form-control" ref={name} />
				</div>
				<label className="col-form-label col-sm-2 ">Code</label>
				<div className="col-sm-3">
					<input type="text" className="form-control" ref={code} />
				</div>
				<label className="col-form-label col-sm-2">Hub</label>
				<div className="col-sm-4">
					<input type="text" className="form-control" ref={hub} />
				</div>
			</div>
			<div className="row g-3 ">
				<label className="col-sm-2 col-form-label align-self-center">Founded Date</label>
				<div className="col-sm-3">
					<label className="col-form-label">Year</label>
					<input
						className="form-control"
						type="number"
						value={founded_at.year}
						onChange={(e) => {
							const v = { ...founded_at, year: parseInt(e.target.value) }
							syncDateRe(v)
						}}
					/>
				</div>
				<div className="col-sm-3">
					<label className="col-form-label">Month</label>
					<input
						className="form-control"
						type="number"
						value={founded_at.month}
						onChange={(e) => {
							const v = { ...founded_at, month: parseInt(e.target.value) }
							syncDateRe(v)
						}}
					/>
				</div>
				<div className="col-sm-3">
					<label className="col-form-label">Day</label>
					<input
						className="form-control"
						type="number"
						value={founded_at.day}
						onChange={(e) => {
							const v = { ...founded_at, day: parseInt(e.target.value) }
							syncDateRe(v)
						}}
					/>
				</div>
				<div className="col-sm-1">
					<label className="col-form-label">date</label>
					<input
						className="date-picker form-control"
						type="date"
						value={fdate.toISOString().split("T")[0]}
						onChange={updateDate}
					/>
				</div>
				<div className="col-sm-2"></div>
				<div className="position-relative col-sm-8 d-flex h-25 gap-3">
					<button
						className="btn btn-primary mt-3 mb-3 align-self-center"
						onClick={submitFlight}
					>
						Add
					</button>
					{status.type ? (
						<div
							className="position-absolute status-container"
							style={{ background: status.type === "S" ? "#9f9" : "#f99" }}
						>
							{status.msg.toUpperCase()}
						</div>
					) : (
						<></>
					)}
				</div>
				<input
					type="text"
					className="col-sm-3"
					onChange={(e) => setStatus({ type: "S", msg: e.target.value })}
					style={{ display: "none" }}
				></input>
			</div>
		</div>
	)
}
