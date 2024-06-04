import React, { useState } from "react";
import Button from "../ui/Button";
import profileImg from "../assets/profile.svg";

const UserButton = (props) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const logout = () => {
    if (props.onLogout) props.onLogout();
    setMenuVisible(false);
  };
  return (
    <div className="relative">
      <Button
        onClick={() => setMenuVisible(!menuVisible)}
        className={
          "flex gap-2 bg-neutral-200 text-neutral-800 hover:bg-neutral-300"
        }
      >
        <img src={profileImg} alt="profileImage" />
        {props.fullName}
      </Button>
      {menuVisible && (
        <div className="absolute right-0 top-full mt-1 rounded-xl bg-neutral-200 p-2">
          <Button
            className="bg-red-500 text-base hover:bg-red-600"
            onClick={logout}
          >
            Выйти
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserButton;
