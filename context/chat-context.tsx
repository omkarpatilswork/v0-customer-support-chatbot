"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Agent = "ai" | "human" | null
type Category = "appointment" | "lab" | "payment" | null

interface ChatContextType {
  isOpen: boolean
  agent: Agent
  messageCount: number
  messages: Message[]
  selectedCategory: Category
  showRating: boolean
  rating: number | null
  openChat: (category: Category) => void
  closeChat: () => void
  sendMessage: (content: string, isUser: boolean) => void
  escalateToHuman: () => void
  setRating: (value: number) => void
}

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [agent, setAgent] = useState<Agent>(null)
  const [messageCount, setMessageCount] = useState(0)
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category>(null)
  const [showRating, setShowRating] = useState(false)
  const [rating, setRating] = useState<number | null>(null)

  const openChat = (category: Category) => {
    setIsOpen(true)
    setAgent("ai")
    setSelectedCategory(category)
    setMessages([
      {
        id: "1",
        content: "Our executive is joining… Kindly detail your concern so they can help you better.",
        isUser: false,
        timestamp: new Date(),
      },
    ])
  }

  const closeChat = () => {
    setIsOpen(false)
    setAgent(null)
    setMessageCount(0)
    setMessages([])
    setSelectedCategory(null)
    setShowRating(false)
    setRating(null)
  }

  const sendMessage = (content: string, isUser: boolean) => {
    const newMessage = {
      id: Date.now().toString(),
      content,
      isUser,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])

    if (isUser) {
      setMessageCount((prev) => prev + 1)

      // Check if we need to escalate after user sends a message
      if (messageCount >= 4) {
        // This will be the 5th message
        setTimeout(() => {
          escalateToHuman()
        }, 1000)
      } else {
        // Simulate AI response
        setTimeout(() => {
          const aiResponses = [
            "I understand your concern. Let me help you with that.",
            "Thank you for providing that information. Is there anything else you'd like to know?",
            "I'm checking our records for more details on your query.",
            "Based on your appointment details, I can see that your lab visit is scheduled at Ruby Hall Labs, Pune.",
            "If you're satisfied with the resolution, please rate your experience.",
          ]

          sendMessage(aiResponses[messageCount], false)

          // Show rating after 5th exchange
          if (messageCount === 4) {
            setTimeout(() => {
              sendMessage("If I helped you to resolve your query, please give me a rating!", false)
              setShowRating(true)
            }, 1000)
          }
        }, 1000)
      }
    }
  }

  const escalateToHuman = () => {
    setAgent("human")
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        content:
          "Sorry to see we were unable to resolve your query, please wait we are escalating your issue to a senior agent.",
        isUser: false,
        timestamp: new Date(),
      },
    ])

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: "Senior Agent is joining...",
          isUser: false,
          timestamp: new Date(),
        },
      ])

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            content:
              "Hello, I'm Dr. Sharma, a senior healthcare consultant. I've reviewed your conversation and I'm here to help resolve your issue. Could you please confirm what specific concerns you have about your lab appointment?",
            isUser: false,
            timestamp: new Date(),
          },
        ])
      }, 2000)
    }, 1500)
  }

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        agent,
        messageCount,
        messages,
        selectedCategory,
        showRating,
        rating,
        openChat,
        closeChat,
        sendMessage,
        escalateToHuman,
        setRating,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}
