import style from '../productsContainer.module.scss'

import { FC, useState } from 'react'

import { ProductData } from '@/store/productStore/interfaces/products.interface'

import StarRating from '@/pages/ui/starRating/starRating.component'
import AddToCurtButton from '@/pages/ui/addToCartButton/addToCartButton.component'
import SliderButton from '@/pages/ui/sliderButton/sliderButton.component'

interface ComponentProps {
	products: ProductData
}

const BestProduct: FC<ComponentProps> = ({ products }) => {
	const [activeSlied, setActiveSlide] = useState<number>(1)

	return (
		<div className={style.products_detailed_container}>
			<div className={style.products_detailed_body}>
				<div className={style.products_detailed_content}>
					<div className={style.products_detailed_icon_container}>
						{products.images.map((src, index: number) => {
							return (
								<img
									key={index}
									className={
										activeSlied == index
											? style.products_detailed_icon
											: `${style.products_detailed_icon} ${style.products_detailed_icon_hiidden}`
									}
									src={src}
									alt={products.title}
								/>
							)
						})}
					</div>
					<div className={style.products_detailed_info_container}>
						<h5 className={style.products_detailed_info_title}>
							{products.title}
						</h5>
						<p className={style.products_detailed_price}>{products.price} $</p>
						<p>{products.description}</p>
						<StarRating rating={Math.floor(products.rating)} />
						{<AddToCurtButton product={products} />}
					</div>
				</div>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
				<SliderButton
					slides={products.images.length}
					activeSlide={activeSlied}
					slideTo={setActiveSlide}
				/>
				</div>
			</div>
		</div>
	)
}

export default BestProduct
