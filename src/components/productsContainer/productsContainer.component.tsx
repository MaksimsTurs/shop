import style from './productsContainer.module.scss'

import { FC, Fragment, useState } from 'react'

import ProductHeader from './ui/productsHeader.component'
import ProductCard from '../../pages/ui/productCard/productsCard.component'
import TextLoader from '../loaders/ui/textLoader.component'
import ProductAction from './ui/productAction.component'
import BestProduct from './ui/bestProduct.component'
import Pagination from '@/pages/ui/pagination/pagination.component'

import { RootState } from '@/store/store'
import { ProductInitialState } from '@/store/productStore/interfaces/products.interface'

import { useSelector } from 'react-redux'
import ProductCardsLoader from '../productCardsLoader/productCardsLoader.component'

const ProductsContainer: FC = () => {
	const {
		isLoading,
		currentPageProducts,
		pagesCount,
		currentPage,
		bestProduct,
	} = useSelector<RootState, ProductInitialState>(state => state.products)

	const [isPagiantionLoading, setPaginationLoading] = useState<boolean>(false)

	return (
		<Fragment>
			<ProductHeader products={currentPageProducts} />
			<Pagination
				setLoading={setPaginationLoading}
				pagesCount={pagesCount}
				currentPage={currentPage}
			/>
			{isLoading || isPagiantionLoading ? (
				<ProductCardsLoader />
			) : (
				<div className={style.products_card_container}>
					{currentPageProducts.map(data => (
						<ProductCard product={data} key={data.id} />
					))}
				</div>
			)}
			<ProductAction />
			{isLoading ? <TextLoader /> : <BestProduct products={bestProduct} />}
			<Pagination
				setLoading={setPaginationLoading}
				pagesCount={pagesCount}
				currentPage={currentPage}
			/>
		</Fragment>
	)
}

export default ProductsContainer
