import style from "@/components/prodSlider/prodSlider.module.scss";

import { FC, useMemo } from "react";
import { Link } from "react-router-dom";

import { ProductData } from "@/store/productStore/interfaces/products.interface";

interface ComponentProps {
  product: ProductData;
  slide: number;
  index: number;
}

const ProdSliderBottom: FC<ComponentProps> = ({ index, product, slide }) => {
  return (
    <Link
      className={
        index + 1 == slide
          ? `${style.slider_bottom_body} ${style.slider_bottom_active}`
          : style.slider_bottom_body
      }
      to={`/product/${product.id}`}
    >
      <img
        className={style.slider_bottom_icon}
        src={product.thumbnail}
        alt={product.title}
      />
      <div className={style.slider_bottom_data}>
        <h4>{product.title}</h4>
        <p>
          {useMemo(() => `${Math.floor(Math.random() * 20 + 1)} items`, [])}
        </p>{" "}
      </div>
    </Link>
  );
};

export default ProdSliderBottom;
