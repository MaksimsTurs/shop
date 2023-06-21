import style from '../cartContainer.module.scss'

import { FC } from 'react'
import { useDispatch } from 'react-redux'

import QuantityButton from '@/pages/ui/quantityButton/quantityButton.component'

import { deleteItemFromCart } from '@/store/productStore/productSlice'

import { ProductData } from '@/store/productStore/interfaces/products.interface'
import { AppDispatch } from '@/store/store'

interface ComponentProps {
	data: ProductData
}

const CartData: FC<ComponentProps> = ({ data }) => {
	const dispatch = useDispatch<AppDispatch>()

	return (
		<div className={style.cart_product_data_body} key={data.id}>
			<div className={`${style.cart_data_flex} ${style.width_big}`}>
				<img
					className={style.cart_product_image}
					src={data.thumbnail}
					alt={data.title}
				/>
				<div className={style.cart_product_info}>
					<p className={style.cart_product_title}>{data.title}</p>
					<div className={style.cart_product_data}>
						<p>Brand: </p> <span>{data.brand}</span>
					</div>
					<div className={style.cart_product_data}>
						<p>Category: </p> <span>{data.category}</span>
					</div>
				</div>
			</div>
			<div className={`${style.cart_data_container} ${style.width_small}`}>
				<p>{data.price} $</p>
			</div>
			<div className={`${style.cart_data_container} ${style.width_midlle}`}>
				<QuantityButton id={data.id} />
			</div>
			<div
				style={{ justifyContent: 'space-between' }}
				className={`${style.cart_data_flex} ${style.width_small}`}
			>
				<p>{data.price * data.count} $</p>
				<button
					type='button'
					onClick={() => dispatch(deleteItemFromCart(data.id))}
					className={style.cart_delete_button}
				>
					&#9747;
				</button>
			</div>
		</div>
	)
}

export default CartData
