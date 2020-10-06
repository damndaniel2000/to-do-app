import React, { useState, useEffect } from "react";
import axios from "axios";

import "./NavBar.css";

const NavBar = () => {
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    const photoID = Math.floor(Math.random() * 1000);
    //api request to picsum for profile pic with random ID
    axios
      .get(`https://picsum.photos/id/${photoID}/info`)
      .then((res) => setAvatar(res.data.download_url))
      .catch((err) => console.log(err));
  }, []);

  return (
    <nav>
      <div>
        <h1 className="nav-brand">TasksBoard</h1>
      </div>
      <div>
        <img src={avatar} alt="Profile" className="nav-avatar" />
      </div>
    </nav>
  );
};

export default NavBar;
