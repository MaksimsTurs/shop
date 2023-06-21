import style from '@/components/prodSlider/prodSlider.module.scss'

import { FC, useMemo } from 'react'
import { Link } from 'react-router-dom'

import { ProductData } from '@/store/productStore/interfaces/products.interface'

interface ComponentProps {
	productData: ProductData[]
	activeSlide: number
}

const ProdSliderBottom: FC<ComponentProps> = ({ productData, activeSlide }) => {
	return (
		<div className={style.slider_bottom_container}>
			{productData.map((data: ProductData, index: number) => {
				return (
					<Link
          key={data.id}
						className={
							index === activeSlide
								? `${style.slider_bottom_body} ${style.slider_bottom_active}`
								: style.slider_bottom_body
						}
						to={`/product?id=${data.id}`}
					>
						<img
							className={style.slider_bottom_icon}
							src={data.thumbnail}
							alt={data.title}
						/>
						<div className={style.slider_bottom_data}>
							<h4>{data.title}</h4>
							<p>
								{useMemo(
									() => `${Math.floor(Math.random() * 20 + 1)} items`,
									[]
								)}
							</p>
						</div>
					</Link>
				)
			})}
		</div>
	)
}

export default ProdSliderBottom
