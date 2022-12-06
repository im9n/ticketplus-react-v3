import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import "./Pagination.css";

const Pagination = ({ pageNumber, setPageNumber, totalPages }) => {
  return (
    <div className="pagination">
      <div className="row pagination__row">
        <button
          className={`pagination__button pointer ${
            pageNumber === 1 && "disabled"
          }`}
          onClick={
            pageNumber > 1
              ? () => {
                  setPageNumber(1);
                  window.scrollTo(0, 0);
                }
              : undefined
          }
        >
          <KeyboardDoubleArrowLeftIcon />
        </button>
        <ArrowBackIcon
          className={`pagination__prev pointer ${
            pageNumber === 1 && "disabled"
          }`}
          onClick={
            pageNumber > 1
              ? () => {
                  setPageNumber(pageNumber - 1);
                  window.scrollTo(0, 0);
                }
              : undefined
          }
        />
        <div className="pagination__pages">
          {pageNumber + 1 > totalPages && pageNumber - 4 > 0 && (
            <p
              className="pagination__page pointer pagination__page--hide"
              onClick={() => {
                setPageNumber(pageNumber - 4);
                window.scrollTo(0, 0);
              }}
            >
              {pageNumber - 4}
            </p>
          )}
          {pageNumber + 2 > totalPages && pageNumber - 3 > 0 &&  (
            <p
              className="pagination__page pointer pagination__page--hide"
              onClick={() => {
                setPageNumber(pageNumber - 3);
                window.scrollTo(0, 0);
              }}
            >
              {pageNumber - 3}
            </p>
          )}
          {pageNumber - 2 > 0 && (
            <p
              className="pagination__page pointer pagination__page--hide"
              onClick={() => {
                setPageNumber(pageNumber - 2);
                window.scrollTo(0, 0);
              }}
            >
              {pageNumber - 2}
            </p>
          )}
          {pageNumber - 1 > 0 && (
            <p
              className="pagination__page pointer pagination__page--hide"
              onClick={() => {
                setPageNumber(pageNumber - 1);
                window.scrollTo(0, 0);
              }}
            >
              {pageNumber - 1}
            </p>
          )}
          <p className="pagination__page pointer selected">{pageNumber}</p>
          {pageNumber + 1 <= totalPages && (
            <p
              className="pagination__page pointer pagination__page--hide"
              onClick={() => {
                setPageNumber(pageNumber + 1);
                window.scrollTo(0, 0);
              }}
            >
              {pageNumber + 1}
            </p>
          )}
          {pageNumber + 2 <= totalPages && (
            <p
              className="pagination__page pointer pagination__page--hide"
              onClick={() => {
                setPageNumber(pageNumber + 2);
                window.scrollTo(0, 0);
              }}
            >
              {pageNumber + 2}
            </p>
          )}
          {pageNumber - 2 <= 0 && pageNumber + 3 < totalPages && (
            <p
              className="pagination__page pointer pagination__page--hide"
              onClick={() => {
                setPageNumber(pageNumber + 3);
                window.scrollTo(0, 0);
              }}
            >
              {pageNumber + 3}
            </p>
          )}
          {pageNumber - 1 <= 0 && pageNumber + 4 < totalPages &&  (
            <p
              className="pagination__page pointer pagination__page--hide"
              onClick={() => {
                setPageNumber(pageNumber + 4);
                window.scrollTo(0, 0);
              }}
            >
              {pageNumber + 4}
            </p>
          )}
        </div>
        <ArrowForwardIcon
          className={`pagination__next pointer ${
            pageNumber === totalPages && "disabled"
          }`}
          onClick={
            pageNumber < totalPages
              ? () => {
                  setPageNumber(pageNumber + 1);
                  window.scrollTo(0, 0);
                }
              : undefined
          }
        />
        <button
          className={`pagination__button pointer  ${
            pageNumber === totalPages && "disabled"
          }`}
          onClick={pageNumber !== totalPages ? () => {
            setPageNumber(totalPages);
            window.scrollTo(0, 0);
          } : undefined}
        >
          <KeyboardDoubleArrowRightIcon />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
