import { useState, useRef } from "react";
import { usePopper } from "react-popper";
import { HiChevronDown, HiChevronUp } from "react-icons/hi"; 
import UserBarPopover from "../../components/UserBarPopover/UserBarPopover.jsx";
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
        options: { offset: [0, 8] },
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
        <span className={css.name}>{defaultUserName}</span>
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            className={css.avatar}
          />
        ) : (
          <div className={css.avatarPlaceholder}>
            {avatarPlaceholder}
          </div>
        )}
        
        {isPopoverOpen ? <HiChevronUp className={css.icon}/> : <HiChevronDown className={css.icon} />}
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
      {isPopoverOpen && <div className={css.backdrop} onClick={closePopover} />}
    </div>
  );
};

export default UserBar;
