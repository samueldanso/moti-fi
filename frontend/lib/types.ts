export interface SystemEvent {
  id: string
  message: string
  timestamp: string
}

export interface Message {
  role: "user" | "assistant"
  content: string
}
