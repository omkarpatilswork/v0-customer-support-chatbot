"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Send } from "lucide-react"
import { useChat } from "@/context/chat-context"
import ChatMessage from "@/components/chat-message"
import RatingComponent from "@/components/rating-component"

export default function ChatInterface() {
  const { closeChat, messages, sendMessage, agent, selectedCategory, showRating } = useChat()

  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue, true)
      setInputValue("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Get category title
  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case "appointment":
        return "Appointment Related Support"
      case "lab":
        return "Lab Test Related Support"
      case "payment":
        return "Payment and Other Support"
      default:
        return "Health Saathi Support"
    }
  }

  return (
    <Card className="fixed bottom-4 right-4 w-full max-w-md h-[600px] shadow-xl flex flex-col">
      <CardHeader className="border-b bg-slate-50 flex flex-row items-center justify-between p-4">
        <div>
          <h3 className="font-semibold">{getCategoryTitle()}</h3>
          <p className="text-sm text-muted-foreground">
            {agent === "ai" ? "AI Assistant" : "Senior Healthcare Consultant"}
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={closeChat}>
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {showRating && <RatingComponent />}

        <div ref={messagesEndRef} />
      </CardContent>

      <CardFooter className="border-t p-4">
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={showRating}
          />
          <Button size="icon" onClick={handleSendMessage} disabled={!inputValue.trim() || showRating}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
