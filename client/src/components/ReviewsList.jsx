// src/components/ReviewsList.jsx
import React from 'react';
import '../styles/ReviewsList.css'; // Import the CSS for styling

const StarRating = () => (
  <span className="star-rating">
    ★★★★<span className="half-star">★</span> 
  </span>
);


const ActionIcons = () => (
    <div className="action-icons">
        {/* Placeholder SVG for heart icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
        </svg>
         {/* Placeholder SVG for comment icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/>
        </svg>
    </div>
);


function ReviewsList({ reviews }) {
  console.log('ReviewsList rendering with reviews:', reviews); //debug

  if (!Array.isArray(reviews)) {
    return <div className="reviews-list-container"><h3 className="reviews-header">Reviews:</h3><p>Waiting for reviews...</p></div>;
  }

  return (
    <div className="reviews-list-container">
      <h3 className="reviews-header">Reviews:</h3>
      {reviews.length === 0 && <p className="no-reviews-text">No reviews revealed yet...</p>}
      {reviews.map((reviewText, index) => (
        <div key={index} className="review-card">
          <div className="review-header">
            {/* Placeholder Profile Picture */}
            <img
              src={`https://placehold.co/40x40/EFEFEF/AAAAAA?text=PFP`} // Simple placeholder image
              alt="User profile placeholder"
              className="profile-pic"
              onError={(e) => e.target.style.display='none'} // Hide if placeholder fails
            />
            <div className="review-meta">
              <span className="username">Reviewer #{index + 1}</span> {/* Placeholder username */}
              <StarRating />
            </div>
          </div>
          <blockquote className="review-text">
            "{reviewText}"
          </blockquote>
          <div className="review-footer">
             <ActionIcons />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReviewsList;
