import style from "./sliderButtton.module.scss";

import { Dispatch, FC, SetStateAction } from "react";

interface ComponentProps {
  index: number;
  active: number;
  slideTo: Dispatch<SetStateAction<number>>;
}

const SliderButton: FC<ComponentProps> = ({ index, active, slideTo }) => {
  const clickHandeler = () => slideTo(index + 1);

  return (
    <div
      className={
        index + 1 == active
          ? `${style.slider_index} ${style.slider_index_active}`
          : style.slider_index
      }
      onClick={clickHandeler}
    ></div>
  );
};

export default SliderButton;
