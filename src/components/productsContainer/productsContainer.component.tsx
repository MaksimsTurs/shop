import style from "./productsContainer.module.scss";

import { FC, Fragment, useEffect } from "react";

import ProductHeader from "./ui/productsHeader.component";
import ProductCard from "./ui/productsCard.component";
import TextLoader from "../loaders/ui/textLoader.component";
import ProductAction from "./ui/productAction.component";
import ProductDetailed from "./ui/productDetailed.component";
import Pagination from "@/pages/ui/pagination/pagination.component";

import { AppDispatch, RootState } from "@/store/store";
import { ProductInitialState } from "@/store/productStore/interfaces/products.interface";

import { useSelector, useDispatch } from "react-redux";
import gettAllProducts from "@/store/productStore/actions/product.getall.action";

const ProductsContainer: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(gettAllProducts());
  }, []);

  const { isLoading, products, pagesCount, currentPage, bestProduct } =
    useSelector<RootState, ProductInitialState>((state) => state.products);

  return (
    <Fragment>
      <ProductHeader products={products} />
      <Pagination pagesCount={pagesCount} currentPage={currentPage} />
      {isLoading ? (
        <div className={style.products_card_container}>
          <TextLoader />
          <TextLoader />
          <TextLoader />
          <TextLoader />
          <TextLoader />
          <TextLoader />
        </div>
      ) : (
        <div className={style.products_card_container}>
          {products.map((data) => (
            <ProductCard product={data} key={data.id} />
          ))}
        </div>
      )}
      <ProductAction />
      {isLoading ? <TextLoader /> : <ProductDetailed products={bestProduct} />}
      <Pagination pagesCount={pagesCount} currentPage={currentPage} />
    </Fragment>
  );
};

export default ProductsContainer;
