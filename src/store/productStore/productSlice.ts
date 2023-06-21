import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import {
	ProductData,
	ProductInitialState,
	SortParams,
	UnderCategories,
} from './interfaces/products.interface'

import getAllProducstandCategories from './actions/product.getAll.action'

import firstLetterToUpercase from '@/functions/firstLetterToUpercase'

const initialState: ProductInitialState = {
	//@ts-ignore
	allProducts: JSON.parse(localStorage.getItem('allProducts')) || [],
	//@ts-ignore
	cart: JSON.parse(localStorage.getItem('cart')) || [],
	categories: [],
	brands: ['All'],
	underCategories: [],
	currentPageProducts: [],
	bestProduct: {},
	pagesCount: 0,
	currentPage: 0,
	error: '',
	isLoading: true,
}

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		deleteItemFromCart: (state, { payload }: PayloadAction<number>) => {
			const newArray: ProductData[] = state.cart.filter(element => element.id !== payload)
		
			state.cart = newArray

			localStorage.setItem('cart', JSON.stringify(state.cart))
		},
		clearCart: (state, _action) => {
			state.cart = []
			localStorage.setItem('cart', JSON.stringify([]))
		},
		incrementProductIntoCart: (state, { payload }: PayloadAction<number>) => {
			state.cart[payload].count++
			localStorage.setItem('cart', JSON.stringify(state.cart))
		},
		decrementProductIntoCart: (state, { payload }: PayloadAction<number>) => {
			state.cart[payload].count--
			localStorage.setItem('cart', JSON.stringify(state.cart))
		},
		addProductToCart: (
			state,
			{ payload }: PayloadAction<{ product: ProductData; count: number }>
		) => {
			if (state.cart.length === 0) {
				state.cart = [{ ...payload.product, count: payload.count }]
			} else {
				const elementIndex: number = state.cart.findIndex(
					element => element.id === payload.product.id
				)

				const element: ProductData | undefined = state.cart.find((_, index) => index === elementIndex)

				if (!element) {
					state.cart = [...state.cart, {...payload.product, count: payload.count}]
				} else {
					state.cart[elementIndex].count = state.cart[elementIndex].count + payload.count
				}
			}
			localStorage.setItem('cart', JSON.stringify(state.cart))
		},
		getSingleProduct: (state, { payload }: PayloadAction<number>) => {
			for (let key = 0; key < state.allProducts.length; key++) {
				if (state.allProducts[key].id === payload) {
					state.currentPageProducts = [state.allProducts[key]]
				}
			}
		},
		searchProduct: (state, { payload }: PayloadAction<string>) => {
			const searchString: string = payload
			const allProducts: ProductData[] = state.allProducts

			const searchedProducts: ProductData[] = allProducts.filter(element =>
				element.title.toLowerCase().includes(searchString.toLowerCase())
			)

			state.currentPageProducts = searchedProducts.slice(0, 15)
			state.pagesCount = Math.floor(searchedProducts.length / 15)

			state.currentPageProducts = searchedProducts
		},
		getPageProduct: (state, { payload }: PayloadAction<number>) => {
			state.currentPage = payload
			const end: number = payload + 15

			state.currentPageProducts = state.allProducts.slice(payload, end)
			state.pagesCount = Math.floor(state.allProducts.length / 15)

			window.scrollTo({ top: 50 })
		},
		productPagination: (state, { payload }: PayloadAction<number>) => {
			const start: number = payload * 15
			const end: number = start + 15

			state.currentPageProducts = state.allProducts.slice(start, end)
			state.currentPage = payload
		},
		productSort: (state, { payload }: PayloadAction<SortParams>) => {
			console.log(payload)
			const sortedProducts: ProductData[] = state.allProducts.filter(
				element => {
					if (
						payload.brand.includes('All') &&
						element.category.toLowerCase() === payload.category.toLowerCase()
					) {
						if (
							element.price >= payload.sort.price &&
							element.rating >= payload.sort.rating &&
							element.stock >= payload.sort.stock
						) {
							return element
						}
					} else if (
						payload.category.includes('All') &&
						element.brand.toLowerCase() === payload.brand.toLowerCase()
					) {
						if (
							element.price >= payload.sort.price &&
							element.rating >= payload.sort.rating &&
							element.stock >= payload.sort.stock
						) {
							return element
						}
					} else if (
						payload.brand.includes('All') &&
						payload.category.includes('All') &&
						element.price >= payload.sort.price &&
						element.rating >= payload.sort.rating &&
						element.stock >= payload.sort.stock
					) {
						return element
					} else if (
						payload.brand.toLowerCase() === element.brand.toLowerCase() &&
						payload.category.toLowerCase() === element.category.toLowerCase() &&
						element.price >= payload.sort.price &&
						element.rating >= payload.sort.rating &&
						element.stock >= payload.sort.stock
					) {
						return element
					}
				}
			)

			if (sortedProducts.length > 15) {
				state.currentPage = 0

				const start: number = state.currentPage * 15
				const end: number = start + 15

				state.currentPageProducts = sortedProducts.slice(start, end)
			} else {
				state.currentPageProducts = sortedProducts
			}

			const newPageCount: number = Math.floor(sortedProducts.length / 15)
			state.pagesCount = newPageCount

			window.scrollTo({ top: 50 })
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getAllProducstandCategories.fulfilled, (state, action) => {
				//Variabels declaration
				const allFetchedProducts: ProductData[] = action.payload.products
				const categories: string[] = action.payload.categories

				let clothing: UnderCategories = { title: 'Clothing', items: [] }
				let tech: UnderCategories = { title: 'Tech', items: [] }
				let furniture: UnderCategories = { title: 'Furniture', items: [] }
				let other: UnderCategories = { title: 'Other', items: [] }

				//Find best product
				const bestProduct: ProductData = allFetchedProducts.toSorted(
					(first, second) => second.rating - first.rating
				)[0]

				//Get all Brands
				const brands: string[] = allFetchedProducts.map(
					element => element.brand
				)

				//Remove Duplicate from Array
				const removedDuplicatedBrands: string[] = brands.filter(
					(element, index) => brands.indexOf(element) === index
				)

				//@ts-ignore
				const editetCategoriesString: string[] =
					firstLetterToUpercase(categories)

				//Sort Categories to undercategories
				editetCategoriesString.map(element => {
					if (element.includes('Womens-') || element.includes('Mens-')) {
						clothing.items = [...clothing.items, element]
					} else if (
						element.includes('Laptops') ||
						element.includes('Smartphones')
					) {
						tech.items = [...tech.items, element]
					} else if (
						element.includes('Home') ||
						element.includes('Furniture')
					) {
						furniture.items = [...furniture.items, element]
					} else {
						other.items = [...other.items, element]
					}
				})

				state.underCategories = [
					...state.underCategories,
					clothing,
					tech,
					furniture,
					other,
				]

				state.allProducts = allFetchedProducts

				localStorage.setItem('allProducts', JSON.stringify(allFetchedProducts))

				state.categories = editetCategoriesString
				state.bestProduct = bestProduct
				state.brands = [...state.brands, ...removedDuplicatedBrands]

				state.isLoading = false
			})
			.addCase(getAllProducstandCategories.rejected, (state, action) => {
				//@ts-ignore
				const isTypeError: boolean = String(action.payload.error).includes('TypeError')
				
				//@ts-ignore
				const categoriesURL: string = action.payload.allCategoriesURL
				//@ts-ignore
				const productURL: string = action.payload.allCategoriesURL

				if(isTypeError) {
					state.error = `Cann not fetch data from ${productURL} or ${categoriesURL}`
				}

				state.isLoading = false
			})
	},
})

export default productsSlice.reducer

export const {
	productPagination,
	productSort,
	getPageProduct,
	searchProduct,
	getSingleProduct,
	addProductToCart,
	incrementProductIntoCart,
	decrementProductIntoCart,
	clearCart,
	deleteItemFromCart
} = productsSlice.actions
