import style from "@/components/prodSlider/prodSlider.module.scss";

import { FC, useState, Fragment } from "react";
import { Link } from "react-router-dom";

import { ProductData } from "@/store/productStore/interfaces/products.interface";

import ProdSliderBottom from "./parts/prodSliderBottom.component";
import TextLoader from "../loaders/ui/textLoader.component";
import ImageLoader from "../loaders/ui/imageLoader.component";
import SliderButton from "../../pages/ui/sliderButton/sliderButton.component";
import ProdSliderSlide from "./parts/prodSliderSlide.component";

import useFetch from "@/customHook/useFetch.hook";

const ProdSlider: FC = () => {
  const { errorCode, isLoading, stateData } = useFetch(
    `https://dummyjson.com/products?limit=3`
  );
  const [activeSlide, setActiveSlide] = useState<number>(1);

  //I know that this code looks does good! :)
  if (errorCode)
    return (
      <div
        style={{
          margin: "2rem 0rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#500",
          fontSize: "3rem",
          fontWeight: "bold",
        }}
      >
        Error status code: {errorCode}
      </div>
    );

  return (
    <Fragment>
      <div className={style.slider_body}>
        <div>
          {isLoading ? (
            <TextLoader />
          ) : (
            <Fragment>
              <h3 className={style.slider_title}>
                {stateData.products[activeSlide - 1].title}
              </h3>
              <div className={style.slider_link_container}>
                <Link className={style.slider_link} to={"/cart/"}>
                  Shop Now
                </Link>
                <Link
                  className={style.slider_link_detail}
                  to={`/product/${activeSlide}`}
                >
                  View more
                </Link>
              </div>
              <div className={style.slider_index_container}>
                {stateData.products.map((data: ProductData, index: number) => (
                  <SliderButton
                    key={data.id}
                    active={activeSlide}
                    index={index}
                    slideTo={setActiveSlide}
                  />
                ))}
              </div>
            </Fragment>
          )}
        </div>
        <div className={style.slider_icons_container}>
          {isLoading ? (
            <ImageLoader />
          ) : (
            stateData.products.map((data: ProductData, index: number) => (
              <ProdSliderSlide
                key={data.id}
                index={index}
                product={data}
                slide={activeSlide}
              />
            ))
          )}
        </div>
      </div>
      <div className={style.slider_bottom_container}>
        {isLoading ? (
          <Fragment>
            <TextLoader />
            <TextLoader />
            <TextLoader />
          </Fragment>
        ) : (
          stateData.products.map((data: ProductData, index: number) => (
            <ProdSliderBottom
              key={data.id}
              product={data}
              slide={activeSlide}
              index={index}
            />
          ))
        )}
      </div>
    </Fragment>
  );
};

export default ProdSlider;
