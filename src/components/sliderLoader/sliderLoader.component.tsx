import style from './sliderLoader.module.scss'

import ImageLoader from '../loaders/ui/imageLoader.component'
import TextLoader from '../loaders/ui/textLoader.component'

import { FC } from 'react'

const SliderLoader: FC = () => {
	return (
		<div>
			<div className={style.slider_loader_top}>
				<TextLoader />
				<ImageLoader />
			</div>
			<div className={style.slider_loader_bottom}>
				<TextLoader />
				<TextLoader />
				<TextLoader />
			</div>
		</div>
	)
}

export default SliderLoader
