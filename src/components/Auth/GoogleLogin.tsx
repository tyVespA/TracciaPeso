import { auth, provider, signInWithPopup } from "../../firebase";
import axios from "axios";
import styles from "./GoogleLogin.module.css";

const baseUrl =
  import.meta.env.MODE === "development"
    ? "http://localhost:3001/auth/firebase"
    : "https://weight-tracker-xyes.onrender.com//auth/firebase";

const GoogleLogin = ({ onLoginSuccess }) => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const idToken = await user.getIdToken();
      const res = await axios.post(baseUrl, { token: idToken });

      localStorage.setItem("token", res.data.token);
      onLoginSuccess(res.data.user);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <button onClick={handleLogin} className={styles.googleLoginBtn}>
      <img src="/google-logo.svg" alt="" />
      Accedi con Google
    </button>
  );
};

export default GoogleLogin;
