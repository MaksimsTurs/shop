import style from '@/components/prodSlider/prodSlider.module.scss'

import { FC, useState, Fragment, LazyExoticComponent, lazy } from 'react'
import { Link } from 'react-router-dom'

import { ProductData } from '@/store/productStore/interfaces/products.interface'

import ProdSliderBottom from './parts/prodSliderBottom.component'
import SliderButton from '../../pages/ui/sliderButton/sliderButton.component'
import ProdSliderSlide from './parts/prodSliderSlide.component'

import useFetch from '@/customHook/useFetch.hook'

const SliderLoader: LazyExoticComponent<FC> = lazy(
	() => import('../sliderLoader/sliderLoader.component')
)

interface FetchProduct {
	products: ProductData[]
}

const ProdSlider: FC = () => {
	const { fetchError, isLoading, stateData } = useFetch<FetchProduct>(
		`https://dummyjson.com/products?limit=3`,
		[]
	)
	const [activeSlide, setActiveSlide] = useState<number>(0)

	const products: ProductData[] = stateData.products

	if (fetchError)
		return (
			<div id='error_container'>
				<p>{fetchError}</p>
			</div>
		)

	return (
		<Fragment>
			{isLoading ? (
				<SliderLoader />
			) : (
				<Fragment>
					<div className={style.slider_body}>
						<Fragment>
							<div>
								<h3 className={style.slider_title}>
									{products[activeSlide].title}
								</h3>
								<div className={style.slider_link_container}>
									<Link className={style.slider_link} to={'/cart/'}>
										Shop Now
									</Link>
									<Link
										className={style.slider_link_detail}
										to={`/product/${activeSlide + 1}`}
									>
										View more
									</Link>
								</div>
								<SliderButton
									activeSlide={activeSlide}
									slideTo={setActiveSlide}
									slides={3}
								/>
							</div>
							<ProdSliderSlide
								activeSlide={activeSlide}
								productData={products}
							/>
						</Fragment>
					</div>
					<ProdSliderBottom productData={products} activeSlide={activeSlide} />
				</Fragment>
			)}
		</Fragment>
	)
}

export default ProdSlider
