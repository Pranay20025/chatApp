import styles from "./HomePage.module.css";
import ProfilePanel from "../../components/ProfilePanel/ProfilePanel";
import ChatArea from "../../components/ChatArea/ChatArea";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useState } from "react";
import type { User } from "../../components/types";

const HomePage = () => {

  const [selected, setSelected] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User| undefined>();
  
  return (
    <div className={styles.homepage}>
      <div className={styles.blur} />

      <div className={selected ? styles.container : styles.container}>
        <Sidebar  setSelected={setSelected}  setSelectedUser={setSelectedUser}/>
        {selected === true && <ChatArea  selectedUser={selectedUser}/>}
        <ProfilePanel/>
      </div>
    </div>
  );
};
export default HomePage;
