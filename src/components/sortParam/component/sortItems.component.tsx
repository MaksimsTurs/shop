import style from '../sortParam.module.scss'

import { FC, Dispatch, SetStateAction, Fragment } from 'react'

interface ComponentsProps {
	text: string
	setSelected: Dispatch<SetStateAction<string>>
	selected: string
}

const SortItems: FC<ComponentsProps> = ({
	text,
	selected,
	setSelected,
}) => {

	const selectOption = (event: any) => setSelected(event.target.value)

	return (
		<Fragment>
			<input
				onChange={selectOption}
				checked={selected === text}
				value={text}
				className={style.search_input_param}
				id={text}
				type='radio'
			/>
			<label className={style.search_params} htmlFor={text}>
				{text}
			</label>
		</Fragment>
	)
}

export default SortItems
