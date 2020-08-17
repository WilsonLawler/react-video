import React from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import { closeSidebar } from "../actions";
import {
  HomeIcon,
  LikeIcon,
} from "./Icons";

const SidebarWrapper = styled.div`
  position: fixed;
  top: 55px;
  left: 0;
  height: 100vh;
  width: 240px;
  background: ${(props) => props.theme.grey};
  padding-top: 1rem;
  overflow: auto;
  padding-bottom: 1.5rem;
  transition: all 0.3s;
  z-index: 2;

  &::-webkit-scrollbar {
    width: 0;
  }

  .icon {
    display: flex;
    align-items: center;
    padding: 0.2rem 0;
    padding-left: 1.5rem;
    margin-bottom: 0.4rem;
  }

  .icon:not(.hover-disable):hover {
    background: ${(props) => props.theme.darkGrey};
    cursor: pointer;
  }

  .active div {
    background: ${(props) => props.theme.darkGrey};
    cursor: pointer;
  }

  .active svg {
    fill: #fff;
  }

  .icon span {
    padding-left: 1rem;
    position: relative;
    top: 1px;
  }

  @media screen and (max-width: 1093px) {
    transform: translateX(-100%);

    ${(props) =>
    props.open &&
    css`
        transform: translateX(0);
      `}
  }
`;

const Sidebar = ({ open, closeSidebar }) => {
  return (
    <SidebarWrapper open={open}>
      <NavLink
        onClick={() => closeSidebar()}
        exact
        to="/1"
        activeClassName="active"
      >
        <div className="icon">
          <HomeIcon />
          <span>首頁</span>
        </div>
      </NavLink>
      <div className="ruler"></div>
      <NavLink
        onClick={() => closeSidebar()}
        to="/feed/liked_videos"
        activeClassName="active"
      >
        <div className="icon">
          <LikeIcon />
          <span>我的收藏</span>
        </div>
      </NavLink>
      <div className="ruler"></div>
    </SidebarWrapper>
  );
};

const mapStateToProps = (state) => ({ open: state.sidebar });

export default connect(mapStateToProps, { closeSidebar })(Sidebar);
