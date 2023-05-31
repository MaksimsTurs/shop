import style from "@/pages/ui/header/header.module.scss";

import { FC } from "react";

import locationIcon from "@/pages/ui/header/img/location.png?format=webp&prest=thumbnail";
import cartIcon from "@/pages/ui/header/img/cart.png?format=webp&prest=thumbnail";

const HeaderTop: FC = () => {
  return (
    <div className={style.header_container}>
      <a href="tel:(+98) 0234 456 789">
        Need help? Call us: (+98) 0234 456 789
      </a>
      <div className={style.header_top_container}>
        <div className={style.header_top_button}>
          <img
            className={style.header_top_icon}
            src={locationIcon}
            alt="Location icon"
          />
          <p>Our store</p>
        </div>
        <div className={style.header_top_button}>
          <img
            className={style.header_top_icon}
            src={cartIcon}
            alt="Cart icon"
          />
          <p>Track your order</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
