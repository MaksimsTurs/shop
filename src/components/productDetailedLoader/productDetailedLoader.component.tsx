import ImageLoader from '../loaders/ui/imageLoader.component'
import TextLoader from '../loaders/ui/textLoader.component'
import style from './productDetailedLoader.module.scss'

import { FC } from 'react'

const ProductDetailedLoader: FC = () => {
	return (
    <div className={style.prodloader_container}>
        <div>
          <ImageLoader/>
          <div className={style.prodloader_slides_container}>
            <div className={style.prodloader_image}></div>
            <div className={style.prodloader_image}></div>
            <div className={style.prodloader_image}></div>
          </div>
        </div>
        <div>
          <TextLoader/>
          <br />
          <TextLoader/>
        </div>
    </div>
	)
}

export default ProductDetailedLoader
