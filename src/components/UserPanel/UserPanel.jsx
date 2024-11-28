import  { useState } from "react";
import UserBar from "../UserBar/UserBar.jsx";
import UserSettingsModal from "../UserSettingsModal/UserSettingsModal.jsx";
import LogOutModal from "../LogOutModal/LogOutModal.jsx";
import css from "./UserPanel.module.css"

const UserPanel = ({ userName, avatarUrl }) => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);

  const handleOpenSettings = () => {
  console.log("Settings modal opened");
  setIsSettingsModalOpen(true);
};
const handleOpenLogOut = () => {
  console.log("Log out modal opened");
  setIsLogOutModalOpen(true);
};
  const handleCloseModals = () => {
    setIsSettingsModalOpen(false);
    setIsLogOutModalOpen(false);
  };

  return (
    <div className={css.userpanel}> 
      <h2 className={css.greeting}>Hello, <strong>{userName}!</strong></h2>
      <UserBar
        userName={userName}
        avatarUrl={avatarUrl}
        onSettingsClick={handleOpenSettings}
        onLogOutClick={handleOpenLogOut}
      />
      {isSettingsModalOpen && (
        <UserSettingsModal onClose={handleCloseModals} />
      )}
      {isLogOutModalOpen && (
        <LogOutModal onClose={handleCloseModals} />
      )}
    </div>
  );
};

export default UserPanel;