import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Logo from '../../../assets/logo.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserNavbar from './UserNavbar';
import GuestNavbar from './GuestNavbar';

const Navbar = () => {
  const currentUser = useSelector((state) => state.currentUser);

  return (
    <>
      {
        currentUser ?
        <UserNavbar /> :
        <GuestNavbar />
      }
    </>
  );
};

export default Navbar;
