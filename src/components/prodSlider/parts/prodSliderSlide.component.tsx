import style from "../prodSlider.module.scss";

import { FC } from "react";

import { ProductData } from "@/store/productStore/interfaces/products.interface";

interface ComponentProps {
  product: ProductData;
  index: number;
  slide: number;
}

const ProdSliderSlide: FC<ComponentProps> = ({ index, product, slide }) => {
  return (
    <div
      key={product.id}
      className={
        index + 1 == slide
          ? style.slider_icon_content
          : `${style.slider_icon_content} ${style.slider_icon_hidden}`
      }
    >
      <img
        className={style.slider_product_icon}
        src={product.thumbnail}
        alt={product.title}
      />
      <div className={style.slider_product_price_container}>
        Only
        <p>{product.price}$</p>
      </div>
    </div>
  );
};

export default ProdSliderSlide;
