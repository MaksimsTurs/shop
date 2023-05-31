import { FC } from "react";

import HeaderTop from "./parts/headerPartsTop.component";
import HeaderMidlle from "./parts/headerPartsMidlle.component";
import HeaderBottom from "./parts/headerPartsBottom.component";

const Header: FC = () => {
  return (
    <header>
      <HeaderTop />
      <HeaderMidlle />
      <HeaderBottom />
    </header>
  );
};

export default Header;
