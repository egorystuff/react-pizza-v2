import React from "react";
import styles from "./styles.module.scss";

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Упссс... Что-то пошло не так...
      </h1>
      <p className={styles.description}>К сожалению данная страница не найдена в нашем интернет-магазине.</p>
    </div>
  );
};
