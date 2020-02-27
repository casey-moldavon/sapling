import React, { useState } from "react";
import {
  Button,
  Modal,
  Container,
  InputGroup,
  FormControl
} from "react-bootstrap";
import { Link } from "react-router-dom";
import API from "../../utils/API";

let userId = localStorage.getItem("userID");

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEmail = e => {
    setEmail(e.target.value);
  };
  const handlePassword = e => {
    setPassword(e.target.value);
  };

  const handleSignIn = e => {
    console.log("handleSignIn");
    e.preventDefault();
    API.getLoggedUser({ email: email, password: password })
      .then(response => {
        console.log("get one user", response.data);
        if (response.data) {
          API.getUserHash(email).then(response => {
            console.log("hash response", response.data);
            window.localStorage.setItem("userID", response.data._id);
            window.location.reload();

          });
          console.log("successful Login");

          handleClose();
        } else {
          console.log("No user exit");
        }
      })
      .catch(error => {
        alert("User does not exist.");
        console.log(error);
      });
  };

  const handleLogout = () => {
    window.localStorage.removeItem("userID");
    window.location.reload();
  };

  return (
    <div>
      {/* Login */}
      <>
        {!userId || userId === "" ? (
          <Button href="" id="login-modal-button" onClick={handleShow}>
            <i id="login-button-icon" className="fas fa-sign-in-alt"></i>
            <p>Sign-In</p>
          </Button>
        ) : (
          <Link to="/home">
            <Button id="logout-modal-button" onClick={handleLogout}>
              <i id="logout-button-icon" className="fas fa-sign-out-alt"></i>
              <p>Sign-Out</p>
            </Button>
          </Link>
        )}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title id="modal-heading">
              <i id="modal-heading-logo" className="fas fa-seedling"></i>
              <span id="S2">S</span>
              <span id="apling">apling</span>
              <br/>
              {"Login"}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body id="login-modal-body">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <i id="email-logo" className="fas fa-sun"></i> Email
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Email"
                aria-label="Email"
                aria-describedby="basic-addon1"
                value={email}
                onChange={handleEmail}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon2">
                  <i id="password-logo" className="fas fa-cloud-rain"></i> Password
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Password"
                aria-label="Password"
                aria-describedby="basic-addon2"
                type="password"
                value={password}
                onChange={handlePassword}
              />
            </InputGroup>
          </Modal.Body>

          <Modal.Footer>
            <Button href="" id="sign-in" variant="primary" onClick={handleSignIn}>
              <i id="sign-in-logo" className="fas fa-tree"></i> Sign-In
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

export default Login;
