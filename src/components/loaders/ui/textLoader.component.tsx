import style from "../loader.module.scss";

import { FC } from "react";

const TextLoader: FC = () => {
  return (
    <div className={style.text_loader_container}>
      <div className={style.text_loader_title}></div>
      <div className={style.text_loader_text}></div>
      <div className={style.text_loader_button_container}>
        <div className={style.text_loader_button}></div>
        <div className={style.text_loader_button}></div>
      </div>
    </div>
  );
};

export default TextLoader;
