import React from "react";
import styles from "../Sidebar/Sidebar.module.css";
import type { User } from "../types";
import usegetOtherUser from "../../hooks/getOtherUser";
import Sidebarw from "./Sidebarw";
import { useAppSelector } from "../../redux/hooks";

interface SidebarProps {
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const Sidebar = ({ setSelected, setSelectedUser }: SidebarProps) => {
  const { authUser } = useAppSelector((store) => store.user);
  const { users } = useAppSelector((store) => store.users);

  usegetOtherUser();

  if (!authUser) return null;
  const currUser = authUser._id;

  return (
    <div className={styles.sidebar}>
      <h2>QuickChat</h2>
      <input
        type="text"
        placeholder="Search here..."
        className={styles.searchInput}
      />
      <div className={styles.userList}>
        {users?.map((user: User) => (
          <Sidebarw
            user={user}
            key={user._id}
            currUser={currUser}
            setSelected={setSelected}
            setSelectedUser={setSelectedUser}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
