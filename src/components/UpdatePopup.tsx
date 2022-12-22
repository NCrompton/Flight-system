import { useEffect, useState } from "react"
import "../static/UpdatePopup.css"

type ChangeModel = {
	old: any
	new: any
	changed: boolean
}

export default function UpdatePopup({
	className,
	visibility,
	setVisible,
	OldModel,
	NewModel,
	onConfirm,
}: {
	[key: string]: any
}) {
	const [visible, setVisibility] = useState<boolean>(visibility)
	const [model, setModel] = useChangeModel(OldModel ?? {}, NewModel ?? {})

	const handleConfirm = () => {
		onConfirm ? onConfirm() : console.log("no confirmation action defined")
	}

	useEffect(() => {
		setVisibility(visibility)
	}, [visibility])
	useEffect(() => {
		setModel(OldModel ?? {}, NewModel ?? {})
	}, [OldModel, NewModel])

	return (
		<div className={className}>
			<div
				className="popup-mask"
				style={{ opacity: visible ? 1 : 0, visibility: visible ? "visible" : "hidden" }}
			>
				<div className="popup">
					<div className="fs-3 pb-3">Are you confirm the update</div>
					<div className="d-flex flex-column gap-1">
						{Object.keys(model).map((key) => (
							<InfoRow model={model[key]} k={key} />
						))}
					</div>
					<div className="d-flex gap-3 mt-3">
						<button className="btn btn-primary" onClick={handleConfirm}>
							Confirm
						</button>
						<button className="btn btn-primary" onClick={() => setVisible(false)}>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

const useChangeModel = (
	_oldModel: { [key: string]: any },
	_newModel: { [key: string]: any }
): [{ [key: string]: ChangeModel }, Function] => {
	const [model, setModel] = useState<{ [key: string]: any }>({})

	const updateModel = (_old: { [key: string]: any }, _new: { [key: string]: any }) => {
		var newModel: { [key: string]: any } = {}
		Object.keys(_old).map((key) => {
			newModel[key] = {
				old: _old[key],
				new: _new[key] ?? null,
				changed: _old[key] !== _new[key],
			}
		})
		setModel(newModel)
	}
	useEffect(() => {
		updateModel(_oldModel, _newModel)
	}, [])

	return [model, updateModel]
}

function ArrowIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="currentColor"
			className="bi bi-arrow-right"
			viewBox="0 0 16 16"
		>
			<path
				fill-rule="evenodd"
				d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
			/>
		</svg>
	)
}

function CrossIcon() {
	return (
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				className="bi bi-x-circle-fill"
				viewBox="0 0 16 16"
			>
				<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
			</svg>
			<span> unchanged</span>
		</div>
	)
}

function InfoRow({ model, k }: { [key: string]: any }) {
	const _model: ChangeModel = model ?? {}
	const _key: string = k ?? ""

	return (
		<div className="d-flex gap-3 row" key={_key}>
			<div className="col-sm-2 d-flex align-items-center">{_key.toUpperCase()}</div>
			<div className="col-sm-4" style={{ color: _model.changed ? "red" : "black" }}>
				{_model.old}
			</div>
			<div className="col-sm-1 d-flex align-items-center">
				<ArrowIcon />
			</div>
			{_model.changed ? (
				<div
					className="col-sm-4 d-flex align-items-center"
					style={{
						color: _model.changed ? "forestGreen" : "black",
					}}
				>
					{_model.new}
				</div>
			) : (
				<div className="col-sm-4 d-flex align-items-center gap-3">
					<CrossIcon />
				</div>
			)}
		</div>
	)
}
