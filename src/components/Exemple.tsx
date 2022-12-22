import { Stack, Button } from "react-bootstrap"

export default function Exemple({ children, className }: { [key: string]: any }) {
	return (
		<Stack className={className}>
			<Button as="a" variant="primary">
				ASo
			</Button>
			<div className="alert py-6 ">
				alert
				<div className="d-flex flex-column align-items-center">{children}</div>
			</div>
			<button className="ml-5 btn-close"></button>
			<table className="table ">
				<thead>
					<tr>
						<td scope="row"></td>
						<td scope="col">1</td>
						<td scope="col">2</td>
						<td scope="col">3</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td scope="row">Polish</td>
						<td>Jeden</td>
						<td>Dwa</td>
						<td>Trzy</td>
					</tr>
					<tr>
						<td scope="row">French</td>
						<td>Un</td>
						<td>Deux</td>
						<td>Trois</td>
					</tr>
				</tbody>
			</table>
		</Stack>
	)
}
