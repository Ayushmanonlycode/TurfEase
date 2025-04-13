import React from 'react';
import ball from "../images/ball.png";
import { Link } from 'react-router-dom';

export const HomeBody = () => {
  return (
    <div className="home-container">
      <div className="content-wrapper">
        <div className="image-section">
          <img 
            src={ball} 
            alt="Football" 
            className="ball-image"
            loading="lazy"
          />
        </div>
        
        <div className="text-section">
          <h1 className="main-heading">
            FIND AND BOOK YOUR NEAREST{" "}
            <span className="highlight-red">TURF</span> JUST A CLICK AWAY!
          </h1>
          
          <p className="sub-heading">
            When you book your ground online with us, you get to pay with credit card, 
            debit card, net banking or with digital wallet too. With TurfEase you enjoy 
            the process of ground booking as much as you enjoy the game!
          </p>
          
          <Link to="/login" className="cta-link">
            <button className="cta-button">
              LOGIN / SIGNUP
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// CSS (can be placed in a separate file)
const styles = `
  .home-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 120px); /* Adjust based on your header/footer */
    padding: 2rem;
    background-color: #f8f9fa;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1200px;
    width: 100%;
    gap: 2rem;
  }

  .image-section {
    text-align: center;
  }

  .ball-image {
    max-width: 200px;
    height: auto;
    transition: transform 0.3s ease;
  }

  .ball-image:hover {
    transform: scale(1.05);
  }

  .text-section {
    text-align: center;
    max-width: 800px;
  }

  .main-heading {
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    line-height: 1.3;
    color: #333;
  }

  .highlight-red {
    color: #e74c3c;
  }

  .sub-heading {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #555;
    margin-bottom: 2rem;
  }

  .cta-button {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 0.8rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
  }

  .cta-button:hover {
    background-color: #c0392b;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    .home-container {
      padding: 1.5rem;
    }
    
    .content-wrapper {
      gap: 1.5rem;
    }
    
    .ball-image {
      max-width: 150px;
    }
    
    .main-heading {
      font-size: 1.8rem;
    }
    
    .sub-heading {
      font-size: 1rem;
    }
    
    .cta-button {
      padding: 0.7rem 1.5rem;
    }
  }

  @media (max-width: 480px) {
    .main-heading {
      font-size: 1.5rem;
    }
    
    .sub-heading {
      font-size: 0.9rem;
    }
  }
`;

// Add styles to the document
const styleElement = document.createElement("style");
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);