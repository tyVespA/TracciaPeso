import { useEffect, useState } from "react";
import styles from "./UserPreview.module.css";

export default function UserPreview({ user, setUser }) {
  const [cachedImage, setCachedImage] = useState(null);

  useEffect(() => {
    if (!user) return;

    const userId = user.firebaseId;
    const userPicture = user.picture;

    if (!userId || !userPicture) return;

    const cachedImg = localStorage.getItem(`user_img_${userId}`);
    if (cachedImg) {
      setCachedImage(cachedImg);
    } else {
      localStorage.setItem(`user_img_${userId}`, userPicture);
      setCachedImage(userPicture);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  if (!user) return null;

  return (
    <div className={styles.userPreview}>
      {cachedImage ? (
        <img
          src={cachedImage}
          alt=""
          width="50"
          height="50"
          crossOrigin="anonymous"
        />
      ) : (
        user.picture && (
          <img
            src={user.picture}
            alt=""
            width="50"
            height="50"
            crossOrigin="anonymous"
          />
        )
      )}
      <p>Welcome {user.name?.split(" ")[0]}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
