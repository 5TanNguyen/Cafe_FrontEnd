import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <p>Copyright @2020</p>
      <div className="social">
        <i className="fa fa-facebook"></i>
        <i className="fa fa-instagram"></i>
      </div>
    </div>
  );
};

export default Footer;
