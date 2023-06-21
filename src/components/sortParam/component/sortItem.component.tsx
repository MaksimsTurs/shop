import style from '../sortParam.module.scss'

import { Dispatch, FC, SetStateAction, useState } from 'react'

import SortItems from './sortItems.component'

interface ComponentsProps {
	title: string
	value: string
	options: string[]
	setStateAction: Dispatch<SetStateAction<string>>
}

const SortItem: FC<ComponentsProps> = ({ options, title, value, setStateAction }) => {
	const [isOpen, setOpen] = useState<boolean>(false)

	const showOption = () => setOpen(!isOpen)

	return (
		<div className={style.search_items_container}>
			<button
				type='button'
				className={style.search_selector}
				onClick={showOption}
			>
				<p>{`${title}: ${value}`}</p>
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
								height: `calc(${30}px * ${options.length})`,
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
				{options.map(element => {
					return (
						<SortItems
							key={element}
							selected={value}
							setSelected={setStateAction}
							text={element}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default SortItem
