import DetailedProducInfo from '@/components/deatailedProduct/detailedProduct.component'
import ProductDetailedLoader from '@/components/productDetailedLoader/productDetailedLoader.component'

import { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { RootState, AppDispatch } from '@/store/store'
import { ProductInitialState } from '@/store/productStore/interfaces/products.interface'

import { getSingleProduct } from '@/store/productStore/productSlice'

const ProductDetailed: FC = () => {
	const [isLoading, setLoading] = useState<boolean>(true)

	const { currentPageProducts } = useSelector<RootState, ProductInitialState>(
		state => state.products
	)

	const dispatch = useDispatch<AppDispatch>()

	const { search } = useLocation()

	useEffect(() => {
		setTimeout(() => {
			setLoading(false)
			dispatch(getSingleProduct(Number(search.replace('?id=', ''))))
		}, 700)
	}, [])

	return (
		<div
			style={{
				margin: '1.5rem 0rem',
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			{isLoading ? (
				<ProductDetailedLoader />
			) : (
				<DetailedProducInfo product={currentPageProducts[0]} />
			)}
		</div>
	)
}

export default ProductDetailed
