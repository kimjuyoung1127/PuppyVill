import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add meta tags for SEO
document.documentElement.lang = 'en';
document.title = 'ResponderPro - Automated Customer Inquiry System for Freelancers';

const metaDescription = document.createElement('meta');
metaDescription.name = 'description';
metaDescription.content = 'ResponderPro helps freelancers automate responses to common customer inquiries with powerful templates, analytics, and privacy controls.';
document.head.appendChild(metaDescription);

// Add Open Graph tags for better social sharing
const ogTitle = document.createElement('meta');
ogTitle.property = 'og:title';
ogTitle.content = 'ResponderPro - Automated Customer Inquiry System';
document.head.appendChild(ogTitle);

const ogDescription = document.createElement('meta');
ogDescription.property = 'og:description';
ogDescription.content = 'Save time responding to customer inquiries with professional templates and privacy-focused automation tools.';
document.head.appendChild(ogDescription);

const ogType = document.createElement('meta');
ogType.property = 'og:type';
ogType.content = 'website';
document.head.appendChild(ogType);

createRoot(document.getElementById("root")!).render(<App />);
