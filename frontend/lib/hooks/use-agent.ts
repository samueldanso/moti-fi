import { create } from "zustand";
import type { Message } from "@/lib/types";

interface AgentState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
}

const AGENT_URL = process.env.NEXT_PUBLIC_AGENT_URL || "http://localhost:3001";

export const useAgent = create<AgentState>((set) => ({
  messages: [],
  isLoading: false,
  error: null,
  sendMessage: async (content: string) => {
    try {
      set({ isLoading: true });
      const res = await fetch(`${AGENT_URL}/api`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      set((state) => ({
        messages: [
          ...state.messages,
          { role: "user", content },
          { role: "assistant", content: data.content },
        ],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
