import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI('AIzaSyDJ_1NN0wod4DMW1kpx3Bnn7O5bKdJsaDw');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

interface ChatBotProps {
  onClose: () => void;
}

interface Message {
  text: string;
  isUser: boolean;
}

const ChatBot: React.FC<ChatBotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: "Hello! I'm your BLOODL1NK assistant. I can help you with blood donation, finding blood donors, and answering questions about blood types and donation eligibility. How can I assist you today?",
      isUser: false 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);

    try {
      // Prepare context for the AI
      const prompt = `You are a helpful assistant for BLOODL1NK, a blood bank system. You help users with blood donation, finding donors, and answering questions about blood types and donation eligibility. 
      
      Current conversation:
      ${messages.map(m => `${m.isUser ? 'User' : 'Assistant'}: ${m.text}`).join('\n')}
      
      User: ${userMessage}
      
      Provide a helpful, accurate, and concise response. Focus on blood donation related information.`;

      // Get response from Gemini
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Add AI response
      setMessages(prev => [...prev, { text, isUser: false }]);
    } catch (error) {
      console.error('Error getting response from Gemini:', error);
      setMessages(prev => [...prev, { 
        text: "I apologize, but I'm having trouble connecting to the AI service. Please try again later.", 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-8 w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col">
      <div className="p-4 bg-red-600 text-white rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold">BLOODL1NK Assistant</h3>
        <button onClick={onClose} className="hover:bg-red-700 p-1 rounded">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`${
              msg.isUser ? 'ml-auto bg-red-600 text-white' : 'mr-auto bg-gray-100 text-gray-800'
            } p-3 rounded-lg max-w-[80%]`}
          >
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="mr-auto bg-gray-100 text-gray-800 p-3 rounded-lg">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-red-600"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            className={`p-2 ${
              isLoading ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'
            } text-white rounded-lg transition-colors`}
            disabled={isLoading}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;