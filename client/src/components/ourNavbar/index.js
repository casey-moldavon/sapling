import React from "react";
import { Link } from "react-router-dom";
import "./assets/css/style.css";

import Login from "../logInModal/index";
import Signup from "../signUpModal/index";
import { Navbar, Nav, Form, FormControl, Button, Col } from "react-bootstrap";
import { useRef } from "react";
import {
  SET_SEARCH_TERM,
  UPDATE_RESULT_LIST,
  LOADING
} from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";

let userId = localStorage.getItem("userID");

function OurNavbar() {
  const SearchValue = useRef(null);
  const [state, dispatch] = useStoreContext();
  const getResults = search => {
    API.searchProductWalmart(search)
      .then(res => {
        if(res.data.totalResults !== 0 && res.data.totalResults){
          dispatch({ type: UPDATE_RESULT_LIST, productList: res.data.items });
          dispatch({
            type: SET_SEARCH_TERM,
            searchTerm: SearchValue.current.value
          });
        } else{
          dispatch({ type: UPDATE_RESULT_LIST, productList: [] });
          dispatch({
            type: SET_SEARCH_TERM,
            searchTerm: SearchValue.current.value
          });
        }
      })
      .catch(err => console.log(err));
  };

  const handleSearch = () => {
    dispatch({ type: LOADING });
    console.log(SearchValue.current.value);
    getResults(SearchValue.current.value);
  };
  return (
    <div>
      {!state.logIn ? (
        <Navbar id="guest-navbar" expand="lg">
          <Navbar.Brand id="app-nav-name" href="/home">
            <i id="sapling-nav-logo" className="fas fa-seedling"></i>
            <span id="S">S</span>apling
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="bg-light"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              
              <div id="house-div">
              <Button href="/home" id="nav-home-link">
                <i id="nav-home-icon" className="fas fa-home"></i>
                <p>Home</p>
              </Button>
              </div>


              <div id="dashboard-div">
              {!userId || userId === "" ? (
                <div></div>
                ) : (
                  <Button id="nav-home-link" href="/dashboard">
                  <i id="nav-home-icon" className="fas fa-chart-line"></i>
                  <p>Dashboard</p>
                </Button>
              )}
              </div>

            <Form inline style={{ width: 500 }} onSubmit={e => {e.preventDefault()}}>
              <FormControl
                id="search-bar"
                type="text"
                placeholder="Search"
                ref={SearchValue}
              />
              <Link id="search-button-style-text" to="/results">
                <Button
                  type="submit"
                  id="search-button-style"
                  onClick={handleSearch}
                >
                    Search
                </Button>
              </Link>
            </Form>

            </Nav>

            <Button href="#news" id="nav-news-link">
              <i id="nav-news-icon" className="fas fa-bell"></i>
              <p> </p>
            </Button>

            <Nav>
              <Login />
              {!userId || userId === "" ? (<Signup/>) : (<div></div>)}
            </Nav>

          </Navbar.Collapse>
        </Navbar>
      ) : (
        <h1>True</h1>
      )}
    </div>
  );
}
export default OurNavbar;
