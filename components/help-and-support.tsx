"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Calendar, TestTube, CreditCard } from "lucide-react"
import { useChat } from "@/context/chat-context"
import ChatInterface from "@/components/chat-interface"

export default function HelpAndSupport() {
  const { openChat, isOpen } = useChat()
  const [isAppointmentExpanded, setIsAppointmentExpanded] = useState(true)

  const toggleAppointmentInfo = () => {
    setIsAppointmentExpanded(!isAppointmentExpanded)
  }

  return (
    <div className="space-y-6">
      {/* Appointment Info */}
      <Card>
        <CardHeader className="pb-3 cursor-pointer" onClick={toggleAppointmentInfo}>
          <div className="flex justify-between items-center">
            <CardTitle>Appointment Information</CardTitle>
            {isAppointmentExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </CardHeader>
        {isAppointmentExpanded && (
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lab:</span>
                <span className="font-medium">Ruby Hall Labs, Pune</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <span className="font-medium">Lab Visit</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-medium text-amber-600">Initiated</span>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Help Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CategoryCard
          title="Appointment Related Queries"
          description="Questions about scheduling, rescheduling, or cancellation"
          icon={<Calendar className="h-8 w-8 text-blue-500" />}
          onClick={() => openChat("appointment")}
        />

        <CategoryCard
          title="Lab Test Related Queries"
          description="Questions about test procedures, preparations, or results"
          icon={<TestTube className="h-8 w-8 text-green-500" />}
          onClick={() => openChat("lab")}
        />

        <CategoryCard
          title="Payment and Other Queries"
          description="Questions about billing, payment methods, or other issues"
          icon={<CreditCard className="h-8 w-8 text-purple-500" />}
          onClick={() => openChat("payment")}
        />
      </div>

      {/* Chat Interface */}
      {isOpen && <ChatInterface />}
    </div>
  )
}

interface CategoryCardProps {
  title: string
  description: string
  icon: React.ReactNode
  onClick: () => void
}

function CategoryCard({ title, description, icon, onClick }: CategoryCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
        <div className="p-3 rounded-full bg-slate-100">{icon}</div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <Button onClick={onClick} className="mt-2 w-full">
          Chat With Us
        </Button>
      </CardContent>
    </Card>
  )
}
