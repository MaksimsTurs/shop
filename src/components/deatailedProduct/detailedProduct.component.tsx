import style from './detailedProduct.module.scss'

import { ProductData } from '@/store/productStore/interfaces/products.interface'
import { AppDispatch } from '@/store/store'

import { FC, Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'

import StarRating from '@/pages/ui/starRating/starRating.component'
import { addProductToCart } from '@/store/productStore/productSlice'
import QuantityButton from '@/pages/ui/quantityButton/quantityButton.component'

interface ComponentProps {
	product: ProductData
}

const DetailedProducInfo: FC<ComponentProps> = ({ product }) => {
	const [currentSlide, setCurrentSlide] = useState<string>(product.images[0])
	const [count, setCount] = useState<number>(1)
	const [isOpen, setOpen] = useState<boolean>(false)

	const dispatch = useDispatch<AppDispatch>()

	const showNewSlide = (event: any) => setCurrentSlide(event.target.src)

	const showDescription = () => setOpen(!isOpen)

	const addToCart = () => dispatch(addProductToCart({ product, count }))

	return (
		<div>
			<div className={style.detailed_product_main_info}>
				<div>
					<img
						className={style.detailed_product_image}
						src={currentSlide}
						alt={product.title}
					/>
					<div className={style.detailed_product_image_slider}>
						{product.images.slice(0, 3).map(element => {
							return (
								<img
									onClick={showNewSlide}
									key={element}
									className={
										currentSlide === element
											? `${style.detailed_slider_active} ${style.detailed_slider_image}`
											: style.detailed_slider_image
									}
									src={element}
									alt={product.title}
								/>
							)
						})}
					</div>
				</div>
				<div className={style.detailed_product_info_container}>
					<div className={style.detailed_product_info_top}>
						<h3 className={style.detailed_title}>{product.title}</h3>
						<h4 className={style.detailed_price}>{product.price} $</h4>
						<StarRating rating={Math.floor(product.rating)} />
						<div style={{ display: 'flex' }}>
							<p className={style.detailed_availability}>Availability:</p>
							{product.stock > 0 ? (
								<p className={style.detailed_avalable}>&#10003; In stock</p>
							) : (
								<p className={style.detailed_not_avalable}>
									&#10003; Not in stock
								</p>
							)}
						</div>
						{product.stock > 0
							? `Hurry up! only ${product.stock} product left in stock`
							: null}
					</div>
					<QuantityButton id={product.id} setCount={setCount} count={count} />
					<div className={style.detailed_button_container}>
						<button
							type='button'
							className={style.detailed_product_dispatcher}
							onClick={addToCart}
						>
							Add to Cart
						</button>
						<button type='button' className={style.detailed_product_dispatcher}>
							By now
						</button>
					</div>
					<div>
						<div className={style.detailed_product_title}>
							<p>Brand:</p> <span>{product.brand}</span>
						</div>
						<div className={style.detailed_product_title}>
							<p>Category:</p> <span>{product.category}</span>
						</div>
					</div>
				</div>
			</div>
			<div className={style.detailed_product_description}>
				{isOpen ? (
					<Fragment>
						<button type='button' onClick={showDescription}>
							Hidde Description
						</button>
						<p>{product.description}</p>
					</Fragment>
				) : (
					<button type='button' onClick={showDescription}>
						Show Description
					</button>
				)}
			</div>
		</div>
	)
}

export default DetailedProducInfo
