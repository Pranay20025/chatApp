import React from "react";
import type { User } from "../types";
import styles from "../Sidebar/Sidebar.module.css";
import { useAppSelector } from "../../redux/hooks";

interface SidebarwProps {
  user: User;
  currUser: string;
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const Sidebarw: React.FC<SidebarwProps> = ({ user, currUser, setSelected, setSelectedUser }) => {
  const {onlineUsers} = useAppSelector(store=>store.user);
  const isOnline = onlineUsers.includes(user._id);
  
  if (user._id === currUser) {
    return (
      <div className={styles.userCard2}>
        <div className={styles.userInfo}>
          <img src={user.profilePic} alt={user.name} />
          <div>
            <p>You</p>
            <span className={styles.online}>Online</span>
          </div>
        </div>
      </div>
    );
  }

return (
  <div
    className={styles.userCard}
    onClick={() => {
      setSelected(true);
      setSelectedUser(user);
    }}
  >
    <div className={styles.userInfo}>
      <img src={user.profilePic} alt={user.name} />
      <div>
        <p>{user.name}</p>
        {isOnline ? (
          <span className={styles.online}>Online</span>
        ) : (
          <span className={styles.offline}>Offline</span>
        )}
      </div>
    </div>
  </div>
);
};

export default Sidebarw;
