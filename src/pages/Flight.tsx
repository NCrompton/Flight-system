import { useState } from "react"
import FlightList from "../components/FlightList"
import AddFlight from "../components/AddFlight"
import { Title, Group } from "@mantine/core"
import { IconPlane } from "@tabler/icons"

export default function Flight() {
	return (
		<div className="flight-container">
			<Group>
				<Title>Flight</Title>
				<IconPlane size={40} />
			</Group>

			<hr />
			<FlightList />
			<Title>Add Flight</Title>
			<hr />
			<AddFlight />
		</div>
	)
}
