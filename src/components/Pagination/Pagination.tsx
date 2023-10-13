import React, { memo } from "react";
import ReactPaginate from "react-paginate";

import styles from "./styles.module.scss";
import { useWhyDidYouUpdate } from "ahooks";

type PropsType = {
  currentPage: number;
  onChangePage: (value: number) => void;
};

export const Pagination: React.FC<PropsType> = memo((props) => {
  useWhyDidYouUpdate("Pagination", props);
  console.log("pag");
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel='...'
      nextLabel='>'
      onPageChange={(event) => props.onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={5}
      forcePage={props.currentPage - 1}
      previousLabel='<'
      renderOnZeroPageCount={null}
    />
  );
});
