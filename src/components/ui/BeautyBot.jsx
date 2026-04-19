"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Headset,
  Sparkles,
} from "lucide-react";
import "./BeautyBot.css";

const BeautyBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("ai"); // 'ai' or 'human'
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Bonjour ! Je suis l'assistant IA Hilytouch. Je suis là pour vous conseiller sur le meilleur du Made in Algeria. Comment puis-je vous aider aujourd'hui ?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setIsTyping(true);

    // Connect to actual API
    try {
      if (mode === "human") {
        setTimeout(() => {
          setMessages((prev) => [...prev, { sender: "bot", text: "Un conseiller humain (Imene) rejoint la discussion... Bonjour ! Je prends le relais pour répondre à votre demande spécifique." }]);
          setIsTyping(false);
        }, 1500);
      } else {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage })
        });
        
        const data = await response.json();
        if (data.response) {
          setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
        } else {
          setMessages((prev) => [...prev, { sender: "bot", text: "Désolé, je rencontre une erreur de connexion." }]);
        }
        setIsTyping(false);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Erreur réseau." }]);
      setIsTyping(false);
    }
  };

  const toggleMode = () => {
    if (mode === "ai") {
      setMode("human");
      setMessages((prev) => [
        ...prev,
        {
          sender: "system",
          text: "Transfert vers une des cofondatrices en cours...",
        },
      ]);
    } else {
      setMode("ai");
      setMessages((prev) => [
        ...prev,
        { sender: "system", text: "Retour au mode Assistant IA." },
      ]);
    }
  };

  return (
    <div className="beauty-bot-container">
      {/* Chat Button (Fixed bottom right) */}
      <button
        className={`bot-trigger ${isOpen ? "hidden" : ""}`}
        onClick={() => setIsOpen(true)}
      >
        <Sparkles size={20} className="sparkle-icon" />
        <span className="bot-trigger-text">Assistant IA</span>
      </button>

      {/* Chat Window */}
      <div className={`chat-window ${isOpen ? "open" : ""}`}>
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="bot-avatar">
              {mode === "ai" ? <Bot size={22} /> : <Headset size={22} />}
            </div>
            <div>
              <h3>{mode === "ai" ? "Hilytouch IA" : "Support Humain"}</h3>
              <p className="status">Conseiller en ligne</p>
            </div>
          </div>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message-wrapper ${msg.sender}`}>
              {msg.sender === "system" ? (
                <div className="system-message">{msg.text}</div>
              ) : (
                <div className="message-bubble">{msg.text}</div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="message-wrapper bot">
              <div className="message-bubble typing-dots">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-controls">
          <button
            className="switch-mode-btn"
            onClick={toggleMode}
            type="button"
          >
            {mode === "ai" ? (
              <>
                <Headset size={14} /> Parler à une cofondatrice
              </>
            ) : (
              <>
                <Bot size={14} /> Retourner à l'IA
              </>
            )}
          </button>
        </div>

        <form className="chat-input-area" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Posez votre question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" disabled={!input.trim() || isTyping}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default BeautyBot;
