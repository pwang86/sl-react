import React from "react";
import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="hero">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h3 className="title">Not Found, 404 :(</h3>
          <p>
            <NavLink to="/">Back to Login</NavLink>
          </p>
        </div>
      </div>
    </section>
  );
}
