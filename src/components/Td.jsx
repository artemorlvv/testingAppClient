import React from "react";

const Td = (props) => {
  return (
    <td className="border border-neutral-500 px-[0.8em] py-[0.4em] text-center">
      {props.children}
    </td>
  );
};

export default Td;
