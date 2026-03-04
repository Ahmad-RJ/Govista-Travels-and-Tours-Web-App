import { Layout } from "@/components/layout";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface Message {
  role: any;
  content: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm your GoVista travel assistant. Looking for destination ideas or need help planning a trip? Ask me anything!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Scroll to top only on initial render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Auto-scroll the messages container to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]') as HTMLDivElement;
      if (scrollContainer) {
        setTimeout(() => {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }, 0);
      }
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;

    const newMessages = [
      ...messages,
      { role: "user", content: userMsg },
    ];

    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("http://localhost:3000/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          history: newMessages,
        })
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    }

    setIsTyping(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold text-primary mb-2 flex items-center justify-center gap-3">
            <Bot className="h-10 w-10 text-secondary" /> AI Travel Assistant
          </h1>
          <p className="text-muted-foreground">Get personalized recommendations and travel tips instantly.</p>
        </div>

        <Card className="w-full max-w-2xl h-[600px] flex flex-col border-none shadow-2xl overflow-hidden">
          <div className="bg-primary p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="font-medium">Online</span>
            </div>
          </div>

          <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 bg-slate-50">
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`
                    max-w-[80%] p-4 rounded-2xl shadow-sm
                    ${msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-white text-foreground border border-border rounded-bl-none"
                    }
                  `}>
                    <div className="flex items-center gap-2 mb-1 opacity-70 text-xs">
                      {msg.role === "user" ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                      <span>{msg.role === "user" ? "You" : "GoVista AI"}</span>
                    </div>
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-border shadow-sm flex gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          <div className="p-4 bg-white border-t border-border">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border-muted bg-slate-50 focus:bg-white transition-colors"
              />
              <Button type="submit" size="icon" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 cursor-pointer">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </Card>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
          {["Best food in Lahore?", "Romantic spots in Murree", "Family trip to Naran Kaghan"].map((suggestion) => (
            <Button
              key={suggestion}
              variant="outline"
              className="text-xs h-auto py-2 text-muted-foreground hover:text-primary hover:border-primary transition-colors cursor-pointer"
              onClick={() => { setInput(suggestion); }}
            >
              <Sparkles className="h-3 w-3 mr-2 text-secondary" />
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
    </Layout>
  );
}
