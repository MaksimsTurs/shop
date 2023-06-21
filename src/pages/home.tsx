import { FC, Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import ProdSlider from "@/components/prodSlider/prodSlider.component";
import ProductsContainer from "@/components/productsContainer/productsContainer.component";

import { AppDispatch } from "@/store/store";

import { getPageProduct } from "@/store/productStore/productSlice";

const Home: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  
  useEffect(() => {
    dispatch(getPageProduct(0))    
  }, [])
  
  return (
    <Fragment>
      <ProdSlider />
      <ProductsContainer />
    </Fragment>
  );
};

export default Home;
