import React from "react";
import LoadingAnimation from "./LoadingAnimation";

const Loading = () => {
  return (
    <div className="flex grow items-center justify-center">
      <div className="flex items-center gap-2">
        Загрузка <LoadingAnimation />
      </div>
    </div>
  );
};

export default Loading;
