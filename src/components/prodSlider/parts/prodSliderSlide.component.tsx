import style from '../prodSlider.module.scss'

import { FC } from 'react'

interface ComponentProps {
	productData: any[]
	activeSlide: number
}

const ProdSliderSlide: FC<ComponentProps> = ({ productData, activeSlide }) => {
	return (
		<div className={style.slider_icons_container}>
			{productData.map((data, index: number) => {
				return (
					<div
						key={data.id}
						className={
							index === activeSlide
								? style.slider_icon_content
								: `${style.slider_icon_content} ${style.slider_icon_hidden}`
						}
					>
						<img
							className={style.slider_product_icon}
							src={data.thumbnail}
							alt={data.title}
						/>
						<div className={style.slider_product_price_container}>
							Only
							<p>{data.price}$</p>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default ProdSliderSlide
