import style from './cartContainer.module.scss'

import { FC, Fragment } from 'react'
import { useDispatch } from 'react-redux'

import { ProductData } from '@/store/productStore/interfaces/products.interface'
import { AppDispatch } from '@/store/store'

import {
	clearCart,
} from '@/store/productStore/productSlice'
import CartData from './components/cartData.component'

interface ComponentProps {
	cart: ProductData[]
}

const CartContainer: FC<ComponentProps> = ({ cart }) => {
	const dispatch = useDispatch<AppDispatch>()

	const clearProductCart = () => dispatch(clearCart(''))

	return (
		<Fragment>
			{cart.length <= 0 ? (
				<div className={style.cart_empty}>
					<p> Your Cart is empty!</p>
				</div>
			) : (
				<div className={style.cart_main_container}>
					<div className={style.cart_products_contaier}>
						<div>
							<ul className={style.cart_products_header}>
								<li style={{ width: '16.5rem' }}>Product</li>
								<li style={{ width: '8rem' }}>Price</li>
								<li className={style.width_midlle}>Quantity</li>
								<li className={style.width_small}>Total cost</li>
							</ul>
							{cart.map(element => <CartData key={element.id} data={element}/>)}
						</div>
						<button
							type='button'
							className={style.cart_clear_button}
							onClick={clearProductCart}
						>
							Delete all
						</button>
					</div>
					<div className={style.cart_cost_container}></div>
				</div>
			)}
		</Fragment>
	)
}

export default CartContainer
