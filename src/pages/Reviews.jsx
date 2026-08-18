import {useState } from'react'
import ReviewForm from '../components/ReviewForm'
import '../App.css'

function Reviews() {
    const [showReviewForm, setShowReviewForm] = useState(false)

    return (<div className="app">
        <h1>Reviews</h1>
        <p>See what others think of the app, or leave your own review.</p>

        <button className="review-toggle-btn" onClick={() => setShowReviewForm(true)}>
            Leave a Review
        </button>

        {showReviewForm && (
            <ReviewForm onClose={() => setShowReviewForm(false)} />
        )}
    </div>
    )
}

export default Reviews