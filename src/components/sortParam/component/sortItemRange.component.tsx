import style from '../sortParam.module.scss'

import { Dispatch, FC, SetStateAction, useState } from 'react'

interface ComponentsProps {
	title: string
	options: any[]
	setStateAction: Dispatch<SetStateAction<number>>[]
	stateActionValue: number[]
}

const SortItemRange: FC<ComponentsProps> = ({
	options,
	title,
	setStateAction,
	stateActionValue,
}) => {
	const [isOpen, setOpen] = useState<boolean>(false)

	const showOption = () => setOpen(!isOpen)

	return (
		<div className={style.search_items_container}>
			<button
				type='button'
				className={style.search_selector}
				onClick={showOption}
			>
				<p>{title}</p>
				<span
					className={
						isOpen ? style.search_params_icon_rotate : style.search_params_icon
					}
				>
					&#8250;
				</span>
			</button>
			<div
				style={
					isOpen
						? {
								marginLeft: '0.5rem',
								overflow: 'hidden',
								height: `calc(${39}px * ${options.length})`,
								transition: `all 0.3s ease`,
						  }
						: {
								marginLeft: '0.5rem',
								overflow: 'hidden',
								height: 0,
								transition: `all 0.3s ease`,
						  }
				}
			>
				{options.map((element, index) => {
					return (
						<div className={style.search_range_container} key={`${element.title}`}>
							<label className={style.search_range_label} htmlFor={element.title.toLowerCase()}>
								{`${element.title}: ${stateActionValue[index]}`}
							</label>
							<input
								onChange={(event: any) => setStateAction[index](event.target.value)}
								className={style.search_range_input}
								min={0}
								max={element.max}
								value={stateActionValue[index]}
								id={element.title.toLowerCase()}
								name={element.title}
								type='range'
							/>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default SortItemRange
