import '@/index.scss'

import {
	StrictMode,
	lazy,
	Suspense,
	useEffect,
	FC,
	LazyExoticComponent,
} from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch, Provider, useSelector } from 'react-redux'

import store, { AppDispatch, RootState } from './store/store.ts'

import Header from './pages/ui/header/header.component.tsx'
import Footer from './pages/ui/footer/footer.component.tsx'

import getAllProducstandCategories from './store/productStore/actions/product.getAll.action.ts'

import { ProductInitialState } from './store/productStore/interfaces/products.interface.ts'

const Home: LazyExoticComponent<FC> = lazy(() => import('./pages/home.tsx'))
const SearchPage: LazyExoticComponent<FC> = lazy(() => import('./pages/search.tsx'))
const ProductDetailed: LazyExoticComponent<FC> = lazy(() => import('./pages/productDetail.tsx'))
const Cart: LazyExoticComponent<FC> = lazy(() => import('./pages/cart.tsx'))

const App: FC = () => {
	const dispatch = useDispatch<AppDispatch>()

	const { error } = useSelector<RootState, ProductInitialState>(
		state => state.products
	)

	useEffect(() => {
		dispatch(getAllProducstandCategories())
	}, [])

	return (
		<StrictMode>
			<BrowserRouter>
				<Header />
				{error ? (
						<div id='error_container'><p>{String(error)}</p></div>
				) : (
					<main>
						<Routes>
							<Route
								path='/'
								element={
									<Suspense>
										<Home />
									</Suspense>
								}
							/>
							<Route
								path='/search'
								element={
									<Suspense>
										<SearchPage />
									</Suspense>
								}
							/>
							<Route
								path='/product'
								element={
									<Suspense>
										<ProductDetailed />
									</Suspense>
								}
							/>
							<Route
								path='/cart'
								element={
									<Suspense>
										<Cart />
									</Suspense>
								}
							/>
						</Routes>
					</main>
				)}
				<Footer />
			</BrowserRouter>
		</StrictMode>
	)
}

createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider store={store}>
		<App />
	</Provider>
)
