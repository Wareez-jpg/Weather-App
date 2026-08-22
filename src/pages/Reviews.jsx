import {useState, useEffect } from'react'
import ReviewForm from '../components/ReviewForm'
import { db } from '../firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import '../App.css'

function Reviews() {
    const [showReviewForm, setShowReviewForm] = useState(false)
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        async function loadReviews() {
            const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'))
            const snapshot = await getDocs(q)
            const reviewsData = snapshot.docs.map((doc) => doc.data())
            setReviews(reviewsData)
        }

        loadReviews()
    }, [])

    return (<div className="app">
        <h1>Reviews</h1>
        <p>See what others think of the app, or leave your own review.</p>

        <button className="review-toggle-btn" onClick={() => setShowReviewForm(true)}>
            Leave a Review
        </button>

        {showReviewForm && (
            <ReviewForm onClose={() => setShowReviewForm(false)} />
        )}
        
        <div className="reviews-list">
            {reviews.map((review, index) => (
                <div key={index} className="review-card">
                    <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={star <= review.rating ? 'star filled' : 'star'}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <p className="review-message">{review.message}</p>
                    <p className="review-name">- {review.name}</p>
                </div>
            ))}
        </div>
    </div>
    )
}

export default Reviews