import style from "@/pages/ui/header/header.module.scss";

import { FC } from "react";

import logo from "@/pages/ui/header/img/logo.png?format=webp&prest=thumbnail";
import userIcon from "@/pages/ui/header/img/user.png?format=webp&prest=thumbnail";
import favoriteIcon from "@/pages/ui/header/img/favorite.png?format=webp&prest=thumbnail";
import userCartIcon from "@/pages/ui/header/img/user-cart.png?format=webp&prest=thumbnail";

const HeaderMidlle: FC = () => {
  return (
    <div className={`${style.header_container} ${style.header_background}`}>
      <div className={style.header_flex_container}>
        <img src={logo} alt="Logo" />
        <form className={style.header_form_body}>
          <input
            placeholder="Search any things..."
            className={style.header_form_input}
            type="text"
          />
          <button type="submit" className={style.header_form_button}>
            Search
          </button>
        </form>
      </div>
      <div className={style.header_flex_container}>
        <button
          className={`${style.header_flex_container} ${style.header_container_margin} ${style.header_user_button}`}
        >
          <img
            className={style.header_user_icon}
            src={userIcon}
            alt="User icon"
          />
          <p className={style.header_user_text}>Sign in</p>
        </button>
        <button
          className={`${style.header_flex_container} ${style.header_container_margin} ${style.header_user_button}`}
        >
          <div
            className={`${style.header_flex_container} ${style.header_container_margin}`}
          >
            <img
              className={style.header_user_icon}
              src={favoriteIcon}
              alt="Like icon"
            />
            <p className={style.header_count}>0</p>
          </div>
          <p className={style.header_user_text}>Favorite</p>
        </button>
        <button
          className={`${style.header_flex_container} ${style.header_container_margin} ${style.header_user_button}`}
        >
          <div
            className={`${style.header_flex_container} ${style.header_container_margin}`}
          >
            <img
              className={style.header_user_icon}
              src={userCartIcon}
              alt="Like icon"
            />
            <p className={style.header_count}>0</p>
          </div>
          <p className={style.header_user_text}>Cart</p>
        </button>
      </div>
    </div>
  );
};

export default HeaderMidlle;
