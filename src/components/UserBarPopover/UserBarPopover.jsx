import { forwardRef } from "react"
import css from "./UserBarPopover.module.css"


const UserBarPopover = forwardRef(
  ({ styles, attributes, onSettingsClick, onLogOutClick, closePopover }, ref) => {
    return (
      <div
        ref={ref}
        style={styles.popper}
        {...attributes.popper}
        className={css.userbarpopover}
      >
        <button
          className={css.popoverbutton}
          onClick={() => {
            onSettingsClick();
            closePopover();
          }}
        >
          Settings
        </button>
        <button
          className={css.popoverbutton}
          onClick={() => {
            onLogOutClick();
            closePopover();
          }}
        >
          Log out
        </button>
      </div>
    );
  }
);
UserBarPopover.displayName = "UserBarPopover"
export default UserBarPopover;
