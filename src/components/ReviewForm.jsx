import { useState } from 'react'
import emailjs from '@emailjs/browser'

function ReviewForm({ onClose }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [rating, setRating] = useState(0)

    function handleSubmit(e) {
        e.preventDefault()

        if (rating === 0) {
            alert('Please selct a star rating')
            return
        }

        emailjs
            .send(
                'service_7e9bo5t',
                'template_g7a2zrs',
                {
                    from_name: name,
                    from_email: email,
                    message: message,
                    rating: rating,
                },
                'IFjBK1oaRmHOZ15hl'
            )
            .then(() => {
                alert('Thanks for your review!')
                onClose()
            })
            .catch((error) => {
                console.log('Failed to send:', error)
                alert('something went wrong. Please try again.')
            })
    }

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="review-form" onClick={(e) => e.stopPropagation()}>
                <h2>Leave a Review</h2>

                <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={star <= rating ? 'star filled' : 'star'}
                            onClick={() => setRating(star)}
                        >
                            ★
                        </span>
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Your Review"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                    <button type="submit">Submit Review</button>
                </form>
            </div>
        </div>
    )
}

export default ReviewForm