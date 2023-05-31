import style from "../productsContainer.module.scss";

import { FC } from "react";
import { Link } from "react-router-dom";

import { ProductData } from "@/store/productStore/interfaces/products.interface";

import getTopCategories from "@/functions/getTopCategories";

interface ComponeProps {
  products: ProductData[];
}

const ProductHeader: FC<ComponeProps> = ({ products }) => {
  const { popularCategories } = getTopCategories(products)

  return (
    <div className={style.products_container_hedaer}>
      <h4 className={style.products_container_header_title}>
        Popular products
      </h4>
      <ul className={style.products_popular_container}>
        {popularCategories.map((element, index) => {
          return (
            <li key={index}>
              <Link
                className={style.products_popular_title}
                to={`/search?${element.toLowerCase()}`}
              >
                {element}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductHeader;
