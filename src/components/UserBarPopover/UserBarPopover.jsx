import css from "./UserBarPopover.module.css";

const UserBarPopover = ({
  popoverRef,
  styles,
  attributes,
  isOpen,
  onSettingsClick,
  onLogOutClick,
  closePopover,
}) => {
  return (
    <div
      ref={popoverRef}
      style={{
        ...styles.popper,
        display: isOpen ? "flex" : "none",
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
        <svg width="16" height="16">
          <use href="/icons/sprite.svg#settings"></use>
        </svg>
        Settings
      </button>
      <button
        onClick={() => {
          onLogOutClick();
          closePopover();
        }}
        className={css.popoverbutton}
      >
        <svg width="16" height="16">
          <use href="/icons/sprite.svg#log-out"></use>
        </svg>
        Log out
      </button>
    </div>
  );
};

export default UserBarPopover;