import React, {  useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { userUrl } from "../../url";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "../../redux/userSlice";
import { useAppDispatch } from "../../redux/hooks";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLogin) {
      // Registration
      try {
        const res = await axios.post(`${userUrl}/register`, form, {
          headers: { "Content-Type": "application/json" }, withCredentials:true,
        });

        if (res.data.success) {
          toast.success(res.data.message);
          setForm({ name: "", email: "", password: "", gender: "" });
          setIsLogin(true);
        }
      } catch (error: any) {
        console.error(error);
        toast.error(error?.response?.data?.message || "Registration failed");
      }
    } else {
      // Login
      try {
        const res = await axios.post(`${userUrl}/login`, form, {
          headers: { "Content-Type": "application/json" }, withCredentials:true,
        });

        if (res.data.success) {
          toast.success(res.data.message);
          setForm({ name: "", email: "", password: "", gender: "" });
          dispatch(setAuthUser(res.data.user));
          localStorage.setItem("token",res.data.token);
          setTimeout(() => navigate("/"), 1000);
        }
      } catch (error: any) {
        console.error(error);
        toast.error(error?.response?.data?.message || "Login failed");
      }
    }
  };

  return (
    <div className={styles.auth}>
      <div className={styles.authContainer}>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleOnSubmit}>
          {!isLogin && (
            <>
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="gender">Gender</label>
              <div className={styles.genderContainer}>
                <div>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={form.gender === "male"}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="male">Male</label>
                </div>
                <div>
                  <input 
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={form.gender === "female"}
                  onChange={handleChange}
                  required
                   />
                  <label htmlFor="female">Female</label>
                </div>
              </div>
            </>
          )}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>

        <p className={styles.toggleText}>
          {isLogin ? "Not registered?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Sign up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
