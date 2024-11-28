import { useState, useRef } from "react";
import { usePopper } from "react-popper";
import UserBarPopover from "../UserBarPopover/UserBarPopover.jsx"
import css from './UserBar.module.css';

const UserBar = ({ userName, avatarUrl, onSettingsClick, onLogOutClick }) => {
  const defaultUserName = userName || "Nadia"; 
  const avatarPlaceholder = defaultUserName.charAt(0).toUpperCase();
  
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const buttonRef = useRef(null);
  const popoverRef = useRef(null);

  const { styles, attributes } = usePopper(buttonRef.current, popoverRef.current, {
  placement: 'bottom', 
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 8], 
      },
    },
    {
      name: "preventOverflow",
      options: { boundary: "window" },
    },
    {
      name: "sameWidth", 
      enabled: true,
      phase: "beforeWrite",
      requires: ["computeStyles"],
      fn: ({ state }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`; 
      },
    },
  ],
});

  const togglePopover = () => {
  console.log("Popover toggled");
  setIsPopoverOpen((prev) => !prev);
};
  const closePopover = () => setIsPopoverOpen(false);

  return (
    <div className={css.container}>
      <button
        ref={buttonRef}
        onClick={togglePopover}
        className={css.userbar}
      >
        <span >{defaultUserName}</span>
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "#ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            {avatarPlaceholder}
          </div>
        )}

      </button>

      {isPopoverOpen && (
        <UserBarPopover
          ref={popoverRef}
          styles={styles}
          attributes={attributes}
          onSettingsClick={onSettingsClick}
          onLogOutClick={onLogOutClick}
          closePopover={closePopover}
        />
      )}
      {isPopoverOpen && <div className={css.backdrop}  onClick={closePopover} />}
    </div>
  );
};

export default UserBar;
