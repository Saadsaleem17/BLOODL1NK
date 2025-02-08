import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hey, how can I help you?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate bot response (replace with actual API call)
    setTimeout(() => {
      const botResponse: Message = {
        text: "I'm a demo bot. In production, I would connect to an AI service to provide real responses about blood donation.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const toggleChat = () => {
    if (!isOpen) {
      setIsMinimized(false);
    }
    setIsOpen(!isOpen);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="fixed bottom-8 left-8 z-50">
      {/* Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className="bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg flex items-center justify-center transition-all duration-200 ease-in-out"
      >
        <Bot className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              height: isMinimized ? 'auto' : '500px'
            }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-20 left-0 w-96 bg-white rounded-lg shadow-xl overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-red-600 text-white p-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Bot className="h-6 w-6" />
                <span className="font-medium">BLOODL1NK Assistant</span>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={toggleMinimize}
                  className="hover:bg-red-700 rounded p-1"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </button>
                <button 
                  onClick={toggleChat}
                  className="hover:bg-red-700 rounded p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Chat Messages */}
                <div className="h-96 overflow-y-auto p-4 space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.isBot
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-red-600 text-white'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <button
                      type="submit"
                      className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}