import { useState, useRef, useEffect } from "react";
import { usePopper } from "react-popper";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { AiOutlineSetting } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
// import UserBarPopover from "../../components/UserBarPopover/UserBarPopover.jsx";
import css from "./UserBar.module.css";

const UserBar = ({ userName, avatarUrl, onSettingsClick, onLogOutClick }) => {
  const defaultUserName = userName || "Nadia";
  const avatarPlaceholder = defaultUserName.charAt(0).toUpperCase();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const buttonRef = useRef(null);
  const popoverRef = useRef(null);

  const { styles, attributes, update } = usePopper(
    buttonRef.current,
    popoverRef.current,
    {
      placement: "bottom-end",
      modifiers: [
        {
          name: "offset",
          options: { offset: [0, 8] },
        },
        {
          name: "preventOverflow",
          options: { boundary: "viewport" },
        },
      ],
    }
  );

  const togglePopover = () => {
    setIsPopoverOpen((prev) => !prev);
    if (update) {
      setTimeout(() => update(), 0);
    }
  };

  const closePopover = () => setIsPopoverOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsPopoverOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (buttonRef.current && popoverRef.current) {
      const buttonWidth = buttonRef.current.offsetWidth;
      popoverRef.current.style.width = `${buttonWidth}px`;
    }
  }, [isPopoverOpen]);

  return (
    <div className={css.container}>
      <button ref={buttonRef} onClick={togglePopover} className={css.userbar}>
        <span className={css.name}>{defaultUserName}</span>
        {avatarUrl ? (
          <img src={avatarUrl} alt="Avatar" className={css.avatar} />
        ) : (
          <div className={css.avatarPlaceholder}>{avatarPlaceholder}</div>
        )}
        {isPopoverOpen ? (
          <HiChevronUp className={css.icon} />
        ) : (
          <HiChevronDown className={css.icon} />
        )}
      </button>

      <div
        ref={popoverRef}
        style={{
          ...styles.popper,
          display: isPopoverOpen ? "flex" : "none",
        }}
        {...attributes.popper}
        className={css.userbarpopover}
      >
        <button
          onClick={() => {
            onSettingsClick();
            closePopover();
          }}
          className={css.popoverbutton}
        >
          <AiOutlineSetting />
          Settings
        </button>
        <button
          onClick={() => {
            onLogOutClick();
            closePopover();
          }}
          className={css.popoverbutton}
        >
          <IoLogOutOutline />
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserBar;
