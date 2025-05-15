
import React, { useRef, useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, Plus } from "lucide-react";
import { MathSymbolButton } from './MathSymbolButton';
import { CategoryTab } from './CategoryTab';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';

const categories = [
  "Numbers",
  "Fractions",
  "Letters",
  "Basic Operations",
  "Comparisons",
  "Brackets",
  "Trigonometry",
  "Advanced",
  "Set Theory",
  "Calculus",
  "Greek Letters"
];

// Symbol sets for each category
const numberSymbols = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
const fractionSymbols = ['½', '⅓', '⅔', '¼', '¾', '⅕', '⅖', '⅗', '⅘', '⅙', '⅚', '⅐', '⅛', '⅜', '⅝', '⅞', '⁄'];
const letterSymbols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const operationSymbols = ['+', '-', '×', '÷', '=', '≠', '±'];
const comparisonSymbols = ['<', '>', '≤', '≥', '≈', '∝'];
const bracketSymbols = ['(', ')', '[', ']', '{', '}', '|'];
const trigonometrySymbols = ['sin', 'cos', 'tan', 'csc', 'sec', 'cot', '°', '′', '″'];
const advancedSymbols = ['π', '√', '∛', '∜', '∞', '^', '!', 'Σ', 'Π'];
const setTheorySymbols = ['∈', '∉', '⊂', '⊆', '∪', '∩', '∅', '∀', '∃'];
const calculusSymbols = ['∫', '∂', '′', '″', '∇', 'lim', 'dx', 'dy'];
const greekLetterSymbols = ['α', 'β', 'γ', 'δ', 'ε', 'θ', 'λ', 'μ', 'σ', 'φ', 'Ω'];

export const EquationEditor: React.FC = () => {
  const [activeTab, setActiveTab] = useState("tab-1");
  const [activeCategory, setActiveCategory] = useState("Numbers");
  const [equation, setEquation] = useState("");
  const [tabCount, setTabCount] = useState(1);
  const [textToSpeech, setTextToSpeech] = useState(false);
  const [symbolSize, setSymbolSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Keep cursor visible at the end on input
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      // Place cursor at the end
      textareaRef.current.selectionStart = textareaRef.current.value.length;
      textareaRef.current.selectionEnd = textareaRef.current.value.length;
    }
  }, [equation]);

  const handleSymbolClick = (symbol: string) => {
    setEquation(prev => prev + symbol);
  };

  const addNewTab = () => {
    setTabCount(prev => prev + 1);
    setActiveTab(`tab-${tabCount + 1}`);
    setEquation("");
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
      {/* Tabs section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center border-b pb-2 mb-4">
          <TabsList className="bg-gray-100">
            <TabsTrigger value="tab-1" className="flex items-center gap-1">
              <Pencil size={16} />
              Tab 1
            </TabsTrigger>
            {Array.from({ length: tabCount - 1 }).map((_, i) => (
              <TabsTrigger key={i + 2} value={`tab-${i + 2}`} className="flex items-center gap-1">
                <Pencil size={16} />
                Tab {i + 2}
              </TabsTrigger>
            ))}
          </TabsList>
          <button 
            onClick={addNewTab}
            className="ml-2 flex items-center gap-1 px-3 py-1 rounded-md bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
          >
            <Plus size={16} />
            New Tab
          </button>
        </div>

        {/* Tab contents */}
        {Array.from({ length: tabCount }).map((_, i) => (
          <TabsContent key={i + 1} value={`tab-${i + 1}`}>
            <div className="mb-6">
              <textarea
                ref={i === parseInt(activeTab.split('-')[1]) - 1 ? textareaRef : null}
                value={equation}
                onChange={(e) => setEquation(e.target.value)}
                className="w-full h-40 p-4 border-2 border-dotted border-purple-400 rounded-lg text-xl focus:outline-none focus:border-purple-600"
                placeholder="Write your equation here..."
                style={{ fontSize: `${symbolSize}px` }}
              />
            </div>

            {/* Categories section - changed from horizontal scroll to grid */}
            <div className="mb-6">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2">
                {categories.map((category) => (
                  <CategoryTab 
                    key={category}
                    label={category}
                    active={category === activeCategory}
                    onClick={() => setActiveCategory(category)}
                  />
                ))}
              </div>
            </div>

            {/* Symbols section */}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 mb-8">
              {activeCategory === "Numbers" && numberSymbols.map((symbol) => (
                <MathSymbolButton key={symbol} onClick={() => handleSymbolClick(symbol)}>
                  {symbol}
                </MathSymbolButton>
              ))}
              {activeCategory === "Fractions" && fractionSymbols.map((symbol) => (
                <MathSymbolButton key={symbol} onClick={() => handleSymbolClick(symbol)}>
                  {symbol}
                </MathSymbolButton>
              ))}
              {activeCategory === "Letters" && letterSymbols.map((symbol) => (
                <MathSymbolButton key={symbol} onClick={() => handleSymbolClick(symbol)}>
                  {symbol}
                </MathSymbolButton>
              ))}
              {activeCategory === "Basic Operations" && operationSymbols.map((symbol) => (
                <MathSymbolButton key={symbol} onClick={() => handleSymbolClick(symbol)}>
                  {symbol}
                </MathSymbolButton>
              ))}
              {activeCategory === "Comparisons" && comparisonSymbols.map((symbol) => (
                <MathSymbolButton key={symbol} onClick={() => handleSymbolClick(symbol)}>
                  {symbol}
                </MathSymbolButton>
              ))}
              {activeCategory === "Brackets" && bracketSymbols.map((symbol) => (
                <MathSymbolButton key={symbol} onClick={() => handleSymbolClick(symbol)}>
                  {symbol}
                </MathSymbolButton>
              ))}
              {activeCategory === "Trigonometry" && trigonometrySymbols.map((symbol) => (
                <MathSymbolButton key={symbol} onClick={() => handleSymbolClick(symbol)}>
                  {symbol}
                </MathSymbolButton>
              ))}
              {activeCategory === "Advanced" && advancedSymbols.map((symbol) => (
                <MathSymbolButton key={symbol} onClick={() => handleSymbolClick(symbol)}>
                  {symbol}
                </MathSymbolButton>
              ))}
              {activeCategory === "Set Theory" && setTheorySymbols.map((symbol) => (
                <MathSymbolButton key={symbol} onClick={() => handleSymbolClick(symbol)}>
                  {symbol}
                </MathSymbolButton>
              ))}
              {activeCategory === "Calculus" && calculusSymbols.map((symbol) => (
                <MathSymbolButton key={symbol} onClick={() => handleSymbolClick(symbol)}>
                  {symbol}
                </MathSymbolButton>
              ))}
              {activeCategory === "Greek Letters" && greekLetterSymbols.map((symbol) => (
                <MathSymbolButton key={symbol} onClick={() => handleSymbolClick(symbol)}>
                  {symbol}
                </MathSymbolButton>
              ))}
            </div>

            {/* Accessibility Settings */}
            <div className="border-t pt-4 mt-6">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Accessibility Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Text-to-Speech</span>
                  <Switch 
                    checked={textToSpeech} 
                    onCheckedChange={setTextToSpeech} 
                  />
                </div>
                
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Symbol Size</span>
                    <span className="text-sm font-medium">{symbolSize}px</span>
                  </div>
                  <Slider 
                    value={[symbolSize]}
                    min={12}
                    max={32}
                    step={1}
                    onValueChange={(value) => setSymbolSize(value[0])}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">High Contrast</span>
                  <Switch 
                    checked={highContrast} 
                    onCheckedChange={setHighContrast} 
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
