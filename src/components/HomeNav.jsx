import React from "react";
import homebg from "../images/bgimg.jpg";
import navLogo from "../images/turfease.png";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";

export const HomeNav = () => {
  return (
    <div id="Home" style={{ position: "relative", height: "100vh" }}>
      {/* Background Image with Overlay */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${homebg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 1
      }} />
      
      {/* Navigation Bar */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1em 5em",
        zIndex: 3
      }}>
        <div>
          <img 
            src={navLogo} 
            alt="TurfEase Logo" 
            style={{ 
              height: "250px", // Maintain original logo size
              width: "auto" // Preserve aspect ratio
            }} 
          />
        </div>
        <div>
          <Link to="/login">
            <Button colorScheme="red" size="md">LOGIN/SIGNUP</Button>
          </Link>
        </div>
      </div>

      {/* Centered Hero Text */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        color: "white",
        zIndex: 2,
        width: "90%",
        maxWidth: "1200px"
      }}>
        <h1 style={{
          fontSize: "3.5rem",
          fontWeight: "bold",
          textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
          margin: 0,
          lineHeight: "1.2"
        }}>
          FIND AND BOOK YOUR NEAREST{" "}
          <span style={{ color: "#E53E3E" }}>TURF</span> JUST A CLICK AWAY!
        </h1>
      </div>
    </div>
  );
};