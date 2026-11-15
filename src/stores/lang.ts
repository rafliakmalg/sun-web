import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Messages = Record<string, string>

type LangState = {
  messages: Messages
  setMessages: (messages: Messages) => void
}

export const useLang = create<LangState>()(
  persist(
    (set) => ({
      messages: {},
      setMessages: (messages) => set({ messages }),
    }),
    { name: 'lang' },
  ),
)
