import React from "react";

const Th = (props) => {
  return (
    <th className="border border-b-2 border-neutral-500 px-[0.8em] py-[0.4em]">
      {props.children}
    </th>
  );
};

export default Th;
