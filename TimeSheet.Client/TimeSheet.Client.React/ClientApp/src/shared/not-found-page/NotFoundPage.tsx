import React from "react";
import "./not-found-page.scss";

export const NotFoundPage = () => {

  return (
    <div id="NotFoundPage-notFound">
      <div className="NotFoundPage-notFound">
        <div className="NotFoundPage-notFound-404">
          <h1>oops</h1>
        </div>
        <h2>page not found</h2>
        <p>
          The page you are looking for might have been removed had its name changed or is
          temporarily unavailable.
        </p>
        <a href="/">Goto Homepage</a>
      </div>
    </div>
  );
};