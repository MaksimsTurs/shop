import { FC, Fragment } from "react";

import ProdSlider from "@/components/prodSlider/prodSlider.component";
import ProductsContainer from "@/components/productsContainer/productsContainer.component";

const Home: FC = () => {
  return (
    <Fragment>
      <ProdSlider />
      <ProductsContainer />
    </Fragment>
  );
};

export default Home;
