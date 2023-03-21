import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  let history = useHistory();

  const handleOnSubmit = async (e) => {
    //Prevent the page from reloading
    e.preventDefault();
    // Api call
    const host = "http://localhost:5000";
    const url = `${host}/api/auth/createuser`;

    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json); // parses JSON response into native JavaScript objects
    if (json.success) {
      //save the authentication token and redirect
      localStorage.setItem("token", json.token);
      history.push("/");
      props.showAlert("Account Created Successfully", "success");
    }
    else{
        props.showAlert("Invalid Details", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="mt-2">
      <h2 className="my-2">Create an account to use iNoteBook</h2>
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            onChange={onChange}
            name="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            name="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={onChange}
            name="password"
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            onChange={onChange}
            name="cpassword"
            minLength={5}
            required
          />
          {credentials.password !== credentials.cpassword && 
            <div id="passwordHelp" className="form-text">
              Confirm Password should match Password
            </div>
          }
        </div>

        <button
          disabled={credentials.password !== credentials.cpassword}
          type="submit"
          className="btn btn-primary my-2 mx-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
