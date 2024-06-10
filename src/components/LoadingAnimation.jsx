import React from "react";
import loadingImg from "../assets/loading.svg";
import { twMerge } from "tailwind-merge";

const LoadingAnimation = (props) => {
  return (
    <img
      src={loadingImg}
      className={twMerge("animate-spin", props.className)}
    />
  );
};

export default LoadingAnimation;
