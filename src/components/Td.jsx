import React from "react";

const Td = (props) => {
  return (
    <td className="w-[15%] border border-neutral-500 px-[0.8em] py-[0.4em] text-center">
      {props.children}
    </td>
  );
};

export default Td;
