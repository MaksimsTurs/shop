import style from '@/pages/ui/header/header.module.scss'

import firstLetterToUpercase from '@/functions/firstLetterToUpercase'

import { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { Link } from 'react-router-dom'

const HeaderBottom: FC = () => {
	const { pathname } = useLocation()

	const location =
		pathname === '/' ? 'Home' : firstLetterToUpercase(pathname.replace('/', ''))


	//@ts-ignore
	const [currentOption, setCurrentOption] = useState<string>(location)

	useEffect(() => {
		//@ts-ignore
		setCurrentOption(location)
	}, [location])

	const optionList: string[] = ['Cart', 'Search', '']

	return (
		<div className={style.header_container_bottom}>
			<div className={style.header_container_position}>
				<div className={style.header_menu_button}>
					{currentOption}
					<span className={style.header_icon_open}>&#8250;</span>
					<ul className={style.header_list_items}>
						{optionList.map(element => (
							<li key={element}>
								<Link
									to={`/${element.toLowerCase()}`}
									className={style.header_list_item}
								>
									{element === '' ? 'Home' : element}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default HeaderBottom
