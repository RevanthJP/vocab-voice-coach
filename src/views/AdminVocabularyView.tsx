import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, X, Shield, Search, Briefcase, HelpCircle, AlertTriangle } from 'lucide-react';
import { VocabularyWord, EnglishLevel, VocabularyCategory } from '../types';
import { storageService } from '../services/storageService';

export const AdminVocabularyView: React.FC = () => {
  const [words, setWords] = useState<VocabularyWord[]>(() => storageService.getVocabulary());
  const [editingWord, setEditingWord] = useState<Partial<VocabularyWord> | null>(null);
  const [commonMistakesText, setCommonMistakesText] = useState<string>('');
  const [isCreating, setIsCreating] = useState(false);
  const [search, setSearch] = useState('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const levels: EnglishLevel[] = ['Beginner', 'Intermediate', 'Advanced'];
  const categories: VocabularyCategory[] = [
    'Workplace English',
    'Day-to-Day English',
    'Grammar & Common Usage',
    'Conversations & Social Situations',
    'Travel & Situations',
    'Professional Communication'
  ];

  const refreshWords = () => {
    setWords(storageService.getVocabulary());
  };

  const showFeedback = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleStartCreate = () => {
    setEditingWord({
      word: '',
      meaning: '',
      simpleExplanation: '',
      partOfSpeech: 'verb',
      pronunciation: '',
      example1: '',
      example2: '',
      level: 'Intermediate',
      category: 'Workplace English',
      difficulty: 2,
      commonUsageNotes: '',
      whenToUse: '',
      situationPrompt: '',
      commonMistakes: []
    });
    setCommonMistakesText('');
    setIsCreating(true);
  };

  const handleStartEdit = (w: VocabularyWord) => {
    setEditingWord({ ...w });
    setCommonMistakesText(w.commonMistakes ? w.commonMistakes.join('\n') : '');
    setIsCreating(false);
  };

  const handleCancelEdit = () => {
    setEditingWord(null);
    setCommonMistakesText('');
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWord || !editingWord.word || !editingWord.meaning) return;

    const parsedMistakes = commonMistakesText
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const payload = {
      ...editingWord,
      commonMistakes: parsedMistakes
    };

    if (isCreating) {
      storageService.addVocabularyWord(payload as Omit<VocabularyWord, 'id'>);
      showFeedback(`Successfully added "${editingWord.word}" to vocabulary!`);
    } else if (editingWord.id) {
      storageService.updateVocabularyWord(editingWord.id, payload);
      showFeedback(`Updated "${editingWord.word}" successfully.`);
    }

    refreshWords();
    setEditingWord(null);
    setCommonMistakesText('');
    setIsCreating(false);
  };

  const handleDelete = (id: string, word: string) => {
    if (window.confirm(`Are you sure you want to delete "${word}" from the vocabulary database?`)) {
      storageService.deleteVocabularyWord(id);
      refreshWords();
      showFeedback(`Deleted "${word}".`);
    }
  };

  const filtered = words.filter(
    (w) =>
      w.word.toLowerCase().includes(search.toLowerCase()) ||
      w.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-600" />
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Vocabulary Management
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Add, update, or remove vocabulary words, scenario prompts, and common pitfalls in the database.
          </p>
        </div>

        {!editingWord && (
          <button
            onClick={handleStartCreate}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B749C] hover:bg-[#085a79] text-white text-xs sm:text-sm font-bold shadow-md transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Word</span>
          </button>
        )}
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Editing / Creating Modal or Inline Form */}
      {editingWord && (
        <form
          onSubmit={handleSave}
          className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#0B749C] shadow-lg space-y-5"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
              {isCreating ? 'Add New Vocabulary Word' : `Edit "${editingWord.word}"`}
            </h3>
            <button
              type="button"
              onClick={handleCancelEdit}
              className="p-1.5 rounded-full text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Word</label>
              <input
                type="text"
                value={editingWord.word || ''}
                onChange={(e) => setEditingWord({ ...editingWord, word: e.target.value })}
                placeholder="e.g. Articulate"
                className="w-full p-2.5 text-sm border border-slate-300 rounded-xl outline-hidden focus:border-[#0B749C]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Pronunciation (IPA or phonetics)
              </label>
              <input
                type="text"
                value={editingWord.pronunciation || ''}
                onChange={(e) => setEditingWord({ ...editingWord, pronunciation: e.target.value })}
                placeholder="e.g. /ɑːrˈtɪk.jə.lət/"
                className="w-full p-2.5 text-sm border border-slate-300 rounded-xl outline-hidden focus:border-[#0B749C]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Level</label>
              <select
                value={editingWord.level || 'Intermediate'}
                onChange={(e) =>
                  setEditingWord({ ...editingWord, level: e.target.value as EnglishLevel })
                }
                className="w-full p-2.5 text-sm border border-slate-300 rounded-xl outline-hidden focus:border-[#0B749C] bg-white"
              >
                {levels.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
              <select
                value={editingWord.category || 'Workplace English'}
                onChange={(e) =>
                  setEditingWord({
                    ...editingWord,
                    category: e.target.value as VocabularyCategory
                  })
                }
                className="w-full p-2.5 text-sm border border-slate-300 rounded-xl outline-hidden focus:border-[#0B749C] bg-white"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Part of Speech</label>
              <select
                value={editingWord.partOfSpeech || 'verb'}
                onChange={(e) =>
                  setEditingWord({
                    ...editingWord,
                    partOfSpeech: e.target.value as any
                  })
                }
                className="w-full p-2.5 text-sm border border-slate-300 rounded-xl outline-hidden focus:border-[#0B749C] bg-white"
              >
                <option value="verb">Verb</option>
                <option value="noun">Noun</option>
                <option value="adjective">Adjective</option>
                <option value="adverb">Adverb</option>
                <option value="phrasal verb">Phrasal Verb</option>
                <option value="idiom">Idiom</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Common Usage Notes
              </label>
              <input
                type="text"
                value={editingWord.commonUsageNotes || ''}
                onChange={(e) =>
                  setEditingWord({ ...editingWord, commonUsageNotes: e.target.value })
                }
                placeholder="e.g. Often followed by 'with' or 'about'"
                className="w-full p-2.5 text-sm border border-slate-300 rounded-xl outline-hidden focus:border-[#0B749C]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Meaning</label>
            <textarea
              value={editingWord.meaning || ''}
              onChange={(e) => setEditingWord({ ...editingWord, meaning: e.target.value })}
              rows={2}
              className="w-full p-2.5 text-sm border border-slate-300 rounded-xl outline-hidden focus:border-[#0B749C]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Simple Explanation</label>
            <textarea
              value={editingWord.simpleExplanation || ''}
              onChange={(e) =>
                setEditingWord({ ...editingWord, simpleExplanation: e.target.value })
              }
              rows={2}
              className="w-full p-2.5 text-sm border border-slate-300 rounded-xl outline-hidden focus:border-[#0B749C]"
              required
            />
          </div>

          {/* When to Use & Situation Prompt */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-[#0B749C]" />
                <span>When & How to Use (Pedagogy)</span>
              </label>
              <textarea
                value={editingWord.whenToUse || ''}
                onChange={(e) => setEditingWord({ ...editingWord, whenToUse: e.target.value })}
                placeholder="Explain the nuance and specific circumstances when native speakers choose this word..."
                rows={2}
                className="w-full p-2.5 text-sm border border-slate-300 rounded-xl outline-hidden focus:border-[#0B749C]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-[#0B749C]" />
                <span>Real-Life Situation Scenario Prompt</span>
              </label>
              <textarea
                value={editingWord.situationPrompt || ''}
                onChange={(e) => setEditingWord({ ...editingWord, situationPrompt: e.target.value })}
                placeholder="e.g. You are in a team standup meeting. Explain what you did yesterday..."
                rows={2}
                className="w-full p-2.5 text-sm border border-slate-300 rounded-xl outline-hidden focus:border-[#0B749C]"
              />
            </div>
          </div>

          {/* Common Mistakes (newline separated) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Common Pitfalls & Mistakes (One per line)</span>
            </label>
            <textarea
              value={commonMistakesText}
              onChange={(e) => setCommonMistakesText(e.target.value)}
              placeholder="e.g. Saying 'I go' instead of 'I went' when speaking about yesterday&#10;Forgetting preposition 'with' after collaborate"
              rows={2}
              className="w-full p-2.5 text-sm border border-slate-300 rounded-xl outline-hidden focus:border-[#0B749C]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Example Sentence 1</label>
            <input
              type="text"
              value={editingWord.example1 || ''}
              onChange={(e) => setEditingWord({ ...editingWord, example1: e.target.value })}
              className="w-full p-2.5 text-sm border border-slate-300 rounded-xl outline-hidden focus:border-[#0B749C]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Example Sentence 2</label>
            <input
              type="text"
              value={editingWord.example2 || ''}
              onChange={(e) => setEditingWord({ ...editingWord, example2: e.target.value })}
              className="w-full p-2.5 text-sm border border-slate-300 rounded-xl outline-hidden focus:border-[#0B749C]"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#0B749C] hover:bg-[#085a79] text-white text-xs font-bold rounded-xl shadow-md transition-all"
            >
              {isCreating ? 'Save New Word' : 'Update Word'}
            </button>
          </div>
        </form>
      )}

      {/* Search & Word List */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-slate-100">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-600 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search vocabulary by keyword or category..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:border-[#0B749C] outline-hidden"
            />
          </div>
        </div>

        <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
          {filtered.map((w) => (
            <div
              key={w.id}
              className="p-4 sm:p-5 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 text-base">{w.word}</span>
                  <span className="text-xs text-slate-500 font-mono">{w.pronunciation}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {w.level}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#0B749C]/10 text-[#0B749C]">
                    {w.category}
                  </span>
                </div>
                <p className="text-xs text-slate-700">{w.meaning}</p>
                {w.situationPrompt && (
                  <p className="text-[11px] text-sky-800 italic">
                    Scenario: &ldquo;{w.situationPrompt}&rdquo;
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => handleStartEdit(w)}
                  className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                  title="Edit word"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(w.id, w.word)}
                  className="p-2 rounded-xl text-rose-600 hover:text-rose-800 hover:bg-rose-50 transition-colors"
                  title="Delete word"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
