import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

export default function Landing() {
  return (
    <section className="landing-section">
      <p>
        This is a blog app that has "Lauire" as the owner of the site and is the
        only user able to make new posts, upload images, and delete posts. Other
        users can leave comments on posts and delete comments that belong to
        them.
      </p>
      <div className="login-creds">
        <ul>To login as owner of the site
          <li>Username: Laurie</li>
          <li>Password: Password123</li>
        </ul>
      </div>
      <Link to={'/dashboard'}>
        <button>Continue to site!</button>
      </Link>
    </section>
  );
}