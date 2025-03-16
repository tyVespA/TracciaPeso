import { auth, provider, signInWithPopup } from "../../firebase";
import axios from "axios";
const baseUrl = "/auth/firebase";

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

  return <button onClick={handleLogin}>Sign in with Google</button>;
};

export default GoogleLogin;
