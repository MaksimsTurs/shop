export interface ProductData {
	brand: string
	category: string
	stock: number
	description: string
	id: number
	images: string[]
	price: number
	rating: number
	thumbnail: string
	title: string
	count: number
}

export interface SortParams {
	title: string
	category: string
	sort: {
		price: number
		stock: number
		rating: number
	}
	brand: string
}

export interface ProductGetAll {
	products: ProductData[]
	total: number
	categories: string[]
}

export interface ProductPagination {
	products: ProductData[]
}

export interface ProductPaginationConf {
	categories?: string[]
	brand?: string
}

export interface UnderCategories {
	title: string
	items: string[]
}

export interface ProductInitialState {
	allProducts: ProductData[]
	bestProduct: ProductData
	pagesCount: number
	cart: ProductData[]
	currentPage: number
	currentPageProducts: ProductData[]
	underCategories: UnderCategories[]
  brands: string[]
	categories: string[]
	error: unknown
	isLoading: boolean
}
