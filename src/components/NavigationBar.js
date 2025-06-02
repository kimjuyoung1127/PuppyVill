// src/components/NavigationBar.js
import React from 'react';
import { Link } from 'wouter'; // Assuming wouter is the router

const NavigationBar = () => {
  return (
    <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#f8f9fa' }}>
      <div className="nav-logo">
        <Link href="/" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Puppyville</Link> {/* Assuming a logo/link to home */}
      </div>
      <ul className="nav-links" style={{ listStyle: 'none', display: 'flex', margin: 0, padding: 0 }}>
        <li className="nav-item dropdown" style={{ marginRight: '15px' }}>
          {/* Conceptual Dropdown: Actual dropdown requires more state/CSS for show/hide functionality */}
          <span style={{ cursor: 'pointer' }}>Our Programs</span>
          {/* Basic visual representation of a dropdown menu, not functional */}
          <ul className="dropdown-menu" style={{ display: 'none', position: 'absolute', backgroundColor: '#fff', boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)', zIndex: 1 }}>
            <li style={{ padding: '10px' }}><Link href="/programs/puppy-kindergarten">Puppy Kindergarten</Link></li>
            <li style={{ padding: '10px' }}><Link href="/programs/basic-obedience">Basic Obedience</Link></li>
            <li style={{ padding: '10px' }}><Link href="/programs/advanced-training">Advanced Training</Link></li>
            {/* Add more program links as needed */}
          </ul>
        </li>
        <li className="nav-item" style={{ marginRight: '15px' }}><Link href="/how-it-works">How It Works</Link></li>
        <li className="nav-item" style={{ marginRight: '15px' }}><Link href="/about">About Us</Link></li>
        <li className="nav-item" style={{ marginRight: '15px' }}><Link href="/success-stories">Success Stories</Link></li>
        <li className="nav-item" style={{ marginRight: '15px' }}><Link href="/resources">Resources/Blog</Link></li>
        <li className="nav-item"><Link href="/contact">Contact Us</Link></li>
      </ul>
      <div className="nav-cta">
        <Link href="/enroll"><button className="cta-button" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Enroll Now</button></Link>
      </div>
    </nav>
  );
};

export default NavigationBar;
