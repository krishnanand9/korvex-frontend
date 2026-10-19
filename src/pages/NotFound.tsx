import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Terminal, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="not-found-page-view">
      <div className="not-found-card">
        <div className="not-found-icon-box">
          <Compass size={44} />
        </div>
        <span className="not-found-code">404 :: ROUTE_NOT_FOUND</span>
        <h1>Page Does Not Exist</h1>
        <p>
          The resource or route you requested could not be resolved on our edge gateway.
          It may have been relocated or updated.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="btn">
            <ArrowLeft size={16} /> Return to Homepage
          </Link>
          <Link to="/portfolio" className="btn ghost">
            Explore Portfolio
          </Link>
          <Link to="/contact" className="btn ghost">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
