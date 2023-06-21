import style from "./pagination.module.scss";

import { Dispatch, FC, SetStateAction } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@/store/store";
import { productPagination } from "@/store/productStore/productSlice";

interface ComponentProps {
  pagesCount: number;
  currentPage: number;
  setLoading: Dispatch<SetStateAction<boolean>>
}

const Pagination: FC<ComponentProps> = ({ pagesCount, currentPage, setLoading }) => {
  const dispatch = useDispatch<AppDispatch>();

  const goToPage = (event: any) => {
   setLoading(true)
   
   setTimeout(() =>  {
    dispatch(productPagination(event.target.textContent))
    setLoading(false)
  }, 700)
}

  return (
    <div className={style.pagination_container}>
      {[...Array(pagesCount)].map((_, index) => (
        <button
          disabled={currentPage == index}
          key={index}
          className={
            currentPage == index
              ? `${style.pagination_button} ${style.pagination_button_active}`
              : style.pagination_button
          }
          onClick={goToPage}
        >
          {index}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
