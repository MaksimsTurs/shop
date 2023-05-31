import style from '../productsContainer.module.scss'

import { FC } from 'react'
import { Link } from 'react-router-dom'

const ProductAction: FC = () => {
  return(
    <div className={style.products_wrapper_container}>
      <div className={style.products_wrapper_info}>
        <Link className={style.products_wrapper_link} to={''}>New Laptop</Link>
        <h5 className={style.products_wrapper_title}>Sale up to 50% off</h5>
        <p className={style.products_wrapper_text}>12 inch hd display</p>
        <Link className={style.products_wrapper_link} to={''}>Shop now</Link>
      </div>
    </div>
  )
}

export default ProductAction