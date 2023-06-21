import { createAsyncThunk } from '@reduxjs/toolkit'

import { ProductGetAll } from '../interfaces/products.interface'

const getAllProducstandCategories = createAsyncThunk<ProductGetAll, undefined>(
	'products/getall',
	async (_, thunkApi) => {
		const allProductURL: string = 'https://dummyjson.com/products?limit=100'
		const allCategoriesURL: string = 'https://dummyjson.com/products/categories'

		try {
			const responseProductData = await fetch(allProductURL)
			const responseCategoriesData = await fetch(allCategoriesURL)

			const { products, total } = await responseProductData.json()
			const categories: string[] = await responseCategoriesData.json()

			return { products, total, categories }
		} catch (error) {
			return thunkApi.rejectWithValue({error, allCategoriesURL, allProductURL})
		}
	}
)

export default getAllProducstandCategories
