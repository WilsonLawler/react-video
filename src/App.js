import React from "react";
import { connect } from "react-redux";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import GlobalStyle from "./styles/GlobalStyle";
import { darkTheme } from "./styles/theme";
import Router from "./Router";
import "react-toastify/dist/ReactToastify.css";

const App = ({ user }) => {

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <ToastContainer
        autoClose={2500}
        position="top-right"
        closeButton={false}
      />
      <Router />
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(App);