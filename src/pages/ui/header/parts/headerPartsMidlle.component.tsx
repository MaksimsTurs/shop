import style from '@/pages/ui/header/header.module.scss'

import { FC, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import logo from '@/pages/ui/header/img/logo.png?format=webp&prest=thumbnail'
import userIcon from '@/pages/ui/header/img/user.png?format=webp&prest=thumbnail'
import favoriteIcon from '@/pages/ui/header/img/favorite.png?format=webp&prest=thumbnail'
import userCartIcon from '@/pages/ui/header/img/user-cart.png?format=webp&prest=thumbnail'

import { AppDispatch, RootState } from '@/store/store'
import { ProductInitialState } from '@/store/productStore/interfaces/products.interface'

import { searchProduct } from '@/store/productStore/productSlice'

import useModal from '@/customHook/useModal.hook'

const HeaderMidlle: FC = () => {
	const [searchValue, setSearchValue] = useState<string>('')
	const [searchedData, setSearchedData] = useState<string[]>([])
	const [isOpen, setOpen] = useState<boolean>(false)

	const navigate = useNavigate()

	const dispatch = useDispatch<AppDispatch>()

	const inputRef = useRef<HTMLInputElement>(null)

	const { allProducts, cart } = useSelector<RootState, ProductInitialState>(
		state => state.products
	)

	const sumOfProducts = cart.reduce((previousValue, currentValue) => previousValue + currentValue.count, 0)

	const handleSubmit = (event: any) => {
		event.preventDefault()

		dispatch(searchProduct(searchValue))
		setSearchValue('')
		navigate(`/search?query=${searchValue}`, {
			replace: true,
		})	
	}

	const searchHandler = (event: any) => {
		let list: string[] = []
		setSearchValue(event.target.value)

		for (let key = 0; key < allProducts.length; key++) {
			if (
				allProducts[key].title
					.toLowerCase()
					.includes(searchValue.toLowerCase().trim())
			) {
				list = [...list, allProducts[key].title]
			}
			setSearchedData(list)
		}

		if (searchValue.length === 1) {
			setSearchedData([])
		} else {
			setSearchedData(prev => { return [...prev]})
		}
	}

	const setInputValue = (event: any) => {
		setSearchValue(event.target.textContent)

		dispatch(searchProduct(event.target.textContent))
		navigate(`/search?query=${searchValue}`, {
			replace: true,
		})
	}

	useEffect(() => {
		const clickHandler = (event: any) => {
			const newState: boolean = useModal(inputRef, event, isOpen)
			setOpen(newState)
		}

		document.addEventListener('click', clickHandler)

		return () => {
			document.removeEventListener('click', clickHandler)
		}
	}, [])

	return (
		<div className={`${style.header_container} ${style.header_background}`}>
			<div className={style.header_flex_container}>
				<Link to='/'>
					<img src={logo} alt='Logo' />
				</Link>
				<form onSubmit={handleSubmit} className={style.header_form_body}>
					<input
						ref={inputRef}
						placeholder='Search any things...'
						onInput={searchHandler}
						className={style.header_form_input}
						type='text'
						value={searchValue}
					/>
					<button
						type='submit'
						disabled={!searchValue}
						className={style.header_form_button}
					>
						Search
					</button>
					<ul
						className={
							isOpen
								? style.header_form_search_result
								: style.header_result_hidden
						}
					>
						{searchedData.length === 0 ? (
							<p className={style.header_form_empty}>Write to search...</p>
						) : (
							searchedData.map(element => {
								return (
									<li key={element}>
										<Link
											onClick={setInputValue}
											className={style.header_form_search_option}
											to={`/search?query=${element}`}
										>
											{element}
										</Link>
									</li>
								)
							})
						)}
					</ul>
				</form>
			</div>
			<div className={style.header_flex_container}>
				<button
					className={`${style.header_flex_container} ${style.header_container_margin} ${style.header_user_button}`}
				>
					<img
						className={style.header_user_icon}
						src={userIcon}
						alt='User icon'
					/>
					<p className={style.header_user_text}>Sign in</p>
				</button>
				<button
					className={`${style.header_flex_container} ${style.header_container_margin} ${style.header_user_button}`}
				>
					<div
						className={`${style.header_flex_container} ${style.header_container_margin}`}
					>
						<img
							className={style.header_user_icon}
							src={favoriteIcon}
							alt='Like icon'
						/>
						<p className={style.header_count}>0</p>
					</div>
					<p className={style.header_user_text}>Favorite</p>
				</button>
				<Link to={'/cart'}
					className={`${style.header_flex_container} ${style.header_container_margin} ${style.header_user_button}`}
				>
					<div
						className={`${style.header_flex_container} ${style.header_container_margin}`}
					>
						<img
							className={style.header_user_icon}
							src={userCartIcon}
							alt='Like icon'
						/>
						<p className={style.header_count}>{sumOfProducts}</p>
					</div>
					<p className={style.header_user_text}>Cart</p>
				</Link>
			</div>
		</div>
	)
}

export default HeaderMidlle
