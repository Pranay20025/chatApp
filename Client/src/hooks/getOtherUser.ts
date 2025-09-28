import axios from 'axios';
import { useEffect } from 'react'
import { userUrl } from '../url';
import { useAppDispatch } from '../redux/hooks';
import { setusers } from '../redux/usersSlice';

const usegetOtherUser = () => {
   const dispatch = useAppDispatch();

  useEffect(() => {
     const fetchedUsers = async () => {
    try {
      const res = await axios.get(`${userUrl}/allusers`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setusers(res.data.users));
        console.log(res.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };
    fetchedUsers();
  }, []);
}

export default usegetOtherUser