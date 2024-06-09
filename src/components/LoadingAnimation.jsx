import React from "react";
import loadingImg from "../assets/loading.svg";

const LoadingAnimation = () => {
  return <img src={loadingImg} className="animate-spin" />;
};

export default LoadingAnimation;
