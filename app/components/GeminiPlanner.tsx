'use client';
import React, { useState } from 'react';
import { Sparkles, Loader2, PartyPopper, Mic2, Utensils } from 'lucide-react';

const GeminiPlanner = () => {
  const [activeTab, setActiveTab] = useState('theme'); // 'theme', 'speech', 'menu'
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const tools = {
    theme: {
      title: "Event Theme Generator",
      icon: <PartyPopper className="w-5 h-5" />,
      placeholder: "e.g., A 1920s vintage gala for 200 guests...",
      promptPrefix: "You are a world-class event planner. Create a detailed, luxurious event theme concept including color palette, decor ideas, and dress code for: ",
      buttonText: "Design Theme ✨"
    },
    speech: {
      title: "Host Script Writer",
      icon: <Mic2 className="w-5 h-5" />,
      placeholder: "e.g., Opening speech for a charity film festival...",
      promptPrefix: "You are a charismatic award show host. Write a short, engaging, and witty opening speech for: ",
      buttonText: "Draft Speech ✨"
    },
    menu: {
      title: "Gala Menu Curator",
      icon: <Utensils className="w-5 h-5" />,
      placeholder: "e.g., A 3-course vegan dinner for a summer premiere...",
      promptPrefix: "You are a Michelin-star chef. Create a sophisticated 3-course gala dinner menu with fancy names and descriptions for: ",
      buttonText: "Curate Menu ✨"
    }
  };

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setError('');
    setResult('');

    try {
      const apiKey = ""; // Set by runtime environment
      const fullPrompt = tools[activeTab].promptPrefix + input;
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: fullPrompt }] }],
          }),
        }
      );

      if (!response.ok) throw new Error('Failed to fetch from Gemini API');

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (generatedText) {
        setResult(generatedText);
      } else {
        throw new Error('No content generated');
      }
    } catch (err) {
      setError('The AI is backstage preparing. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl px-6 py-16 md:py-24" id="ai-planner">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-2 mb-4 bg-gradient-to-r from-yellow-900/20 to-black rounded-full border border-yellow-700/30">
          <Sparkles className="w-4 h-4 text-yellow-500 mr-2" />
          <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest">Powered by Gemini AI</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-sans font-bold text-white uppercase mb-4">
          Red Carpet <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600">Planner</span>
        </h2>
        <p className="text-gray-400 font-sans italic">
          Let our AI architect design your next blockbuster event.
        </p>
      </div>

      {/* Tool Interface */}
      <div className="bg-neutral-900/50 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm shadow-2xl">
        
        {/* Tabs */}
        <div className="flex border-b border-white/10 overflow-x-auto">
          {Object.entries(tools).map(([key, tool]) => (
            <button
              key={key}
              onClick={() => { setActiveTab(key); setResult(''); setInput(''); setError(''); }}
              className={`flex-1 flex items-center justify-center py-4 px-6 min-w-[140px] transition-all duration-300 font-sans uppercase tracking-wider text-sm ${
                activeTab === key 
                  ? 'bg-yellow-600/10 text-yellow-400 border-b-2 border-yellow-500' 
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="mr-2">{tool.icon}</span>
              {tool.title}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-6 md:p-10 grid md:grid-cols-2 gap-8">
          
          <div className="flex flex-col space-y-4">
             <label className="text-white font-sans uppercase tracking-wide text-sm flex items-center">
               Describe your request
               <span className="ml-2 text-xs text-gray-500 normal-case font-sans">(Be as specific as you like)</span>
             </label>
             <textarea
               className="w-full h-40 bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all resize-none placeholder-gray-600 font-sans"
               placeholder={tools[activeTab].placeholder}
               value={input}
               onChange={(e) => setInput(e.target.value)}
             />
             <button
              onClick={handleGenerate}
              disabled={loading || !input.trim()}
              className="group relative w-full py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 text-black font-sans font-bold text-lg uppercase tracking-widest rounded-lg overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all"
             >
               <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12"></div>
               <span className="relative flex items-center justify-center">
                 {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                 {loading ? 'Designing...' : tools[activeTab].buttonText}
               </span>
             </button>
             {error && <p className="text-red-400 text-sm mt-2 font-sans">{error}</p>}
          </div>

          {/* Result Area */}
          <div className="relative min-h-[300px] bg-black rounded-xl border border-white/10 p-6 md:p-8 flex flex-col">
            <div className="absolute top-0 right-0 p-2">
               <div className="flex space-x-1">
                 <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                 <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                 <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
               </div>
            </div>

            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-500 space-y-4">
                <Sparkles className="w-8 h-8 text-yellow-500/50 animate-bounce" />
                <p className="font-sans tracking-widest animate-pulse">Consulting the Stars...</p>
              </div>
            ) : result ? (
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                 <h4 className="text-yellow-500 font-sans uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
                   The Vision
                 </h4>
                 <div className="prose prose-invert prose-sm max-w-none font-sans text-gray-300 leading-relaxed whitespace-pre-wrap">
                   {result}
                 </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-700 opacity-50">
                 <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-700 flex items-center justify-center mb-4">
                   {tools[activeTab].icon}
                 </div>
                 <p className="font-sans uppercase tracking-widest text-sm">Your masterpiece awaits</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default GeminiPlanner;