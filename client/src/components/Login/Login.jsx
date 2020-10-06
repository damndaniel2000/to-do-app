import React, { useRef, useState } from "react";
import { useHistory, Link } from "react-router-dom";

import "./Login.css";

const Login = () => {
  const emailID = useRef();
  const password = useRef();
  const history = useHistory();

  const [remember, setRemember] = useState(false);
  const [error, setError] = useState({
    position: "",
    message: "",
  });

  const userDetails =
    localStorage.getItem("remembered-user") === null || ""
      ? null
      : JSON.parse(localStorage.getItem("remembered-user"));
  const lastEmail = userDetails === null ? "" : userDetails.emailID;
  const lastPassword = userDetails === null ? "" : userDetails.password;

  const validateUserDetails = () => {
    let savedDetails = JSON.parse(localStorage.getItem("user-details"));
    let email_re = /\S+@\S+\.\S+/;

    if (password.current.value === "")
      setError({ position: "password", message: "Please enter your password" });
    else if (emailID.current.value === "")
      setError({ position: "email", message: "Please enter an email id" });
    else if (
      emailID.current.value !== "" &&
      email_re.test(emailID.current.value) === false
    )
      setError({ position: "email", message: "Please enter a valid email id" });
    else {
      const user = savedDetails.filter(
        (item) => item.emailID === emailID.current.value
      );

      if (
        user[0] !== undefined &&
        user[0].password === password.current.value
      ) {
        if (remember) {
          localStorage.setItem(
            "remembered-user",
            JSON.stringify({
              emailID: emailID.current.value,
              password: password.current.value,
            })
          );
        } else if (!remember) {
          localStorage.removeItem("remembered-user");
        }
        localStorage.setItem(
          "current-user",
          JSON.stringify({
            emailID: emailID.current.value,
            password: password.current.value,
          })
        );
        history.push("/dashboard");
      } else if (user[0] === undefined)
        setError({
          position: "email",
          message: "No account with this email id found",
        });
      else setError({ position: "password", message: "Incorrect password" });
    }
  };

  return (
    <div className="form-pages">
      <div className="form-container">
        <p className="form-title">Log In!</p>

        <label className="form-label">Email Address</label>
        <input
          className="form-input"
          placeholder="Enter Email"
          ref={emailID}
          defaultValue={lastEmail}
          autoFocus
        />
        {error.position === "email" && (
          <p className="form-error">{error.message}</p>
        )}

        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-input"
          placeholder="Enter Password"
          defaultValue={lastPassword}
          ref={password}
        />
        {error.position === "password" && (
          <p className="form-error">{error.message}</p>
        )}

        <div className="form-checkbox-container">
          <div>
            <input
              type="checkbox"
              value={remember}
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            &nbsp;&nbsp;Remember Me
          </div>
          <span> Forgot Password?</span>
        </div>
        <br />
        <button className="form-submit" onClick={validateUserDetails}>
          Log In
        </button>
        <br />
        <br />
      </div>
      <div className="login-footer">
        <span>
          Don't have an account?{" "}
          <Link to="/sign-up" style={{ color: "#fff" }}>
            Sign Up!
          </Link>
        </span>
        <span>
          For Github Repo,{" "}
          <a
            href="https://github.com/damndaniel2000/find-mind.git"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff" }}
          >
            Click Here !
          </a>
        </span>
      </div>
    </div>
  );
};

export default Login;
