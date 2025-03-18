import { useEffect, useState } from "react";
import styles from "./UserPreview.module.css";

export default function UserPreview({ user, setUser }) {
  const [imageSource, setImageSource] = useState(null);
  const [userClicked, setUserClicked] = useState(false);

  const defaultImage = "/google-logo.svg";

  useEffect(() => {
    if (!user) return;

    const userId = user.firebaseId;
    const userPicture = user.picture;

    if (!userId) return;

    if (userPicture) {
      const cachedImg = localStorage.getItem(`user_img_${userId}`);
      if (cachedImg) {
        setImageSource(cachedImg);
      } else {
        localStorage.setItem(`user_img_${userId}`, userPicture);
        setImageSource(userPicture);
      }
    } else {
      setImageSource(defaultImage);
    }
  }, [user]);

  const handleClick = () => {
    setUserClicked(!userClicked);
  };

  const handleLogout = () => {
    if (window.confirm("Sei sicuro di voler uscire?")) {
      localStorage.clear();
      setUser(null);
    }
  };

  if (!user) return null;

  return (
    <div className={styles.userPreview}>
      <div className={styles.userGreetings}>
        <p>
          Ciao,{" "}
          <button onClick={handleClick}>{user.name?.split(" ")[0]}</button>
        </p>
        <img
          src={imageSource || defaultImage}
          alt=""
          width="30"
          height="30"
          crossOrigin="anonymous"
          onError={() => setImageSource(defaultImage)}
        />
      </div>
      {userClicked ? (
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Esci
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
