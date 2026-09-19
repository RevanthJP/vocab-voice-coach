import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen, Info, AlertTriangle, HelpCircle, Gauge } from 'lucide-react';
import { VocabularyWord } from '../types';
import { speechService } from '../services/speechService';

interface WordCardProps {
  word: VocabularyWord;
  onStartPractice?: () => void;
  showPracticeButton?: boolean;
}

export const WordCard: React.FC<WordCardProps> = ({
  word,
  onStartPractice,
  showPracticeButton = false
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.95);

  const handleListen = async (e?: React.MouseEvent, customSpeed?: number) => {
    if (e) e.stopPropagation();
    if (isPlayingAudio) {
      speechService.stopSpeaking();
      setIsPlayingAudio(false);
      return;
    }

    const rate = customSpeed ?? playbackSpeed;
    setIsPlayingAudio(true);
    // Speak word first with slight pause, then first example
    await speechService.speak(word.word, rate * 0.95);
    await new Promise((r) => setTimeout(r, 350));
    await speechService.speak(word.example1, rate);
    setIsPlayingAudio(false);
  };

  const levelColorMap: Record<string, string> = {
    Beginner: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Intermediate: 'bg-sky-100 text-sky-800 border-sky-200',
    Advanced: 'bg-indigo-100 text-indigo-800 border-indigo-200'
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-4">
      {/* Top Meta Badges */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
              levelColorMap[word.level] || 'bg-slate-100 text-slate-700'
            }`}
          >
            {word.level}
          </span>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            {word.partOfSpeech}
          </span>
        </div>

        <span className="text-[11px] font-medium text-[#0B749C] bg-[#0B749C]/10 px-2.5 py-0.5 rounded-md">
          {word.category}
        </span>
      </div>

      {/* Word and Audio Pronunciation */}
      <div className="flex items-start justify-between gap-4 pt-1">
        <div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {word.word}
          </h3>
          <p className="text-xs sm:text-sm font-mono text-slate-500 mt-0.5">
            {word.pronunciation}
          </p>
        </div>

        {/* Listen Controls: Normal vs Slower Speed */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={(e) => handleListen(e, 0.75)}
            className="flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title="Hear slowed down pronunciation (0.75x speed)"
          >
            <Gauge className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">Slow</span>
            <span>0.75x</span>
          </button>

          <button
            onClick={(e) => handleListen(e, 0.95)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
              isPlayingAudio
                ? 'bg-[#1FBAC0] text-white ring-4 ring-[#1FBAC0]/25'
                : 'bg-[#1FBAC0]/15 hover:bg-[#1FBAC0]/25 text-[#0B749C]'
            }`}
            title="Hear authentic pronunciation & example"
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-4 h-4 animate-bounce" />
                <span>Playing...</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-[#0B749C]" />
                <span>Listen</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Meaning & Simple explanation */}
      <div className="pt-2 border-t border-slate-100">
        <p className="text-sm font-semibold text-slate-800 leading-relaxed">
          {word.meaning}
        </p>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          {word.simpleExplanation}
        </p>
      </div>

      {/* When to Use Guidance */}
      {word.whenToUse && (
        <div className="bg-sky-50/70 rounded-xl p-3.5 border border-sky-200/70 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-sky-900 mb-1">
            <HelpCircle className="w-3.5 h-3.5 text-[#0B749C]" />
            <span>When & How to Use</span>
          </div>
          <p className="text-sky-800 leading-relaxed pl-5">
            {word.whenToUse}
          </p>
        </div>
      )}

      {/* Example Sentences */}
      <div className="space-y-2 bg-slate-50/80 rounded-xl p-3.5 border border-slate-100">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
          <BookOpen className="w-3.5 h-3.5 text-[#0B749C]" />
          <span>Natural Example Usages</span>
        </div>
        <p className="text-xs text-slate-700 italic pl-2 border-l-2 border-[#1FBAC0]">
          &ldquo;{word.example1}&rdquo;
        </p>
        <p className="text-xs text-slate-700 italic pl-2 border-l-2 border-[#61D3AB]">
          &ldquo;{word.example2}&rdquo;
        </p>
      </div>

      {/* Common Mistakes & Pitfalls */}
      {word.commonMistakes && word.commonMistakes.length > 0 && (
        <div className="bg-amber-50/60 rounded-xl p-3.5 border border-amber-200/70 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Common Pitfalls to Avoid</span>
          </div>
          <ul className="space-y-1 pl-5 list-disc text-amber-900">
            {word.commonMistakes.map((mistake, idx) => (
              <li key={idx} className="leading-relaxed">
                {mistake}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Usage Notes if available */}
      {word.commonUsageNotes && !word.whenToUse && (
        <div className="flex items-start gap-1.5 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
          <Info className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
          <span>{word.commonUsageNotes}</span>
        </div>
      )}

      {/* Related words */}
      {word.relatedWords && word.relatedWords.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <span className="text-[11px] font-medium text-slate-600">Synonyms:</span>
          {word.relatedWords.map((rw, i) => (
            <span
              key={i}
              className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
            >
              {rw}
            </span>
          ))}
        </div>
      )}

      {/* Practice CTA */}
      {showPracticeButton && onStartPractice && (
        <div className="pt-2 border-t border-slate-100">
          <button
            onClick={onStartPractice}
            className="w-full py-2.5 px-4 rounded-xl bg-[#0B749C] hover:bg-[#085a79] text-white text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#9CEE8D]" />
            <span>Practice This Word With Voice</span>
          </button>
        </div>
      )}
    </div>
  );
};
