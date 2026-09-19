import React, { useState } from 'react';
import { EnglishLevel, TargetImprovementArea } from '../types';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

interface OnboardingModalProps {
  initialLevel?: EnglishLevel;
  initialImprovement?: TargetImprovementArea;
  onSave: (level: EnglishLevel, improvement: TargetImprovementArea) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  initialLevel = 'Beginner',
  initialImprovement = 'Workplace English',
  onSave
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [level, setLevel] = useState<EnglishLevel>(initialLevel);
  const [improvement, setImprovement] = useState<TargetImprovementArea>(initialImprovement);

  const levels: { id: EnglishLevel; title: string; desc: string }[] = [
    {
      id: 'Beginner',
      title: 'Beginner (A1–A2)',
      desc: 'Building basic vocabulary, everyday greetings, and essential expressions.'
    },
    {
      id: 'Intermediate',
      title: 'Intermediate (B1–B2)',
      desc: 'Comfortable with basics, aiming for smoother workplace communication and fluency.'
    },
    {
      id: 'Advanced',
      title: 'Advanced (C1–C2)',
      desc: 'Refining nuance, professional articulation, idioms, and advanced discourse.'
    }
  ];

  const goals: { id: TargetImprovementArea; title: string; desc: string; icon: string }[] = [
    {
      id: 'Everyday English',
      title: 'Everyday English',
      desc: 'Casual daily life, errands, dining, shopping, and habits.',
      icon: '☕'
    },
    {
      id: 'Workplace English',
      title: 'Workplace English',
      desc: 'Meetings, deadlines, project updates, and email communication.',
      icon: '💼'
    },
    {
      id: 'Grammar & Usage',
      title: 'Grammar & Usage',
      desc: 'Connectors, tenses, sentence structures, and avoiding common pitfalls.',
      icon: '✍️'
    },
    {
      id: 'Conversation',
      title: 'Conversation',
      desc: 'Social small talk, expressing opinions, catching up, and empathy.',
      icon: '💬'
    },
    {
      id: 'Professional English',
      title: 'Professional English',
      desc: 'Executive presentations, negotiations, proposals, and diplomatic discourse.',
      icon: '📈'
    }
  ];

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      onSave(level, improvement);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#0B749C] to-[#1FBAC0] p-6 text-white text-center relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome to Vocab Voice Coach</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight">Personalize Your English Practice</h2>
          <p className="text-sm text-sky-100 mt-1">
            {step === 1 ? 'Step 1 of 2: Current English Level' : 'Step 2 of 2: Primary Focus Area'}
          </p>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            <div className={`h-1.5 rounded-full transition-all ${step === 1 ? 'w-8 bg-white' : 'w-4 bg-white/50'}`} />
            <div className={`h-1.5 rounded-full transition-all ${step === 2 ? 'w-8 bg-white' : 'w-4 bg-white/50'}`} />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4">
          {step === 1 ? (
            <div>
              <p className="text-sm text-slate-600 font-medium mb-3">
                Select the level that feels closest to your current speaking and listening confidence:
              </p>
              <div className="space-y-2.5">
                {levels.map((item) => {
                  const isSelected = level === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setLevel(item.id)}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start justify-between ${
                        isSelected
                          ? 'border-[#0B749C] bg-[#0B749C]/5 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="pr-4">
                        <div className="font-bold text-slate-900 text-sm">{item.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-[#0B749C] border-[#0B749C] text-white'
                            : 'border-slate-300 bg-slate-50'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm text-slate-600 font-medium mb-3">
                What area of English would you like to improve most right now?
              </p>
              <div className="space-y-2.5">
                {goals.map((item) => {
                  const isSelected = improvement === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setImprovement(item.id)}
                      className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#1FBAC0] bg-[#1FBAC0]/5 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{item.title}</div>
                          <div className="text-xs text-slate-500">{item.desc}</div>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-[#1FBAC0] border-[#1FBAC0] text-white'
                            : 'border-slate-300 bg-slate-50'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          {step === 2 ? (
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-xl"
            >
              Back
            </button>
          ) : (
            <span className="text-xs text-slate-600 pl-2">You can adjust this anytime in Profile</span>
          )}

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B749C] hover:bg-[#085a79] text-white text-sm font-bold shadow-md transition-all ml-auto"
          >
            <span>{step === 1 ? 'Next Step' : 'Start Practicing'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
