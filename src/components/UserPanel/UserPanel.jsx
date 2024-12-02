import { useState } from "react";
import UserBar from "../../components/UserBar/UserBar.jsx";
import UserSettingsModal from "../../modals/UserSettingsModal/UserSettingsModal.jsx";
import LogOutModal from "../../modals/LogOutModal/LogOutModal.jsx";
import css from "./UserPanel.module.css";

const UserPanel = ({ userName, avatarUrl }) => {
  const defaultUserName = userName || "Nadia";
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);

  const handleOpenSettings = () => {
    // console.log("Settings modal opened");
    setIsSettingsModalOpen(true);
  };
  const handleOpenLogOut = () => {
    // console.log("Log out modal opened");
    setIsLogOutModalOpen(true);
  };
  const handleCloseModals = () => {
    setIsSettingsModalOpen(false);
    setIsLogOutModalOpen(false);
  };

  return (
    <div className={css.userpanel}>
      <h2 className={css.greeting}>
        Hello, <span className={css.name}>{defaultUserName}!</span>
      </h2>
      <UserBar
        userName={userName}
        avatarUrl={avatarUrl}
        onSettingsClick={handleOpenSettings}
        onLogOutClick={handleOpenLogOut}
      />
      {isSettingsModalOpen && <UserSettingsModal onClose={handleCloseModals} />}
      <LogOutModal isOpen={isLogOutModalOpen} onClose={handleCloseModals} />
    </div>
  );
};

export default UserPanel;
