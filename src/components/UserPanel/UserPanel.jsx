import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/settings/selectors.js";
import UserBar from "../../components/UserBar/UserBar.jsx";
import UserSettingsModal from "../../modals/UserSettingsModal/UserSettingsModal.jsx";
import LogOutModal from "../../modals/LogOutModal/LogOutModal.jsx";

import css from "./UserPanel.module.css";
import { useLanguage } from "../../locales/langContext.jsx";

const UserPanel = () => {
  const { t } = useLanguage();

  const user = useSelector(selectUser);
  // console.log(user)
  const defaultUserName = user.name || user.email.split("@")[0];
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);

  const handleOpenSettings = () => {
    setIsSettingsModalOpen(true);
  };
  const handleOpenLogOut = () => {
    setIsLogOutModalOpen(true);
  };
  const handleCloseModals = () => {
    setIsSettingsModalOpen(false);
    setIsLogOutModalOpen(false);
  };

  return (
    <div className={css.userpanel}>
      <h2 className={css.greeting}>
        {t("HelloGuest")} <span className={css.name}>{defaultUserName}!</span>
      </h2>
      <UserBar
        userName={defaultUserName}
        avatarUrl={user.avatarUrl}
        onSettingsClick={handleOpenSettings}
        onLogOutClick={handleOpenLogOut}
      />
      {isSettingsModalOpen && <UserSettingsModal onClose={handleCloseModals} />}
      <LogOutModal isOpen={isLogOutModalOpen} onClose={handleCloseModals} />
    </div>
  );
};

export default UserPanel;
