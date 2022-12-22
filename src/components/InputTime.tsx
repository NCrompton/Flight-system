import { useEffect, useState } from "react"
import { Time, Timezone, timezoneList } from "../model/utilmodel"
import "../static/Input.css"

export default function TimeInput({ setTime, time, tz, className }: { [key: string]: any }) {
	const timezoneAvailable = tz ?? false
	const tzList: Array<Timezone> = timezoneList
	const [expanded, setExpand] = useState(false)
	const [timezone, setTz] = useState<Timezone>(tzList[0])
	const [displayT, setDisplay] = useState<Time>(time ?? { hour: 0, minute: 0 })

	const expand = () => {
		setExpand(!expanded)
	}

	const updateTime = (newTime: Time) => {
		setTime ? setTime(newTime) : console.log("no set Time function is passed")
	}

	const handleTime = (newTime: Time) => {
		if (!(newTime.hour !== undefined && 0 <= newTime.hour && newTime.hour < 24)) return
		if (!(newTime.minute !== undefined && 0 <= newTime.minute && newTime.minute < 60)) return
		const timeValidate = newTime.hour - timezone.time_different
		const new_hour: number = timeValidate > 0 ? timeValidate : 24 + timeValidate
		console.log({ ...newTime, hour: new_hour })
		updateTime({ ...newTime, hour: new_hour })
		setDisplay(newTime)
	}

	const handleChangeTz = (newTz: Timezone) => {
		setTz(newTz)
		setExpand(false)
	}

	useEffect(() => {
		handleTime(displayT)
	}, [timezone])

	return (
		<div className={className}>
			<div className="input-group">
				<input
					className="form-control"
					type="number"
					value={displayT.hour}
					min="0"
					max="24"
					onChange={(e) => handleTime({ ...displayT, hour: parseInt(e.target.value) })}
				/>
				<span className="input-group-text">:</span>
				<input
					className="form-control"
					type="number"
					value={displayT.minute}
					min="0"
					max="24"
					onChange={(e) => handleTime({ ...displayT, minute: parseInt(e.target.value) })}
				/>
				{timezoneAvailable ? (
					<div className="position-relative">
						<button
							className="btn btn-secondary dropdown-toggle select-button"
							data-bs-toggle="dropdown"
							type="button"
							onClick={expand}
							style={{
								borderRadius: expanded ? "0px 10px 0px 0px" : "0px 10px 10px 0px",
							}}
						>
							{timezone?.name ?? "Timezone"}
						</button>
						<div
							className="select-menu"
							style={{ display: expanded ? "flex" : "None" }}
						>
							{tzList.map((tz) => {
								return (
									<button
										className="btn select-item"
										title={`UTC ${
											tz.time_different < 0
												? tz.time_different
												: `+${tz.time_different}`
										}`}
										key={tz.name}
										onClick={() => handleChangeTz(tz)}
									>
										{tz.name}
									</button>
								)
							})}
						</div>
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	)
}
