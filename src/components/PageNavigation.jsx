import React from "react";
import Button from "../ui/Button";
import singleArrowImg from "../assets/single_arrow.svg";
import doubleArrowImg from "../assets/double_arrow.svg";

const PageNavigation = ({ totalPages, onPageClick, currentPage }) => {
  const handleClick = (pageNumber) => {
    if (pageNumber === currentPage) return;
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageClick(pageNumber);
    }
  };

  function getCenteredArray(maxNum, num) {
    let start = Math.max(1, num - 2);
    let end = Math.min(maxNum, num + 2);

    if (end - start < 4) {
      if (start === 1) {
        end = Math.min(5, maxNum);
      } else if (end === maxNum) {
        start = Math.max(1, maxNum - 4);
      }
    }

    const result = [];
    for (let i = start; i <= end; i++) {
      result.push(i);
    }

    return result;
  }

  const renderPageButtons = () => {
    const buttons = [];
    const arr = getCenteredArray(totalPages, currentPage);

    for (let i = 0; i < arr.length; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => handleClick(arr[i])}
          className={`rounded-none border-2 border-blue-400 hover:border-blue-500 hover:text-white ${arr[i] === currentPage ? "" : "bg-transparent text-black"}`}
        >
          {arr[i]}
        </Button>,
      );
    }
    return buttons;
  };

  return (
    <div className="mt-auto flex justify-center gap-1">
      <Button
        onClick={() => handleClick(1)}
        className={`rotate-180 rounded-none ${currentPage - 3 < 0 && ""}`}
      >
        <img src={doubleArrowImg} />
      </Button>
      <Button
        onClick={() => handleClick(currentPage - 1)}
        className={`${currentPage <= 1 && ""} rounded-none`}
      >
        <img src={singleArrowImg} className="rotate-180" />
      </Button>
      <div className="mx-1 flex">{renderPageButtons()}</div>
      <Button
        onClick={() => handleClick(currentPage + 1)}
        className={`${currentPage == totalPages && ""} rounded-none`}
      >
        <img src={singleArrowImg} />
      </Button>
      <Button
        onClick={() => handleClick(totalPages)}
        className={`rounded-none ${
          currentPage + 2 === totalPages || (currentPage + 2 > totalPages && "")
        }`}
      >
        <img src={doubleArrowImg} />
      </Button>
    </div>
  );
};

export default PageNavigation;
