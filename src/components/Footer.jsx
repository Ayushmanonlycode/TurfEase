import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p className="footer-slogan">
          FIND AND BOOK YOUR NEAREST <span className="highlight-red">TURF</span>{" "}
          JUST A CLICK AWAY!
        </p>
        
        <div className="social-icons">
          <a href="https://facebook.com" aria-label="Facebook" className="icon-link">
            <FaFacebook className="social-icon" />
          </a>
          <a href="https://instagram.com" aria-label="Instagram" className="icon-link">
            <FaInstagram className="social-icon" />
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn" className="icon-link">
            <FaLinkedin className="social-icon" />
          </a>
          <a href="https://twitter.com" aria-label="Twitter" className="icon-link">
            <FaTwitter className="social-icon" />
          </a>
        </div>
        
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} Ayushman's TurfEase. All rights reserved.</p>
          <div className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/contact">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// CSS (can be placed in a separate file)
const styles = `
  .footer-container {
    background-color: #000000;
    color: #ffffff;
    padding: 1.5rem 1rem;
    text-align: center;
  }

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-slogan {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .highlight-red {
    color: #e74c3c;
  }

  .social-icons {
    display: flex;
    justify-content: center;
    gap: 1.2rem;
    margin-bottom: 1rem;
  }

  .icon-link {
    color: #ffffff;
    font-size: 1.3rem;
    transition: color 0.3s ease;
  }

  .icon-link:hover {
    color: #e74c3c;
  }

  .social-icon {
    vertical-align: middle;
  }

  .copyright {
    font-size: 0.8rem;
    margin-top: 0.8rem;
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .footer-links a {
    color: #b3b3b3;
    text-decoration: none;
    transition: color 0.3s ease;
    font-size: 0.8rem;
  }

  .footer-links a:hover {
    color: #e74c3c;
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .footer-container {
      padding: 1rem;
    }
    
    .footer-slogan {
      font-size: 1.1rem;
    }
    
    .social-icons {
      gap: 1rem;
    }
    
    .footer-links {
      flex-direction: column;
      gap: 0.3rem;
    }
  }
`;

// Add styles to the document
const styleElement = document.createElement("style");
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);