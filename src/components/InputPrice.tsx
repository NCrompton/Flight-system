import { ChangeEvent, useEffect, useState } from "react"
import { Currency, currencyList } from "../model/utilmodel"
import "../static/Input.css"

export default function InputPrice({
	setPrice,
	baseCurrency,
	price,
	className,
}: {
	[key: string]: any
}) {
	const cList: Array<Currency> = currencyList ?? [{}]
	const base: Currency = baseCurrency ?? cList[0]
	const [displayP, setDisplay] = useState<number>(price ?? 0)
	const [expanded, setExpand] = useState<boolean>(false)
	const [currency, setCurrency] = useState<Currency>(cList[0])

	const handlePriceChange = (newPrice: number) => {
		if (newPrice < 0) return
		setDisplay(newPrice)
		setPrice((newPrice * currency.rate) / base.rate)
	}
	const handleCurrencyChange = (c: Currency) => {
		setCurrency(c)
		setExpand(false)
	}

	useEffect(() => {
		handlePriceChange(displayP)
	}, [currency])

	return (
		<div className={className}>
			<div className="input-group">
				<div className="position-relative">
					<button
						className="btn btn-secondary dropdown-toggle select-button"
						data-bs-toggle="dropdown"
						type="button"
						onClick={() => setExpand(!expanded)}
						style={{
							borderRadius: expanded ? "10px 0px 0px 0px" : "10px 0px 0px 10px",
						}}
					>
						{currency?.name ?? "Currency"}
					</button>
					<div className="select-menu" style={{ display: expanded ? "flex" : "None" }}>
						{cList.map((c) => {
							return (
								<button
									className="btn select-item"
									title={`${c.name}:USD 100:${c.rate}`}
									key={c.name}
									onClick={() => handleCurrencyChange(c)}
								>
									{c.name}
								</button>
							)
						})}
					</div>
				</div>
				<input
					className="form-control"
					type="number"
					value={displayP}
					onChange={(e) => handlePriceChange(parseInt(e.target.value))}
				/>
			</div>
		</div>
	)
}
