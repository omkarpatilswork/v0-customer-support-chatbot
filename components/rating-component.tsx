"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useChat } from "@/context/chat-context"

export default function RatingComponent() {
  const { rating, setRating, closeChat } = useChat()
  const [hoverRating, setHoverRating] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleRatingClick = (value: number) => {
    setRating(value)
  }

  const handleSubmit = () => {
    if (rating) {
      setSubmitted(true)
      // In a real app, you would send this rating to your backend
      console.log(`Rating submitted: ${rating}`)

      // Close chat after a delay
      setTimeout(() => {
        closeChat()
      }, 3000)
    }
  }

  if (submitted) {
    return (
      <div className="bg-slate-50 p-4 rounded-lg text-center">
        <p className="font-medium text-green-600 mb-2">Thank you for your feedback!</p>
        <p className="text-sm text-slate-600">Your rating helps us improve our service.</p>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 p-4 rounded-lg">
      <p className="text-center font-medium mb-4">How would you rate your experience?</p>

      <div className="flex justify-center space-x-2 mb-4">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            className="focus:outline-none"
            onMouseEnter={() => setHoverRating(value)}
            onMouseLeave={() => setHoverRating(null)}
            onClick={() => handleRatingClick(value)}
          >
            <Star
              className={`h-8 w-8 ${
                (hoverRating !== null ? value <= hoverRating : value <= (rating || 0))
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-slate-300"
              } transition-colors`}
            />
          </button>
        ))}
      </div>

      <div className="text-center">
        <Button onClick={handleSubmit} disabled={!rating} className="w-full">
          Submit Feedback
        </Button>
      </div>
    </div>
  )
}
