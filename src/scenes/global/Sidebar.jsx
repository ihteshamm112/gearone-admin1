import React, { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Avatar, Box, Grid, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {
  AccountBalance, AccountBalanceWallet, Apps,
  Assignment, CalendarViewMonthRounded, Cancel, CardGiftcard, Category, Chair, ContentCut, Dashboard, FitnessCenter, Help, Money, MonitorWeight, Payment, People, Person4, PrivacyTip, Receipt, Remove, Subscriptions, ThumbDown, Visibility
} from "@mui/icons-material";
import logo from '../../components/Images/logo.png'

const logoStyle = {
  paddingTop: 5,
  width: '100%',
  height: '40%'
}

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: "gray",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography fontWeight="bold">{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [btnHidesmall, setbtnHideSmall] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth < 620) {
        // console.log(window.innerWidth)
        setIsCollapsed(true)
        setbtnHideSmall(false)
      } else {
        setIsCollapsed(false)
        setbtnHideSmall(true)
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        // backgroundColor: "red",
        "& .pro-sidebar-inner": {
          boxShadow: "0px 3px 8px #00000029",
          background: `white !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "gray !important",
        },
        "& .pro-menu-item.active": {
          color: "#FF6700 !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          {
            btnHidesmall ?
              <MenuItem
                onClick={() => setIsCollapsed(!isCollapsed)}
                icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                style={{
                  margin: "10px 0 20px 0",
                  color: colors.grey[100],
                }}
              >
                {!isCollapsed && (
                  <Box
                  // display="flex"
                  // justifyContent="space-between"
                  // alignItems="center"
                  // ml="15px"
                  >
                    <div style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
                      <Avatar src={logo} sx={{ width: 80, height: 80, alignSelf: "center" }} />
                    </div>
                    {/* <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                      <MenuOutlinedIcon />
                    </IconButton> */}
                  </Box>
                )}
              </MenuItem>
              :
              null
          }

          <Typography variant="paragraph" color="#202020" sx={{ pl: 1.5, font: "normal normal medium 22px/32px Roboto", fontWeight: 600, fontSize: "15px", letterSpacing: "1px" }}>
            Menu
          </Typography>

          <Box paddingLeft={isCollapsed ? undefined : "5%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<Dashboard />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Users"
              to="/ManageUsers"
              icon={<Help />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Manage Logos"
              to="/ManageLogos"
              icon={<Assignment />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Banners Ads "
              to="/manage_banners_ads"
              icon={<FitnessCenter />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Items"
              to="/dietplan"
              icon={<MonitorWeight />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Categories"
              to="/categories"
              icon={<Apps />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Merchandise"
              to="/users"
              icon={<People />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Daily Deals"
              to="/subscription"
              icon={<Subscriptions />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Terms And Conditions"
              to="/Terms"
              icon={<Subscriptions />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Privacy Policy"
              to="/Privacy"
              icon={<Subscriptions />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Change Password"
              to="/updatepassword"
              icon={<Subscriptions />}
              selected={selected}
              setSelected={setSelected}
            />

            {/*  
            <Item
              title="Payment From Customers"
              to="/paymentsfromcustomers"
              icon={<AccountBalanceWallet />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Appointment Cancellation Reasons"
              to="/cancellationreason"
              icon={<Cancel />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Complaint Reasons"
              to="/complaintreason"
              icon={<ThumbDown />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Refunds To Customers"
              to="/refundstocustomers"
              icon={<Receipt />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Customers"
              to="/customers"
              icon={<Visibility />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Payments Received"
              to="/paymentsreceived"
              icon={<Payment />}
              selected={selected}
              setSelected={setSelected}
            />  */}

          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
