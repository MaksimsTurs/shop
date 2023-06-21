import style from './sliderButtton.module.scss'

import { Dispatch, FC, SetStateAction } from 'react'

interface ComponentProps {
	activeSlide: number
	slides: number
	slideTo: Dispatch<SetStateAction<number>>
}

const SliderButton: FC<ComponentProps> = ({ activeSlide, slides, slideTo }) => {
	return (
		<div className={style.slider_index_container}>
			{[...Array(slides)].map((_, index: number) => {
				return (
					<div
            key={index}
						className={
							index === activeSlide
								? `${style.slider_index} ${style.slider_index_active}`
								: style.slider_index
						}
						onClick={() => slideTo(index)}
					></div>
				)
			})}
		</div>
	)
}

export default SliderButton
