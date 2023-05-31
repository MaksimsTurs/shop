import style from "../productsContainer.module.scss";

import { FC, useState } from "react";

import { ProductData } from "@/interfaces/common.interfaces";
import StarRating from "@/pages/ui/starRating/starRating.component";
import AddToCurtButton from "@/pages/ui/addToCartButton/addToCartButton.component";
import SliderButton from "@/pages/ui/sliderButton/sliderButton.component";

interface ComponentProps {
  products: ProductData;
}

const ProductDetailed: FC<ComponentProps> = ({ products }) => {
  const [activeSlied, setActiveSlide] = useState<number>(1);

  return (
    <div className={style.products_detailed_container}>
      <div className={style.products_detailed_body}>
        <div className={style.products_detailed_content}>
          <div className={style.products_detailed_icon_container}>
            {products.images.map((src, index) => {
              return (
                <img
                  key={index}
                  className={
                    activeSlied == index + 1
                      ? style.products_detailed_icon
                      : `${style.products_detailed_icon} ${style.products_detailed_icon_hiidden}`
                  }
                  src={src}
                  alt={products.title}
                />
              );
            })}
          </div>
          <div className={style.products_detailed_info_container}>
            <h5 className={style.products_detailed_info_title}>
              {products.title}
            </h5>
            <p>{products.description}</p>
            <p>{products.price} $</p>
            {[...Array(5)].map((_, index) => (
              <StarRating
                index={index}
                rating={Math.floor(products.rating)}
                key={index}
              />
            ))}
            {<AddToCurtButton />}
          </div>
        </div>
        <div className={style.products_detailed_slider_button_container}>
          {products.images.map((src, index) => (
            <SliderButton
              key={src}
              active={activeSlied}
              slideTo={setActiveSlide}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailed;
