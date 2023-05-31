import style from "./pagination.module.scss";

import { FC } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@/store/store";

import pagination from "@/store/productStore/actions/product.pagination.action";

interface ComponentProps {
  pagesCount: number;
  currentPage: number;
}

const Pagination: FC<ComponentProps> = ({ pagesCount, currentPage }) => {
  const dispatch = useDispatch<AppDispatch>();

  const goToPage = (event: any) => {
    window.scrollTo({
      top: 300,
      behavior: "smooth",
    });
    dispatch(pagination(event.target.textContent));
  };

  return (
    <div className={style.pagination_container}>
      {[...Array(pagesCount)].map((_, index) => (
        <button
          disabled={currentPage == index + 1}
          key={index}
          className={
            currentPage == index + 1
              ? `${style.pagination_button} ${style.pagination_button_active}`
              : style.pagination_button
          }
          onClick={goToPage}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
