import React, { useState, useMemo } from 'react';
import { Search, Filter, Volume2, Sparkles, BookOpen } from 'lucide-react';
import { VocabularyWord, EnglishLevel, VocabularyCategory } from '../types';
import { storageService } from '../services/storageService';
import { speechService } from '../services/speechService';

interface LearnViewProps {
  userId: string;
  onSelectWordToPractice: (wordId: string) => void;
}

export const LearnView: React.FC<LearnViewProps> = ({ userId, onSelectWordToPractice }) => {
  const [search, setSearch] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [playingWordId, setPlayingWordId] = useState<string | null>(null);

  const words = storageService.getVocabulary();
  const progressList = storageService.getUserWordProgress(userId);
  const progressMap = useMemo(() => {
    const map = new Map<string, { status: string; times: number; masteryState?: string; isWeak?: boolean }>();
    progressList.forEach((p) => map.set(p.wordId, { status: p.status, times: p.timesPracticed, masteryState: p.masteryState, isWeak: p.isWeak }));
    return map;
  }, [progressList]);

  const categories: VocabularyCategory[] = [
    'Workplace English',
    'Day-to-Day English',
    'Grammar & Common Usage',
    'Conversations & Social Situations',
    'Travel & Situations',
    'Professional Communication'
  ];

  const levels: EnglishLevel[] = ['Beginner', 'Intermediate', 'Advanced'];

  // Filter words
  const filteredWords = useMemo(() => {
    return words.filter((w) => {
      const matchSearch =
        !search ||
        w.word.toLowerCase().includes(search.toLowerCase()) ||
        w.meaning.toLowerCase().includes(search.toLowerCase());

      const matchLevel = selectedLevel === 'All' || w.level === selectedLevel;
      const matchCat = selectedCategory === 'All' || w.category === selectedCategory;

      return matchSearch && matchLevel && matchCat;
    });
  }, [words, search, selectedLevel, selectedCategory]);

  const handleListen = async (e: React.MouseEvent, word: VocabularyWord) => {
    e.stopPropagation();
    if (playingWordId === word.id) {
      speechService.stopSpeaking();
      setPlayingWordId(null);
      return;
    }
    setPlayingWordId(word.id);
    await speechService.speak(word.word, 0.9);
    await new Promise((r) => setTimeout(r, 200));
    await speechService.speak(word.example1, 0.95);
    setPlayingWordId(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Vocabulary Library
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Explore {words.length} curated vocabulary words across 3 levels and 6 categories.
          </p>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3.5">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-600 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search words, meanings, or examples..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:border-[#0B749C] focus:ring-2 focus:ring-[#0B749C]/20 outline-hidden bg-slate-50/50 focus:bg-white"
          />
        </div>

        {/* Level Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-slate-600 shrink-0 mr-1">Level:</span>
          {['All', ...levels].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 transition-all ${
                selectedLevel === lvl
                  ? 'bg-[#0B749C] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-slate-600 shrink-0 mr-1">Topic:</span>
          {['All', ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 transition-all ${
                selectedCategory === cat
                  ? 'bg-[#1FBAC0] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Vocabulary Results Grid */}
      {filteredWords.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-800">No words found</h4>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search terms or clearing your level/topic filters.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedLevel('All');
              setSelectedCategory('All');
            }}
            className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5">
          {filteredWords.map((word) => {
            const prog = progressMap.get(word.id);
            const isNeedsReview = prog?.masteryState === 'needs_review' || prog?.isWeak;
            const isMastered = prog?.masteryState === 'mastered' || prog?.status === 'mastered';
            const isLearning = prog && prog.times > 0 && !isMastered && !isNeedsReview;

            return (
              <div
                key={word.id}
                className={`bg-white rounded-2xl p-5 sm:p-6 border transition-all flex flex-col justify-between ${
                  isNeedsReview ? 'border-amber-300 shadow-xs' : 'border-slate-200 shadow-xs hover:border-[#1FBAC0]'
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {word.level}
                      </span>
                      <span className="text-[11px] font-medium text-slate-500">
                        {word.partOfSpeech}
                      </span>
                    </div>

                    {/* Practice Status Pill */}
                    {isNeedsReview ? (
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300">
                        Needs Review
                      </span>
                    ) : isMastered ? (
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#9CEE8D]/30 text-[#0B749C] border border-[#61D3AB]/40">
                        Mastered
                      </span>
                    ) : isLearning ? (
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800">
                        Practicing ({prog?.times}x)
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-slate-600">New</span>
                    )}
                  </div>

                  {/* Word title & pronunciation */}
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                        {word.word}
                      </h3>
                      <p className="text-xs font-mono text-slate-600">{word.pronunciation}</p>
                    </div>

                    <button
                      onClick={(e) => handleListen(e, word)}
                      className={`p-2 rounded-xl text-xs font-bold transition-colors ${
                        playingWordId === word.id
                          ? 'bg-[#1FBAC0] text-white ring-2 ring-[#1FBAC0]/30'
                          : 'bg-[#1FBAC0]/15 hover:bg-[#1FBAC0]/25 text-[#0B749C]'
                      }`}
                      title="Listen to pronunciation"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Meaning & Explanation */}
                  <p className="text-xs font-medium text-slate-700 mt-2.5 leading-relaxed">
                    {word.meaning}
                  </p>

                  {/* Sample Sentence preview */}
                  <div className="mt-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-600 italic">
                    &ldquo;{word.example1}&rdquo;
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-600 truncate max-w-[140px]">
                    {word.category}
                  </span>
                  <button
                    onClick={() => onSelectWordToPractice(word.id)}
                    className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-[#0B749C] hover:bg-[#085a79] text-white text-xs font-bold shadow-xs transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#9CEE8D]" />
                    <span>Practice Word</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
