import React from "react";
import styles from "./styles.module.scss";

export const LoadingBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Идет загрузка...
      </h1>
    </div>
  );
};
