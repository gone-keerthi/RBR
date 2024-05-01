import React, { useState } from "react";

import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { auth } from "../Firebase/firebase.js";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const Login = () => {
  const [otp, setOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTPComponent, setShowOTPComponent] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  function onCaptchaVerification() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "normal",
          callback: (response) => {
            onSignUp();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignUp() {
    onCaptchaVerification();

    const appVerifier = window.recaptchaVerifier;

    const formattedPhoneNumber = "+" + phoneNumber;

    signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setShowOTPComponent(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function onOTPVerify() {
    window.confirmationResult
      .confirm(otp)
      .then(async (result) => {
        console.log(result);
        setIsLogin(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
    {isLogin ? (
      <div className="Login-component">
      {showOTPComponent ? (
        <div className="login-popup">
          <div className="login-title" style={{ padding: "0 20px" }}>
            <h3>Please Enter the One Time Password to Login</h3>
          </div>
          <div className="login-paragraph">
            <p>OTP has been sent </p>
            <div className="otp-fields">
              <OtpInput
                value={otp}
                onChange={setOtp}
                OTPLength={6}
                otpType="number"
                disabled={false}
                autoFocus
              ></OtpInput>
            </div>
          </div>
          <div>
            <button className="login-button" onClick={onOTPVerify}>
              LOGIN
            </button>
            <p style={{ color: " #0263C7", marginTop: "15px" }}>RESEND OTP</p>
            <p style={{ color: "#0263C7" }}>
              <a href="#"> Entered a Wrong Mobile Number?</a>
            </p>
          </div>
        </div>
      ) : (
        <div className="login-popup-container">
          <div className="login-popup">
            <div className="login-title">
              <h3>Please Enter Your Mobile Number</h3>
            </div>
            <div className="login-paragraph">
              <p>
                We will send you a <strong>One Time Password</strong>{" "}
              </p>
            </div>
            <div
              className="login-phone-input"
              style={{
                width: "50%",
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              <PhoneInput
                style={{ width: "100%" }}
                country={"in"}
                value={phoneNumber}
                onChange={setPhoneNumber}
              />
            </div>
            <br></br>
            <div>
              <button type="submit" className="login-button" onClick={onSignUp}>
                SEND OTP
              </button>
            </div>
            <br></br>
            <div id="recaptcha-container"></div>
          </div>
        </div>
      )}
    </div>
    ):null}
    </>


    // <div className="Login-component">
    //   {showOTPComponent ? (
    //     <div className="login-popup">
    //       <div className="login-title" style={{ padding: "0 20px" }}>
    //         <h3>Please Enter the One Time Password to Login</h3>
    //       </div>
    //       <div className="login-paragraph">
    //         <p>OTP has been sent </p>
    //         <div className="otp-fields">
    //           <OtpInput
    //             value={otp}
    //             onChange={setOtp}
    //             OTPLength={6}
    //             otpType="number"
    //             disabled={false}
    //             autoFocus
    //           ></OtpInput>
    //         </div>
    //       </div>
    //       <div>
    //         <button className="login-button" onClick={onOTPVerify}>
    //           LOGIN
    //         </button>
    //         <p style={{ color: " #0263C7", marginTop: "15px" }}>RESEND OTP</p>
    //         <p style={{ color: "#0263C7" }}>
    //           <a href="#"> Entered a Wrong Mobile Number?</a>
    //         </p>
    //       </div>
    //     </div>
    //   ) : (
    //     <div className="login-popup-container">
    //       <div className="login-popup">
    //         <div className="login-title">
    //           <h3>Please Enter Your Mobile Number</h3>
    //         </div>
    //         <div className="login-paragraph">
    //           <p>
    //             We will send you a <strong>One Time Password</strong>{" "}
    //           </p>
    //         </div>
    //         <div
    //           className="login-phone-input"
    //           style={{
    //             width: "50%",
    //             display: "flex",
    //             textAlign: "center",
    //             justifyContent: "center",
    //           }}
    //         >
    //           <PhoneInput
    //             style={{ width: "100%" }}
    //             country={"in"}
    //             value={phoneNumber}
    //             onChange={setPhoneNumber}
    //           />
    //         </div>
    //         <br></br>
    //         <div>
    //           <button type="submit" className="login-button" onClick={onSignUp}>
    //             SEND OTP
    //           </button>
    //         </div>
    //         <br></br>
    //         <div id="recaptcha-container"></div>
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
};

export default Login;
