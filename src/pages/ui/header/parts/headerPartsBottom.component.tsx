import style from "@/pages/ui/header/header.module.scss";

import { FC } from "react";

import { Link } from "react-router-dom";

const HeaderBottom: FC = () => {
  return (
    <div className={style.header_container_bottom}>
      <div className={style.header_container_position}>
        <div
          className={style.header_menu_button}
        >
          Browse Categories
          <span className={style.header_icon_open}>
            &#8250;
          </span>
          <ul
          className={style.header_list_items}
        >
          <li>
            <Link className={style.header_list_item} to={"/cart"}>
              Cart
            </Link>
          </li>
          <li>
            <Link className={style.header_list_item} to={"/search"}>
              Search
            </Link>
          </li>
        </ul>
        </div>
      </div>
      <nav>
        <ul className={style.header_nav_list_items}>
          <li>
            <button className={style.header_nav_list_item}>Home</button>
          </li>
          <li>
            <button className={style.header_nav_list_item}>Catalog</button>
          </li>
          <li>
            <button className={style.header_nav_list_item}>Blog</button>
          </li>
          <li>
            <Link className={style.header_nav_list_item} to={"/about-us/"}>
              About us
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HeaderBottom;
