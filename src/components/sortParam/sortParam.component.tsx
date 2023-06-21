import style from './sortParam.module.scss'

import {
	SortParams,
	UnderCategories,
} from '@/store/productStore/interfaces/products.interface'

import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import SortItemWithSub from './component/sortItemWithSub.component'
import SortItem from './component/sortItem.component'
import SubmitButton from '@/pages/ui/submitButton/submitButton.component'
import SortItemRange from './component/sortItemRange.component'

import { AppDispatch } from '@/store/store'

import { getPageProduct, productSort, searchProduct } from '@/store/productStore/productSlice'

import firstLetterToUpercase from '@/functions/firstLetterToUpercase'

interface ComponentsProps {
	underCategories: UnderCategories[]
	brands: string[]
	setLoading: Dispatch<SetStateAction<boolean>>
}

interface SortOption {
	title: string
	max: number
}

const SearchParam: FC<ComponentsProps> = ({
	underCategories,
	brands,
	setLoading,
}) => {
	const formRef = useRef<HTMLFormElement>(null)
	const { search } = useLocation()
	const navigate = useNavigate()

	//@ts-ignore
	const searchCategoryParam: string =	(search.length <= 0 || search.includes('?query=')) ? '' : firstLetterToUpercase(search.replace('?', ''))
	//@ts-ignore
	const searchParam: string = (search.length >= 0 || search.includes('?query=')) ? search.replace('?query=', '').replace(/%20/gi, ' ') : ''

	const [categoriesValue, setCategoriesValue] = useState<string>(searchCategoryParam || 'Smartphones')
	const [brandsValue, setBrandvalue] = useState<string>('All')

	const [sortRating, setSortRating] = useState<number>(0)
	const [sortStock, setSortStock] = useState<number>(0)
	const [sortPrice, setSortPrice] = useState<number>(0)

	const dispatch = useDispatch<AppDispatch>()

	const optionSort: SortOption[] = [
		{ title: 'Rating', max: 5 },
		{ title: 'Stock', max: 2000 },
		{ title: 'Price', max: 2000 },
	]
	const optionBrand: string[] = brands.slice(0, 5)
	
	const whatWillBeRendered = () => {
		if (searchCategoryParam) {
			dispatch(
				productSort({
					title: '',
					category: categoriesValue,
					brand: brandsValue,
					sort: {
						rating: sortRating,
						stock: sortStock,
						price: sortPrice,
					},
				})
			)
		} else if(searchParam) {
			dispatch(searchProduct(searchParam))
		} else {
			dispatch(getPageProduct(0))
		}
	}
	
	useEffect(() => {
		whatWillBeRendered()
	}, [searchParam, searchCategoryParam])

	const getSortedData = async (event: any) => {
		event.preventDefault()
		setLoading(true)

		const sortParams: SortParams = {
			title: searchParam,
			category: categoriesValue,
			brand: brandsValue,
			sort: {
				rating: sortRating,
				stock: sortStock,
				price: sortPrice,
			},
		}

		setTimeout(() => {
			dispatch(productSort(sortParams))
			setLoading(false)
		}, 700)
	}

	const resetFormParams = () => {
		setBrandvalue('All')
		setCategoriesValue('All')
		setSortPrice(0)
		setSortRating(0)
		setSortStock(0)
		navigate('/search')
	}

	return (
		<form ref={formRef} onSubmit={getSortedData} className={style.search_param_container}>
			<SortItemWithSub
				title='Categories'
				value={categoriesValue}
				optionArray={underCategories}
				setStateAction={setCategoriesValue}
			/>
			<SortItem
				title='Brands'
				value={brandsValue}
				options={optionBrand}
				setStateAction={setBrandvalue}
			/>
			<SortItemRange
				title='Sort'
				options={optionSort}
				setStateAction={[setSortRating, setSortStock, setSortPrice]}
				stateActionValue={[sortRating, sortStock, sortPrice]}
			/>
			<div className={style.search_buttons_container}>
				<SubmitButton text='Search' />
				<button
					type='button'
					onClick={resetFormParams}
					className={style.search_param_reset}
				>
					Reset
				</button>
			</div>
		</form>
	)
}

export default SearchParam
