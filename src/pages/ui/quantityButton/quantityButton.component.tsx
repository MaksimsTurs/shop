import style from './quantityButton.module.scss'

import { Dispatch, FC, SetStateAction } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
	decrementProductIntoCart,
	incrementProductIntoCart,
} from '@/store/productStore/productSlice'

import { AppDispatch, RootState } from '@/store/store'
import {
	ProductInitialState,
} from '@/store/productStore/interfaces/products.interface'

interface ComponentProps {
	id?: number
	setCount?: Dispatch<SetStateAction<number>>
	count?: number
}

const QuantityButton: FC<ComponentProps> = ({ id, setCount, count = 1 }) => {
	const dispatch = useDispatch<AppDispatch>()
	const { cart } = useSelector<RootState, ProductInitialState>(
		state => state.products
	)

	const index: number = cart.findIndex(element => element.id === id)

	const increment = () => {
		if (!setCount) {
			dispatch(incrementProductIntoCart(index))
		} else {
			setCount((prev: number) => prev + 1)
		}
	}
	const decrement = () => {
		if (!setCount) {
			if (cart[index].count < 1) {
				return
			} else {
				dispatch(decrementProductIntoCart(index))
			}
		} else {
			if (count <= 1) {
				return
			} else {
				setCount((prev: number) => prev - 1)
			}
		}
	}

	return (
		<div className={style.count_container}>
			<div className={style.count_button_container}>
				<button
					type='button'
					onClick={decrement}
					className={style.count_button}
				>
					-
				</button>
				<p className={style.count_num}>
					{setCount ? count : cart[index].count}
				</p>
				<button
					type='button'
					onClick={increment}
					className={style.count_button}
				>
					+
				</button>
			</div>
		</div>
	)
}

export default QuantityButton
