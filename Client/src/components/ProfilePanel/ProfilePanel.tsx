import { useNavigate } from "react-router-dom";
import styles from "../ProfilePanel/ProfilePannel.module.css";
import { toast } from "react-toastify";
import axios from "axios";
import { userUrl } from "../../url";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setAuthUser } from "../../redux/userSlice";


const ProfilePanel = () => {
  const navigate = useNavigate();
  const {authUser} = useAppSelector(store=>store.user);
  const {users} = useAppSelector(store => store.users);
  const dispatch = useAppDispatch();
  const logout = async () => {
    try {
      const res = await axios.get(`${userUrl}/logout`,{withCredentials:true});
      if (res.data.success) {
        toast.success("Logged out successfully");
        dispatch(setAuthUser(null));
          localStorage.removeItem("token");
        setTimeout(() => navigate("/login"), 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  if (!authUser) return null;

  return (
    <div className={styles.profile}>
      <img
        src={authUser.profilePic}
        alt="profile"
        className={styles.profilePic}
      />
      <h3>{authUser.name}</h3>
      <p className={styles.bio}>{authUser.bio}</p>
      {/* <div className={styles.media}>
        <h4>Media</h4>
        <div className={styles.mediaGrid}>
          {[...Array(6)].map((_, i) => (
            <img key={i} src="https://via.placeholder.com/60" alt="media" />
          ))}
        </div>
      </div> */}
      <button className={styles.logout} onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default ProfilePanel;
