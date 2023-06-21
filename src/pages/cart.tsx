import { FC } from 'react'
import { useSelector } from 'react-redux'

import CartContainer from '@/components/cart/cartContainer.component'

import { RootState } from '@/store/store'
import { ProductInitialState } from '@/store/productStore/interfaces/products.interface'

const Cart: FC = () => {
  const { cart } = useSelector<RootState, ProductInitialState>(state => state.products)

  return <CartContainer cart={cart}/>
}

export default Cart