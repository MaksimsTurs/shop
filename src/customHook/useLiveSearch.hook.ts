import { ProductInitialState } from '@/store/productStore/interfaces/products.interface'
import { RootState } from '@/store/store'
import { useState } from 'react'

import { useSelector } from 'react-redux'

const useLiveSearch = (searchString: string) => {
	const [searchedData, setSearchedData] = useState<string[]>([])



  return { searchedData }
}

export default useLiveSearch
