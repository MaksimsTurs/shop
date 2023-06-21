import style from './ui/productCard/productCard.module.scss'

import SearchParam from '@/components/sortParam/sortParam.component'
import ProductCard from '@/pages/ui/productCard/productsCard.component'
import Pagination from './ui/pagination/pagination.component'
import ProductCardsLoader from '@/components/productCardsLoader/productCardsLoader.component'

import { FC, useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/store/store'

import { ProductInitialState } from '@/store/productStore/interfaces/products.interface'

const SearchPage: FC = () => {
	const {
		isLoading,
		currentPageProducts,
		underCategories,
		brands,
		currentPage,
		pagesCount,
	} = useSelector<RootState, ProductInitialState>(state => state.products)

	const [isPagiantionLoading, setPaginationLoading] = useState<boolean>(false)

	return (
		<div style={{ margin: '1.5rem 0rem', display: 'flex' }}>
			<SearchParam
				setLoading={setPaginationLoading}
				underCategories={underCategories}
				brands={brands}
			/>
			<div style={{ width: '100%' }}>
				<Pagination
					setLoading={setPaginationLoading}
					currentPage={currentPage}
					pagesCount={pagesCount}
				/>
				{isLoading || isPagiantionLoading ? (
					<ProductCardsLoader />
				) : (
					<div className={style.products_card_container}>
						{currentPageProducts.length <= 0 ? (
							<div
								style={{
									fontSize: '2rem',
									color: '#500',
									fontWeight: 'bolder',
								}}
							>
								Cann not find Products with this Params!
							</div>
						) : (
							currentPageProducts.map(element => (
								<ProductCard key={element.id} product={element} />
							))
						)}
					</div>
				)}
				<Pagination
					setLoading={setPaginationLoading}
					currentPage={currentPage}
					pagesCount={pagesCount}
				/>
			</div>
		</div>
	)
}

export default SearchPage
