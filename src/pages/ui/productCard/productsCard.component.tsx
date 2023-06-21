import style from './productCard.module.scss'

import { FC, useState } from 'react'
import { Link } from 'react-router-dom'

import AddToCurtButton from '@/pages/ui/addToCartButton/addToCartButton.component'
import StarRating from '@/pages/ui/starRating/starRating.component'

import { ProductData } from '@/store/productStore/interfaces/products.interface'

interface ComponeProps {
	product: ProductData
}

const ProductCard: FC<ComponeProps> = ({ product }) => {
	const [isOver, setButton] = useState<boolean>(false)

	const rating: number = Math.floor(product.rating)

	const showButton = (event: any) => {
		if (event.type === 'mouseenter') return setButton(true)
		if (event.type === 'mouseleave') return setButton(false)
	}

	return (
		<div
			className={style.products_card_body}
			onMouseEnter={showButton}
			onMouseLeave={showButton}
		>
			<button type='button' className={style.products_favorite_icon}>
				<svg width='15' height='16' viewBox='0 0 15 16' fill='none'>
					<path
						d='M7.873 13.4797C7.66835 13.5519 7.33128 13.5519 7.12663 13.4797C5.38111 12.8838 1.48077 10.3979 1.48077 6.18459C1.48077 4.32471 2.97952 2.81995 4.82736 2.81995C5.92283 2.81995 6.89189 3.34962 7.49981 4.16821C8.10774 3.34962 9.08282 2.81995 10.1723 2.81995C12.0201 2.81995 13.5189 4.32471 13.5189 6.18459C13.5189 10.3979 9.61852 12.8838 7.873 13.4797Z'
						stroke='#292D32'
						strokeWidth='0.902856'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</button>
			<Link className={style.products_card_icon_container} to={`/product?id=${product.id}`}>
				<img
					className={style.products_card_icon}
					src={product.thumbnail}
					alt={product.title}
				/>
			</Link>
			<h5 className={style.products_title}>{product.title}</h5>
			<p className={style.products_price}>{product.price} $</p>
			<div className={style.products_star_container}>
				{isOver ? (
					<AddToCurtButton product={product} />
				) : (
					<StarRating rating={rating} />
				)}
				<div className={style.products_info_container}>
					<p>Brand:</p>
					<span>{product.brand}</span>
				</div>
				<div className={style.products_info_container}>
					<p>Category</p>
					<span>{product.category}</span>
				</div>
			</div>
		</div>
	)
}

export default ProductCard
