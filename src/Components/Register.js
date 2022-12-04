import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setname] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [address, setaddress] = useState("");
  const [otp, setotp] = useState("");
  const [isphoneverified, setisphoneverified] = useState(false);
  const [isrequestedotp, setisrequestedotp] = useState(false);

  const sendotp = async (channel) => {
    try {
      const response = await axios.post("/api/otp/requestotp", {
        phonenumber,
        channel,
       
      });
      console.log(response.data);
      if (response.data.success === true) {
        setisrequestedotp(true);
        toast.success(`Otp sent on ${channel}`);
      } else {
        toast.error("Server issue");
      }
    } catch (error) {
      console.log(error.toJSON());
    }
  };
  const verifyotp = async () => {
    try {
      const response = await axios.post("/api/otp/verifyotp", {
        // Template for sending data from F->B
        phonenumber,
        otp,
      });
      if (response.data.success === true) {
        setisphoneverified(true);
        toast.success(`Your OTP verified ${otp}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const submitdetails = () => {
    try {
      if (isphoneverified === false) {
        return toast.warning("Please verify your phone number first");
      } else {
        toast.success("your details submitted");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="card container" style={{padding:10,borderColor:"purple"}}>
      
        <div className="mb-3">
          <label  className="form-label">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setname(e.target.value)}
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label  className="form-label">
            Address
          </label>
          <input
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label  className="form-label">
            Phone Number
          </label>
          <input
            value={phonenumber}
            onChange={(e) => setphonenumber(e.target.value)}
            type="number"
            className="form-control"
            id="exampleInputPassword1"/>
          </div>
        {isrequestedotp === true ?
        (
          <>
            <div className="mb-3">
              <label  className="form-label">
                Enter OTP sent to Phone Number
              </label>
              <input
                value={otp}
                onChange={(e) => setotp(e.target.value)}
                type="number"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <p>
              Didn't received OTP?
              <span
                onClick={() => sendotp("call")}
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Request a call
              </span>
            </p>
            <div className="mb-3">
              <button
                onClick={() => verifyotp()}
                type="button"
                className="btn btn-primary"
              >
                Verify OTP
              </button>
            </div>
          </>
        ) : (
          <div className="mb-3">
            <button
              onClick={() => sendotp("sms")}
              type="button"
              className="btn btn-primary"
            >
              Send OTP
            </button>
          </div>
        )}
        <div className="mb-3">
          <button
            onClick={() => submitdetails()}
            type="button"
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
