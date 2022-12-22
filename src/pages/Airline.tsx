import AirlineList from "../components/AirlineList"
import AddForm from "../components/AddForm"
import { Title, Group } from "@mantine/core"
import { IconBuildingSkyscraper } from "@tabler/icons"

export default function Airline() {
	return (
		<div className="airline-container">
			<Group>
				<Title>Airline</Title>
				<IconBuildingSkyscraper size={40} />
			</Group>

			<hr />
			<AirlineList />
			<Title>Add Airline</Title>
			<hr />
			<AddForm />
		</div>
	)
}
