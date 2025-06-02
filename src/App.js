// src/App.js
import React from 'react';
import { Router, Route, Switch } from 'wouter'; // Assuming wouter
import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import ProgramPage from './pages/ProgramPage'; // Generic program page
// Import other page components as they are created/refactored
// e.g., import HowItWorksPage from './pages/HowItWorksPage';
// import AboutPage from './pages/AboutPage';
// import SuccessStoriesPage from './pages/SuccessStoriesPage';
// import ResourcesPage from './pages/ResourcesPage';
// import ContactPage from './pages/ContactPage';
// import EnrollPage from './pages/EnrollPage';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route path="/" component={HomePage} />
        {/* Example route for a generic program page */}
        <Route path="/programs/:id" component={ProgramPage} />
        {/* Routes for other pages from NavigationBar (components not yet created) */}
        {/* <Route path="/how-it-works" component={HowItWorksPage} /> */}
        {/* <Route path="/about" component={AboutPage} /> */}
        {/* <Route path="/success-stories" component={SuccessStoriesPage} /> */}
        {/* <Route path="/resources" component={ResourcesPage} /> */}
        {/* <Route path="/contact" component={ContactPage} /> */}
        {/* <Route path="/enroll" component={EnrollPage} /> */}

        {/* Fallback for 404 */}
        <Route>
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404: Page Not Found!</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link href="/">Go to Homepage</Link>
          </div>
        </Route>
      </Switch>
      {/* You might also have a Footer component here later */}
    </Router>
  );
}

export default App;
