import style from '../sortParam.module.scss'

import { FC, SetStateAction, useState, Dispatch } from 'react'

import SortItems from './sortItems.component'

import { UnderCategories } from '@/store/productStore/interfaces/products.interface'

interface ComponentsProps {
	title: string
	optionArray: UnderCategories[]
	value: string
	setStateAction: Dispatch<SetStateAction<string>>
}

const SortItemWithSub: FC<ComponentsProps> = ({
	optionArray,
	title,
	setStateAction,
	value,
}) => {
	const [selectedSubOption, setSelectSubOption] = useState<string>('All')
	const [isOpen, setOpen] = useState<boolean>(true)

	const showOptions = () => setOpen(!isOpen)

	const showOptionsItems = (event: any) => {
		if (event.target.textContent === selectedSubOption) {
			setSelectSubOption('')
		} else {
			setSelectSubOption(event.target.textContent)
		}
	}

	const setSelectToAll = () => setStateAction('All')

	return (
		<div className={style.search_items_container}>
			<button
				type='button'
				className={style.search_selector}
				onClick={showOptions}
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
			<div className={isOpen ? undefined : style.search_params_hidden}>
				<input
					onChange={setSelectToAll}
					checked={value === 'All'}
					value='All'
					className={style.search_input_param}
					id='AllC'
					type='radio'
				/>
				<label className={style.search_params} htmlFor='AllC'>
					All
				</label>
				{optionArray?.map(element => {
					return (
						<div key={element.title}>
							{
								<div style={{ marginLeft: '0.5rem' }}>
									<button
										type='button'
										className={style.search_selector}
										onClick={showOptionsItems}
									>
										<p>{element.title}</p>
										<span
											className={
												selectedSubOption === element.title
													? style.search_params_icon_rotate
													: style.search_params_icon
											}
										>
											&#8250;
										</span>
									</button>
									<div
										style={
											selectedSubOption === element.title
												? {
														marginLeft: '0.5rem',
														overflow: 'hidden',
														height: `calc(${30}px * ${element.items.length})`,
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
										{element.items.map(element => (
											<SortItems
												key={element}
												text={element}
												selected={value}
												setSelected={setStateAction}
											/>
										))}
									</div>
								</div>
							}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default SortItemWithSub
