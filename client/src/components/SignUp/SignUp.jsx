import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const userName = useRef();
  const emailID = useRef();
  const password = useRef();

  const history = useHistory();

  const [error, setError] = useState({
    position: "",
    message: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const makeAccount = () => {
    const existingUsers =
      localStorage.getItem("user-details") === null
        ? null
        : JSON.parse(localStorage.getItem("user-details"));
    const email_re = /\S+@\S+\.\S+/;

    if (password.current.value === "")
      setError({ position: "password", message: "Please enter your password" });
    else if (emailID.current.value === "")
      setError({ position: "email", message: "Please enter an email id" });
    else if (userName.current.value === "")
      setError({ position: "userName", message: "Please enter a username" });
    else if (
      emailID.current.value !== "" &&
      !email_re.test(emailID.current.value)
    )
      setError({ position: "email", message: "Please enter a valid email id" });
    else if (
      existingUsers !== null &&
      existingUsers.find((item) => item.userName === userName.current.value)
    )
      setError({
        position: "userName",
        message: "This username has been already taken",
      });
    else if (
      existingUsers !== null &&
      existingUsers.find((item) => item.emailID === emailID.current.value)
    )
      setError({
        position: "email",
        message: "This email has been already used",
      });
    else if (password.current.value !== "" && password.current.value.length < 8)
      setError({
        position: "password",
        message: "Password should be longer than 8 characters",
      });
    else {
      const userDetails = {
        userName: userName.current.value,
        emailID: emailID.current.value,
        password: password.current.value,
        tasks: {},
      };
      if (!termsAccepted)
        setError({
          position: "t&c",
          message:
            "You have to accept the terms and conditions before making an account",
        });
      else {
        if (existingUsers === null) {
          localStorage.setItem("user-details", JSON.stringify([userDetails]));
        } else {
          existingUsers.push(userDetails);
          localStorage.setItem("user-details", JSON.stringify(existingUsers));
        }
        history.push("/");
      }
    }
  };

  return (
    <div className="form-pages">
      <div className="form-container">
        <p className="form-title">Sign Up</p>

        <label className="form-label">Username</label>
        <input
          className="form-input"
          placeholder="Enter name"
          ref={userName}
          autoFocus
        />
        {error.position === "userName" && (
          <p className="form-error">{error.message}</p>
        )}
        <label className="form-label">Email Address</label>
        <input className="form-input" placeholder="Enter Email" ref={emailID} />
        {error.position === "email" && (
          <p className="form-error">{error.message}</p>
        )}
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-input"
          placeholder="Enter Password"
          ref={password}
        />
        {error.position === "password" && (
          <p className="form-error">{error.message}</p>
        )}
        <div className="form-checkbox-container">
          <div>
            <input
              type="checkbox"
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
            <span> &nbsp;&nbsp;&nbsp;I accept terms & conditions</span>
          </div>
        </div>
        <br />
        {error.position === "t&c" && (
          <p className="form-error">{error.message}</p>
        )}
        <button className="form-submit" onClick={makeAccount}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
