import React, { useState, useMemo, useEffect } from 'react';
import {
  TENSE_GROUPS,
  ALL_50_QUESTIONS,
  METHOD_FOLLOW_UP_QUESTIONS,
  METHOD_GUIDELINES,
  TEEN_PHRASES,
  WHAT_WOULD_YOU_RESPOND,
  DIALOGUE_QUIZ,
  FAST_QA,
  TRANSLATE_ITEMS,
  DIALOGUE_SITUATIONS,
  FILLER_PHRASES,
  TEACHER_TIP,
  QuestionItem
} from './data';
import {
  Volume2,
  VolumeX,
  Search,
  Eye,
  EyeOff,
  Sparkles,
  BookOpen,
  MessageCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Star,
  Layers,
  Zap,
  HelpCircle,
  GraduationCap,
  ChevronRight,
  ChevronLeft,
  Shuffle,
  Volume1,
  Type
} from 'lucide-react';

export default function App() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<
    'questions50' | 'teenPhrases' | 'fastQA' | 'exercises' | 'dialogues' | 'method'
  >('questions50');

  // Font size scale: 'normal' | 'large' | 'huge' (default to 'large')
  const [fontSizeScale, setFontSizeScale] = useState<'normal' | 'large' | 'huge'>('large');

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Tense filter for 50 questions (0 = all)
  const [selectedTenseId, setSelectedTenseId] = useState<number>(0);

  // Set of revealed IDs for click-to-reveal Armenian translation
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});

  // Global show all / hide all toggle state
  const [globalShowArmenian, setGlobalShowArmenian] = useState<boolean>(false);

  // Favorites
  const [favoriteQuestionIds, setFavoriteQuestionIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('es_fav_questions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Only favorites filter for 50 questions
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  // 50 Questions Study Mode: 'list' | 'flashcard'
  const [viewMode, setViewMode] = useState<'list' | 'flashcard'>('list');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);

  // Quiz State (Section 3)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Exercise 2 (What would you respond) answers reveal state
  const [revealedWhatWouldRespond, setRevealedWhatWouldRespond] = useState<Record<number, boolean>>({});

  // Exercise 5 (Traduce y habla) answers reveal state
  const [revealedTranslate, setRevealedTranslate] = useState<Record<number, boolean>>({});

  // Audio Speech synthesis
  const [speechRate, setSpeechRate] = useState<number>(0.9);
  const [speakingText, setSpeakingText] = useState<string | null>(null);

  // Global sound mute state
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('es_sound_muted');
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const toggleMute = () => {
    setIsMuted(prev => {
      const next = !prev;
      try {
        localStorage.setItem('es_sound_muted', String(next));
      } catch {}
      if (next && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        setSpeakingText(null);
      }
      return next;
    });
  };

  useEffect(() => {
    try {
      localStorage.setItem('es_fav_questions', JSON.stringify(favoriteQuestionIds));
    } catch {
      // ignore
    }
  }, [favoriteQuestionIds]);

  const toggleFavorite = (id: number) => {
    setFavoriteQuestionIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isRevealed = (key: string) => {
    if (globalShowArmenian) return true;
    return !!revealedIds[key];
  };

  const toggleReveal = (key: string) => {
    setRevealedIds(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleAllGlobal = () => {
    setGlobalShowArmenian(prev => !prev);
  };

  // Text-To-Speech function
  const speakSpanish = (text: string) => {
    if (isMuted) return;
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setSpeakingText(text);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = speechRate;

    utterance.onend = () => {
      setSpeakingText(null);
    };
    utterance.onerror = () => {
      setSpeakingText(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Filtered 50 questions
  const filteredQuestions = useMemo(() => {
    return ALL_50_QUESTIONS.filter(q => {
      if (selectedTenseId !== 0 && q.tenseId !== selectedTenseId) {
        return false;
      }
      if (onlyFavorites && !favoriteQuestionIds.includes(q.id)) {
        return false;
      }
      if (searchQuery.trim() === '') return true;
      const qLower = searchQuery.toLowerCase();
      return (
        q.questionEs.toLowerCase().includes(qLower) ||
        q.questionHy.toLowerCase().includes(qLower) ||
        q.answerEs.toLowerCase().includes(qLower) ||
        q.answerHy.toLowerCase().includes(qLower) ||
        q.tenseEs.toLowerCase().includes(qLower) ||
        q.tenseHy.toLowerCase().includes(qLower) ||
        q.id.toString() === qLower
      );
    });
  }, [selectedTenseId, onlyFavorites, favoriteQuestionIds, searchQuery]);

  // Quiz score calculation
  const quizScore = useMemo(() => {
    let score = 0;
    DIALOGUE_QUIZ.forEach(item => {
      if (quizAnswers[item.id] === item.correctIndex) {
        score++;
      }
    });
    return score;
  }, [quizAnswers]);

  // Dynamic font sizing classes based on fontSizeScale
  const fontClasses = {
    cardQuestion:
      fontSizeScale === 'huge'
        ? 'text-2xl sm:text-3xl font-extrabold leading-snug'
        : fontSizeScale === 'large'
        ? 'text-xl sm:text-2xl font-bold leading-snug'
        : 'text-lg sm:text-xl font-bold leading-snug',
    cardTranslation:
      fontSizeScale === 'huge'
        ? 'text-xl sm:text-2xl font-bold text-amber-950 leading-relaxed'
        : fontSizeScale === 'large'
        ? 'text-lg sm:text-xl font-bold text-amber-950 leading-relaxed'
        : 'text-base sm:text-lg font-semibold text-amber-950 leading-relaxed',
    cardAnswer:
      fontSizeScale === 'huge'
        ? 'text-lg sm:text-xl md:text-2xl font-medium leading-relaxed'
        : fontSizeScale === 'large'
        ? 'text-base sm:text-lg md:text-xl font-medium leading-relaxed'
        : 'text-sm sm:text-base md:text-lg font-medium leading-relaxed',
    cardAnswerTrans:
      fontSizeScale === 'huge'
        ? 'text-base sm:text-lg md:text-xl text-slate-800 leading-relaxed'
        : fontSizeScale === 'large'
        ? 'text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed'
        : 'text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed',
    phraseText:
      fontSizeScale === 'huge'
        ? 'text-xl sm:text-2xl font-bold'
        : fontSizeScale === 'large'
        ? 'text-lg sm:text-xl font-bold'
        : 'text-base sm:text-lg font-bold',
    phraseTrans:
      fontSizeScale === 'huge'
        ? 'text-base sm:text-lg font-bold'
        : fontSizeScale === 'large'
        ? 'text-sm sm:text-base font-semibold'
        : 'text-xs sm:text-sm font-semibold'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 via-slate-50 to-orange-50/30 text-slate-800">
      {/* Top Banner / Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3.5">
            {/* Title & Badge */}
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl filter drop-shadow-xs" role="img" aria-label="Spain flag">
                🇪🇸
              </span>
              <div>
                <div className="flex items-center flex-wrap gap-2">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Conversación en español
                  </h1>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs sm:text-sm font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    7-րդ դասարան · A2–B1
                  </span>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-slate-600 mt-0.5">
                  Խոսակցական իսպաներեն հայերեն թարգմանությամբ — Սեղմեք իսպաներենին՝ հայերենը տեսնելու համար
                </p>
              </div>
            </div>

            {/* Quick Actions (Font Size, Show all toggle, Audio speed, Search) */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Font Size Selector (A / A+ / A++) */}
              <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200 shadow-2xs">
                <Type className="w-4 h-4 text-amber-700" />
                <span className="text-xs font-semibold text-amber-900 hidden sm:inline mr-0.5">Տառաչափ:</span>
                <button
                  onClick={() => setFontSizeScale('normal')}
                  className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-colors ${
                    fontSizeScale === 'normal'
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'text-amber-800 hover:bg-amber-200/60'
                  }`}
                  title="Նորմալ տառաչափ"
                >
                  A
                </button>
                <button
                  onClick={() => setFontSizeScale('large')}
                  className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-colors ${
                    fontSizeScale === 'large'
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'text-amber-800 hover:bg-amber-200/60'
                  }`}
                  title="Մեծ տառաչափ (խորհուրդ է տրվում)"
                >
                  A+
                </button>
                <button
                  onClick={() => setFontSizeScale('huge')}
                  className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-colors ${
                    fontSizeScale === 'huge'
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'text-amber-800 hover:bg-amber-200/60'
                  }`}
                  title="Ամենամեծ տառաչափ"
                >
                  A++
                </button>
              </div>

              {/* Global reveal switch */}
              <button
                onClick={toggleAllGlobal}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold border transition-colors shadow-xs ${
                  globalShowArmenian
                    ? 'bg-amber-600 text-white border-amber-700 hover:bg-amber-700'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
                title="Բացել կամ թաքցնել բոլոր հայերեն թարգմանությունները"
              >
                {globalShowArmenian ? (
                  <>
                    <EyeOff className="w-4 h-4" />
                    <span>Թաքցնել հայերենը</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    <span>Բացել բոլորը</span>
                  </>
                )}
              </button>

              {/* Global Sound Mute / Unmute Button */}
              <button
                onClick={toggleMute}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold border transition-colors shadow-xs ${
                  isMuted
                    ? 'bg-rose-100 text-rose-900 border-rose-300 hover:bg-rose-200'
                    : 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100'
                }`}
                title={isMuted ? 'Միացնել ձայնը (Включить звук)' : 'Անջատել ձայնը (Отключить звук)'}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Ձայնն անջատված է</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Ձայնը միացված է</span>
                  </>
                )}
              </button>

              {/* Speech speed selector */}
              <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-xl border border-slate-200 text-xs sm:text-sm">
                <Volume1 className="w-4 h-4 text-slate-500" />
                <span className="text-slate-500 hidden sm:inline">Արագություն:</span>
                <button
                  onClick={() => setSpeechRate(0.8)}
                  className={`px-2 py-0.5 rounded font-bold ${
                    speechRate === 0.8
                      ? 'bg-amber-500 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Դանդաղ արտասանություն (0.8x)"
                >
                  0.8x
                </button>
                <button
                  onClick={() => setSpeechRate(1.0)}
                  className={`px-2 py-0.5 rounded font-bold ${
                    speechRate === 1.0
                      ? 'bg-amber-500 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Նորմալ արտասանություն (1.0x)"
                >
                  1.0x
                </button>
              </div>

              {/* Search input */}
              <div className="relative flex-1 sm:w-60">
                <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Որոնում իսպաներեն / հայերեն..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex space-x-1.5 sm:space-x-2 mt-3.5 overflow-x-auto pb-1 scrollbar-none border-t border-slate-100 pt-2.5 text-xs sm:text-sm md:text-base font-semibold">
            <button
              onClick={() => setActiveTab('questions50')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                activeTab === 'questions50'
                  ? 'bg-amber-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>50 Հարց ու պատասխան</span>
              <span className="text-xs bg-black/15 px-1.5 py-0.2 rounded-full font-bold">50</span>
            </button>

            <button
              onClick={() => setActiveTab('teenPhrases')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                activeTab === 'teenPhrases'
                  ? 'bg-amber-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Դեռահասների արտահայտություններ</span>
              <span className="text-xs bg-black/15 px-1.5 py-0.2 rounded-full font-bold">25+14</span>
            </button>

            <button
              onClick={() => setActiveTab('fastQA')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                activeTab === 'fastQA'
                  ? 'bg-amber-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>20 Արագ հարցեր</span>
              <span className="text-xs bg-black/15 px-1.5 py-0.2 rounded-full font-bold">20</span>
            </button>

            <button
              onClick={() => setActiveTab('exercises')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                activeTab === 'exercises'
                  ? 'bg-amber-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Վարժություններ & Թեստեր</span>
            </button>

            <button
              onClick={() => setActiveTab('dialogues')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                activeTab === 'dialogues'
                  ? 'bg-amber-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Իրական Երկխոսություններ</span>
              <span className="text-xs bg-black/15 px-1.5 py-0.2 rounded-full font-bold">5</span>
            </button>

            <button
              onClick={() => setActiveTab('method')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                activeTab === 'method'
                  ? 'bg-amber-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Ուսուցման Մեթոդ</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Interactive Notice Bar */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200/90 text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5 text-sm sm:text-base">
            <span className="px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 font-extrabold text-xs">
              ԽՈՐՀՈՒՐԴ
            </span>
            <span>
              Սեղմեք ցանկացած <strong className="text-amber-900">իսպաներեն</strong> տեքստի վրա՝ դրա <strong className="text-amber-900">հայերեն թարգմանությունը</strong> բացելու համար։
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm shrink-0">
            {isMuted ? (
              <button
                onClick={toggleMute}
                className="text-rose-700 hover:text-rose-900 font-bold flex items-center gap-1.5 bg-rose-100/80 px-2.5 py-1 rounded-lg border border-rose-200 transition-colors"
                title="Սեղմեք ձայնը միացնելու համար"
              >
                <VolumeX className="w-4 h-4 text-rose-600" />
                <span>Ձայնն անջատված է (սեղմեք միացնելու համար)</span>
              </button>
            ) : (
              <span className="text-amber-800 flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Սեղմեք բարձրախոսը՝ իսպաներեն արտասանությունը լսելու համար</span>
              </span>
            )}
          </div>
        </div>

        {/* TAB 1: 50 PREGUNTAS Y RESPUESTAS */}
        {activeTab === 'questions50' && (
          <div>
            {/* Header intro & tense filters */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
                    <span>🇪🇸 Conversación en español — 50 preguntas y respuestas</span>
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base mt-1">
                    Խոսակցական պրակտիկա՝ տարբեր ժամանակներով։ Presente, Pretérito Perfecto, Indefinido, Imperfecto, Futuro, Condicional, Subjuntivo։
                  </p>
                </div>

                {/* View Mode Toggle: List vs Flashcards */}
                <div className="flex items-center gap-2 self-start lg:self-auto">
                  <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1 text-xs sm:text-sm">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                        viewMode === 'list'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Ցուցակ (List)
                    </button>
                    <button
                      onClick={() => {
                        setViewMode('flashcard');
                        setFlashcardFlipped(false);
                      }}
                      className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                        viewMode === 'flashcard'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Քարտեր (Flashcards)
                    </button>
                  </div>

                  <button
                    onClick={() => setOnlyFavorites(prev => !prev)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold border transition-colors ${
                      onlyFavorites
                        ? 'bg-amber-100 border-amber-300 text-amber-900'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        onlyFavorites ? 'fill-amber-500 text-amber-500' : 'text-slate-400'
                      }`}
                    />
                    <span>Ընտրյալներ ({favoriteQuestionIds.length})</span>
                  </button>
                </div>
              </div>

              {/* Tense filter buttons */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setSelectedTenseId(0)}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
                    selectedTenseId === 0
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Բոլոր 50-ը
                </button>
                {TENSE_GROUPS.map(tg => (
                  <button
                    key={tg.id}
                    onClick={() => setSelectedTenseId(tg.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
                      selectedTenseId === tg.id
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-amber-50/80 text-amber-900 border border-amber-200/80 hover:bg-amber-100'
                    }`}
                  >
                    {tg.id}. {tg.nameEs} ({tg.range})
                  </button>
                ))}
              </div>
            </div>

            {/* If in Flashcard Mode */}
            {viewMode === 'flashcard' && filteredQuestions.length > 0 && (
              <div className="max-w-3xl mx-auto my-6">
                <div className="bg-white rounded-3xl border-2 border-amber-300 shadow-md p-6 sm:p-10 flex flex-col justify-between min-h-[420px] relative">
                  {/* Top Bar inside card */}
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4 pb-3 border-b border-slate-100">
                    <span className="font-bold text-amber-700 uppercase tracking-wide text-xs sm:text-sm">
                      {filteredQuestions[flashcardIndex]?.tenseEs} — {filteredQuestions[flashcardIndex]?.tenseHy}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="font-bold">
                        {flashcardIndex + 1} / {filteredQuestions.length}
                      </span>
                      <button
                        onClick={() => toggleFavorite(filteredQuestions[flashcardIndex].id)}
                        className="p-1.5 hover:bg-slate-100 rounded-lg"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            favoriteQuestionIds.includes(filteredQuestions[flashcardIndex].id)
                              ? 'fill-amber-500 text-amber-500'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Card Content with flip */}
                  <div
                    onClick={() => setFlashcardFlipped(prev => !prev)}
                    className="cursor-pointer py-4 flex-1 flex flex-col justify-center text-center group"
                  >
                    <div className="mb-5">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 mb-2">
                        Հարց #{filteredQuestions[flashcardIndex].id}
                      </span>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 group-hover:text-amber-800 transition-colors leading-snug">
                        {filteredQuestions[flashcardIndex].questionEs}
                      </h3>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          speakSpanish(filteredQuestions[flashcardIndex].questionEs);
                        }}
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-lg hover:bg-amber-100 border border-amber-200"
                      >
                        <Volume2 className="w-4 h-4" /> Լսել իսպաներեն
                      </button>
                    </div>

                    <div className="mt-4 pt-4 border-t border-dashed border-slate-200">
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-1 font-bold">
                        Պատասխան (Իսպաներեն)
                      </p>
                      <p className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 leading-relaxed">
                        {filteredQuestions[flashcardIndex].answerEs}
                      </p>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          speakSpanish(filteredQuestions[flashcardIndex].answerEs);
                        }}
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-lg hover:bg-amber-100 border border-amber-200"
                      >
                        <Volume2 className="w-4 h-4" /> Լսել պատասխանը
                      </button>
                    </div>

                    {/* Armenian Translation Reveal */}
                    <div
                      className={`mt-6 p-5 rounded-2xl transition-all duration-300 ${
                        flashcardFlipped
                          ? 'bg-amber-50 text-amber-950 border border-amber-300'
                          : 'bg-slate-50 text-slate-400 border border-slate-200'
                      }`}
                    >
                      {flashcardFlipped ? (
                        <div className="space-y-3 text-left">
                          <div>
                            <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                              Հարցը հայերեն՝
                            </span>
                            <p className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                              {filteredQuestions[flashcardIndex].questionHy}
                            </p>
                          </div>
                          <div className="pt-2 border-t border-amber-200/60">
                            <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                              Պատասխանը հայերեն՝
                            </span>
                            <p className="text-base sm:text-lg font-medium text-slate-800 mt-0.5">
                              {filteredQuestions[flashcardIndex].answerHy}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm font-semibold flex items-center justify-center gap-2 text-slate-500 py-1">
                          <Eye className="w-4 h-4 text-amber-600" />
                          <span>Սեղմեք քարտին՝ հայերեն թարգմանությունը տեսնելու համար</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Card Navigation */}
                  <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-4">
                    <button
                      onClick={() => {
                        setFlashcardFlipped(false);
                        setFlashcardIndex(prev => (prev > 0 ? prev - 1 : filteredQuestions.length - 1));
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50"
                    >
                      <ChevronLeft className="w-4 h-4" /> Նախորդը
                    </button>

                    <button
                      onClick={() => {
                        const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
                        setFlashcardIndex(randomIndex);
                        setFlashcardFlipped(false);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-50"
                      title="Պատահական հարց"
                    >
                      <Shuffle className="w-4 h-4" /> Պատահական
                    </button>

                    <button
                      onClick={() => {
                        setFlashcardFlipped(false);
                        setFlashcardIndex(prev => (prev < filteredQuestions.length - 1 ? prev + 1 : 0));
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 text-white text-sm font-bold hover:bg-amber-700 shadow-xs"
                    >
                      Հաջորդը <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* List View Mode */}
            {viewMode === 'list' && (
              <div className="space-y-5">
                {filteredQuestions.length === 0 ? (
                  <div className="bg-white rounded-2xl p-10 text-center text-slate-500 border border-slate-200 text-base">
                    Հարցեր չեն գտնվել տվյալ որոնմամբ կամ ֆիլտրով։
                  </div>
                ) : (
                  filteredQuestions.map(item => {
                    const questKey = `q-${item.id}-quest`;
                    const ansKey = `q-${item.id}-ans`;
                    const questRevealed = isRevealed(questKey);
                    const ansRevealed = isRevealed(ansKey);
                    const isFav = favoriteQuestionIds.includes(item.id);

                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-amber-300 transition-all overflow-hidden"
                      >
                        {/* Card Header */}
                        <div className="bg-slate-50/80 px-5 py-2.5 border-b border-slate-100 flex items-center justify-between text-xs sm:text-sm">
                          <div className="flex items-center gap-2.5">
                            <span className="font-extrabold px-2.5 py-0.5 rounded-lg bg-amber-500 text-white text-xs">
                              #{item.id}
                            </span>
                            <span className="font-bold text-slate-800 text-xs sm:text-sm">
                              {item.tenseEs}
                            </span>
                            <span className="text-slate-400 hidden sm:inline">•</span>
                            <span className="text-slate-500 font-medium hidden sm:inline">
                              {item.tenseHy}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => {
                                toggleReveal(questKey);
                                toggleReveal(ansKey);
                              }}
                              className="text-xs sm:text-sm text-amber-700 hover:text-amber-900 font-bold px-2.5 py-1 rounded-lg hover:bg-amber-100/60 transition-colors"
                              title="Բացել/փակել թարգմանությունը"
                            >
                              {questRevealed && ansRevealed ? 'Թաքցնել հայերենը' : 'Տեսնել հայերենը'}
                            </button>
                            <button
                              onClick={() => toggleFavorite(item.id)}
                              className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-amber-500"
                              title={isFav ? 'Հեռացնել ընտրյալներից' : 'Ավելացնել ընտրյալներում'}
                            >
                              <Star
                                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                  isFav ? 'fill-amber-500 text-amber-500' : 'text-slate-300'
                                }`}
                              />
                            </button>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-5 sm:p-6 space-y-5">
                          {/* Question Section */}
                          <div className="group">
                            <div className="flex items-start justify-between gap-3">
                              <div
                                onClick={() => toggleReveal(questKey)}
                                className="cursor-pointer flex-1"
                              >
                                <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1.5">
                                  <span>Հարց</span>
                                  <span className="text-xs font-normal text-slate-400">
                                    (սեղմեք թարգմանության համար)
                                  </span>
                                </div>
                                <p className={`${fontClasses.cardQuestion} text-slate-900 group-hover:text-amber-700 transition-colors`}>
                                  {item.questionEs}
                                </p>
                              </div>

                              <button
                                onClick={() => speakSpanish(item.questionEs)}
                                className={`p-2.5 rounded-xl border transition-colors shrink-0 ${
                                  speakingText === item.questionEs
                                    ? 'bg-amber-500 text-white border-amber-600'
                                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-amber-50 hover:text-amber-700'
                                }`}
                                title="Լսել հարցը իսպաներեն"
                              >
                                <Volume2 className="w-5 h-5" />
                              </button>
                            </div>

                            {/* Question Armenian Translation */}
                            {questRevealed && (
                              <div className={`mt-3 pl-4 border-l-3 border-amber-500 py-1 ${fontClasses.cardTranslation} bg-amber-50/70 rounded-r-xl px-3`}>
                                {item.questionHy}
                              </div>
                            )}
                          </div>

                          {/* Answer Section */}
                          <div className="pt-4 border-t border-slate-100 group">
                            <div className="flex items-start justify-between gap-3">
                              <div
                                onClick={() => toggleReveal(ansKey)}
                                className="cursor-pointer flex-1"
                              >
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                                  <span>Պատասխան</span>
                                  <span className="text-xs font-normal text-slate-400">
                                    (սեղմեք թարգմանության համար)
                                  </span>
                                </div>
                                <p className={`${fontClasses.cardAnswer} text-slate-800 group-hover:text-amber-800 transition-colors`}>
                                  — {item.answerEs}
                                </p>
                              </div>

                              <button
                                onClick={() => speakSpanish(item.answerEs)}
                                className={`p-2.5 rounded-xl border transition-colors shrink-0 ${
                                  speakingText === item.answerEs
                                    ? 'bg-amber-500 text-white border-amber-600'
                                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-amber-50 hover:text-amber-700'
                                }`}
                                title="Լսել պատասխանը իսպաներեն"
                              >
                                <Volume2 className="w-5 h-5" />
                              </button>
                            </div>

                            {/* Answer Armenian Translation */}
                            {ansRevealed && (
                              <div className={`mt-3 pl-4 border-l-3 border-slate-400 py-1 ${fontClasses.cardAnswerTrans} bg-slate-50 rounded-r-xl px-3 font-medium`}>
                                — {item.answerHy}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TEEN PHRASES & FILLER PHRASES */}
        {activeTab === 'teenPhrases' && (
          <div className="space-y-8">
            {/* Section 1: Teen Phrases */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs">
              <div className="mb-6">
                <span className="text-xs font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-lg bg-orange-100 text-orange-800">
                  Բաժին 1
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">
                  1. Frases que usan los adolescentes — Դեռահասների ամենօրյա արտահայտությունները
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-1">
                  Ամենատարածված 25 խոսակցական արտահայտությունները։ Սեղմեք իսպաներեն արտահայտության վրա՝ հայերեն թարգմանությունը տեսնելու համար։
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {TEEN_PHRASES.map((phrase, idx) => {
                  const key = `teen-${idx}`;
                  const revealed = isRevealed(key);

                  return (
                    <div
                      key={idx}
                      onClick={() => toggleReveal(key)}
                      className={`cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all text-left flex flex-col justify-between ${
                        revealed
                          ? 'bg-amber-50/80 border-amber-300 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-amber-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-xs font-extrabold text-slate-400 block mb-1">
                            #{idx + 1}
                          </span>
                          <span className={`${fontClasses.phraseText} text-slate-900 group-hover:text-amber-700`}>
                            {phrase.es}
                          </span>
                        </div>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            speakSpanish(phrase.es);
                          }}
                          className="p-2 text-slate-400 hover:text-amber-600 rounded-lg hover:bg-slate-100"
                          title="Լսել արտասանությունը"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100">
                        {revealed ? (
                          <p className={`${fontClasses.phraseTrans} text-amber-900`}>
                            {phrase.hy}
                          </p>
                        ) : (
                          <span className="text-xs sm:text-sm text-slate-400 flex items-center gap-1.5 font-medium">
                            <Eye className="w-4 h-4 text-amber-500" />
                            <span>Սեղմեք հայերենը տեսնելու համար</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 7: Filler Phrases */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs">
              <div className="mb-6">
                <span className="text-xs font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800">
                  Բաժին 7
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">
                  7. Frases para ganar tiempo al hablar — Ինչ ասել, երբ մտածելու ժամանակ է պետք
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-1">
                  Այս արտահայտությունները հատկապես օգտակար են, երբ աշակերտը հասկանում է հարցը, բայց անմիջապես չի կարողանում պատասխանել։
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {FILLER_PHRASES.map((phrase, idx) => {
                  const key = `filler-${idx}`;
                  const revealed = isRevealed(key);

                  return (
                    <div
                      key={idx}
                      onClick={() => toggleReveal(key)}
                      className={`cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all text-left flex flex-col justify-between ${
                        revealed
                          ? 'bg-emerald-50/80 border-emerald-300 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-xs font-extrabold text-slate-400 block mb-1">
                            #{idx + 1}
                          </span>
                          <span className={`${fontClasses.phraseText} text-slate-900`}>
                            {phrase.es}
                          </span>
                        </div>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            speakSpanish(phrase.es);
                          }}
                          className="p-2 text-slate-400 hover:text-emerald-600 rounded-lg hover:bg-slate-100"
                          title="Լսել արտասանությունը"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100">
                        {revealed ? (
                          <p className={`${fontClasses.phraseTrans} text-emerald-900`}>
                            {phrase.hy}
                          </p>
                        ) : (
                          <span className="text-xs sm:text-sm text-slate-400 flex items-center gap-1.5 font-medium">
                            <Eye className="w-4 h-4 text-emerald-600" />
                            <span>Սեղմեք հայերենը տեսնելու համար</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Teacher tip card */}
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-sm sm:text-base leading-relaxed">
                <span className="font-extrabold block mb-1.5 text-base sm:text-lg">💡 Ուսուցչի ուղեցույց.</span>
                {TEACHER_TIP}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 20 FAST QUESTIONS */}
        {activeTab === 'fastQA' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs">
              <div className="mb-5">
                <span className="text-xs font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800">
                  Բաժին 4
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">
                  4. Responde rápido — 20 preguntas y respuestas
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-1">
                  Այս հարցերը տուր արագ, ինչպես իրական խոսակցության ժամանակ։ Սեղմեք հարցին կամ պատասխանին՝ հայերենը տեսնելու համար։
                </p>
              </div>

              <div className="space-y-4 mt-5">
                {FAST_QA.map(item => {
                  const questKey = `fast-${item.id}-quest`;
                  const ansKey = `fast-${item.id}-ans`;
                  const qRevealed = isRevealed(questKey);
                  const aRevealed = isRevealed(ansKey);

                  return (
                    <div
                      key={item.id}
                      className="bg-slate-50/70 rounded-2xl p-4 sm:p-5 border border-slate-200 hover:border-blue-300 transition-all"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 space-y-2.5">
                          {/* Question */}
                          <div
                            onClick={() => toggleReveal(questKey)}
                            className="cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-xs sm:text-sm font-extrabold px-2.5 py-0.5 rounded-lg bg-blue-600 text-white shrink-0">
                                #{item.id}
                              </span>
                              <span className={`${fontClasses.phraseText} text-slate-900 hover:text-blue-700`}>
                                {item.questionEs}
                              </span>
                            </div>
                            {qRevealed && (
                              <p className={`mt-2 ${fontClasses.phraseTrans} text-blue-900 pl-8 font-bold`}>
                                {item.questionHy}
                              </p>
                            )}
                          </div>

                          {/* Answer */}
                          <div
                            onClick={() => toggleReveal(ansKey)}
                            className="cursor-pointer pt-2.5 border-t border-slate-200/70"
                          >
                            <p className={`${fontClasses.cardAnswer} text-slate-800 hover:text-blue-800 pl-8`}>
                              — {item.answerEs}
                            </p>
                            {aRevealed && (
                              <p className={`mt-1.5 ${fontClasses.cardAnswerTrans} text-slate-600 pl-8 font-medium`}>
                                — {item.answerHy}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Audio actions */}
                        <div className="flex flex-col gap-1.5">
                          <button
                            onClick={() => speakSpanish(item.questionEs)}
                            className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                            title="Լսել հարցը"
                          >
                            <Volume2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => speakSpanish(item.answerEs)}
                            className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                            title="Լսել պատասխանը"
                          >
                            <Volume1 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: EXERCISES & QUIZ */}
        {activeTab === 'exercises' && (
          <div className="space-y-8">
            {/* Section 2: ¿Qué responderías? */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <div>
                  <span className="text-xs font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-lg bg-purple-100 text-purple-800">
                    Բաժին 2
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">
                    2. Ejercicio — ¿Qué responderías?
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base mt-1">
                    Ի՞նչ կպատասխանեիր այս իրավիճակներում։ Սկզբում սովորողը պատասխանում է ինքնուրույն, ապա ստուգում պատասխանը։
                  </p>
                </div>

                <button
                  onClick={() => {
                    const allOpen = Object.keys(revealedWhatWouldRespond).length === WHAT_WOULD_YOU_RESPOND.length;
                    if (allOpen) {
                      setRevealedWhatWouldRespond({});
                    } else {
                      const newObj: Record<number, boolean> = {};
                      WHAT_WOULD_YOU_RESPOND.forEach(i => (newObj[i.id] = true));
                      setRevealedWhatWouldRespond(newObj);
                    }
                  }}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-purple-600 text-white hover:bg-purple-700 transition-colors shadow-xs self-start sm:self-auto"
                >
                  {Object.keys(revealedWhatWouldRespond).length === WHAT_WOULD_YOU_RESPOND.length
                    ? 'Ocultar todas (Թաքցնել բոլորը)'
                    : 'Mostrar todas las respuestas (Ցույց տալ բոլորը)'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {WHAT_WOULD_YOU_RESPOND.map(item => {
                  const isOpen = !!revealedWhatWouldRespond[item.id];

                  return (
                    <div
                      key={item.id}
                      className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-lg bg-purple-100 text-purple-900">
                            Իրավիճակ #{item.id}
                          </span>
                          <button
                            onClick={() => speakSpanish(item.situationEs)}
                            className="text-slate-400 hover:text-purple-600 p-1"
                            title="Լսել իսպաներեն"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="font-bold text-slate-900 text-base sm:text-lg">
                          {item.situationEs}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1 italic font-medium">
                          {item.situationHy}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200">
                        {isOpen ? (
                          <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-extrabold text-purple-700 uppercase">
                                Բնական պատասխան
                              </span>
                              <button
                                onClick={() => speakSpanish(item.responseEs)}
                                className="text-purple-600 hover:text-purple-800 p-0.5"
                                title="Լսել"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-base sm:text-lg font-bold text-purple-950">
                              «{item.responseEs}»
                            </p>
                            <p className="text-sm font-semibold text-purple-800">
                              «{item.responseHy}»
                            </p>
                            <button
                              onClick={() =>
                                setRevealedWhatWouldRespond(prev => ({
                                  ...prev,
                                  [item.id]: false
                                }))
                              }
                              className="text-xs font-semibold text-purple-700 hover:underline pt-1.5 block"
                            >
                              Թաքցնել
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              setRevealedWhatWouldRespond(prev => ({
                                ...prev,
                                [item.id]: true
                              }))
                            }
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-3.5 py-2 rounded-xl border border-purple-200 transition-colors"
                          >
                            <Eye className="w-4 h-4" /> Ver respuesta (Տեսնել պատասխանը)
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Completa el diálogo Quiz */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <div>
                  <span className="text-xs font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800">
                    Բաժին 3
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">
                    3. Completa el diálogo — Լրացրո՛ւ երկխոսությունը
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base mt-1">
                    Ընտրի՛ր ամենաբնական պատասխանը (Elige la respuesta correcta)։
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-sm sm:text-base font-extrabold text-slate-800">
                    {quizScore} / {DIALOGUE_QUIZ.length} correctas
                  </div>
                  <button
                    onClick={() => {
                      setQuizAnswers({});
                      setQuizSubmitted(false);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" /> Repetir (Կրկնել)
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {DIALOGUE_QUIZ.map((q, qIndex) => {
                  const selectedOpt = quizAnswers[q.id];
                  const hasAnswered = selectedOpt !== undefined;

                  return (
                    <div
                      key={q.id}
                      className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wide">
                            Հարց {qIndex + 1}
                          </span>
                          <h4 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                            {q.speakerEs}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-500 italic mt-0.5 font-medium">
                            {q.speakerHy}
                          </p>
                        </div>
                        <button
                          onClick={() => speakSpanish(q.speakerEs)}
                          className="p-2 rounded-xl text-slate-400 hover:text-emerald-600 hover:bg-slate-100"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Options */}
                      <div className="space-y-2.5 pt-2">
                        {q.options.map((opt, optIndex) => {
                          const isSelected = selectedOpt === optIndex;
                          const isCorrect = optIndex === q.correctIndex;

                          let btnClasses =
                            'w-full text-left p-3.5 rounded-xl border text-base font-semibold transition-all flex items-center justify-between ';

                          if (!hasAnswered) {
                            btnClasses +=
                              'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 text-slate-800';
                          } else if (isCorrect) {
                            btnClasses +=
                              'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                          } else if (isSelected && !isCorrect) {
                            btnClasses +=
                              'bg-rose-100 border-rose-300 text-rose-950 font-semibold';
                          } else {
                            btnClasses += 'bg-white border-slate-200 text-slate-400 opacity-60';
                          }

                          return (
                            <button
                              key={optIndex}
                              onClick={() => {
                                setQuizAnswers(prev => ({
                                  ...prev,
                                  [q.id]: optIndex
                                }));
                              }}
                              className={btnClasses}
                            >
                              <span>{opt}</span>
                              {hasAnswered && isCorrect && (
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                              )}
                              {hasAnswered && isSelected && !isCorrect && (
                                <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 5: Traduce y habla */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <div>
                  <span className="text-xs font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800">
                    Բաժին 5
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">
                    5. Traduce y habla — Թարգմանի՛ր և բարձրաձայն ասա
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base mt-1">
                    Ստորև 15 նախադասություն է։ Փորձի՛ր հայերենից անմիջապես իսպաներեն ասել՝ առանց գրելու։
                  </p>
                </div>

                <button
                  onClick={() => {
                    const allOpen = Object.keys(revealedTranslate).length === TRANSLATE_ITEMS.length;
                    if (allOpen) {
                      setRevealedTranslate({});
                    } else {
                      const newObj: Record<number, boolean> = {};
                      TRANSLATE_ITEMS.forEach(i => (newObj[i.id] = true));
                      setRevealedTranslate(newObj);
                    }
                  }}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-600 text-white hover:bg-amber-700 transition-colors shadow-xs self-start sm:self-auto"
                >
                  {Object.keys(revealedTranslate).length === TRANSLATE_ITEMS.length
                    ? 'Թաքցնել բոլորը'
                    : 'Ցույց տալ բոլոր պատասխանները'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TRANSLATE_ITEMS.map(item => {
                  const isOpen = !!revealedTranslate[item.id];

                  return (
                    <div
                      key={item.id}
                      className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-xs font-extrabold text-amber-700 block mb-1">
                          #{item.id} Հայերեն արտահայտություն՝
                        </span>
                        <p className="text-base sm:text-lg font-bold text-slate-900">
                          {item.armenian}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200">
                        {isOpen ? (
                          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-extrabold text-amber-800 uppercase">
                                Իսպաներեն թարգմանություն
                              </span>
                              <button
                                onClick={() => speakSpanish(item.spanish)}
                                className="text-amber-700 hover:text-amber-900 p-0.5"
                                title="Լսել"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-lg sm:text-xl font-extrabold text-amber-950 mt-1">
                              {item.spanish}
                            </p>
                            <button
                              onClick={() =>
                                setRevealedTranslate(prev => ({
                                  ...prev,
                                  [item.id]: false
                                }))
                              }
                              className="text-xs font-semibold text-amber-700 hover:underline pt-2 block"
                            >
                              Թաքցնել
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              setRevealedTranslate(prev => ({
                                ...prev,
                                [item.id]: true
                              }))
                            }
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 px-3.5 py-2 rounded-xl transition-colors"
                          >
                            <Eye className="w-4 h-4" /> Ստուգել պատասխանը
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: DIALOGUES & GAME */}
        {activeTab === 'dialogues' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs">
              <div className="mb-6">
                <span className="text-xs font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-lg bg-teal-100 text-teal-800">
                  Բաժին 6
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">
                  6. Juego — Continúa la conversación
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-1">
                  Ուսուցիչը սկսում է խոսակցությունը, աշակերտը պետք է շարունակի առնվազն 2–3 նախադասությամբ։ Ահա պատրաստի օրինակներ։
                </p>
              </div>

              <div className="space-y-6">
                {DIALOGUE_SITUATIONS.map(dlg => {
                  const keyA = `dlg-${dlg.id}-a`;
                  const keyB = `dlg-${dlg.id}-b`;
                  const revA = isRevealed(keyA);
                  const revB = isRevealed(keyB);

                  return (
                    <div
                      key={dlg.id}
                      className="border border-slate-200 rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-white to-slate-50 shadow-xs space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div>
                          <h3 className="font-extrabold text-lg sm:text-xl text-slate-900">
                            {dlg.titleEs}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-500 font-semibold">
                            {dlg.titleHy}
                          </p>
                        </div>
                        <span className="text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-teal-100 text-teal-800">
                          Դիալոգ #{dlg.id}
                        </span>
                      </div>

                      {/* Person A */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm font-bold text-slate-500">
                            Ուսուցիչ / Խոսակից (Persona A):
                          </span>
                          <button
                            onClick={() => speakSpanish(dlg.personAEs)}
                            className="text-slate-400 hover:text-teal-600 p-1"
                            title="Լսել"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div
                          onClick={() => toggleReveal(keyA)}
                          className="cursor-pointer p-4 rounded-xl bg-slate-100 hover:bg-slate-200/80 transition-colors"
                        >
                          <p className="font-bold text-slate-900 text-base sm:text-lg">
                            {dlg.personAEs}
                          </p>
                          {revA && (
                            <p className="text-sm sm:text-base font-semibold text-slate-700 mt-1.5 pt-1.5 border-t border-slate-200">
                              {dlg.personAHy}
                            </p>
                          )}
                          {!revA && (
                            <span className="text-xs text-slate-400 block mt-1">
                              (սեղմեք հայերենը տեսնելու համար)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Person B */}
                      <div className="space-y-1.5 pl-4 sm:pl-6 border-l-3 border-teal-500">
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm font-bold text-teal-800">
                            Աշակերտի պատասխանը (Persona B):
                          </span>
                          <button
                            onClick={() => speakSpanish(dlg.personBEs)}
                            className="text-teal-600 hover:text-teal-800 p-1"
                            title="Լսել"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div
                          onClick={() => toggleReveal(keyB)}
                          className="cursor-pointer p-4 rounded-xl bg-teal-50 border border-teal-200 hover:bg-teal-100/70 transition-colors"
                        >
                          <p className="font-bold text-teal-950 text-base sm:text-lg">
                            {dlg.personBEs}
                          </p>
                          {revB && (
                            <p className="text-sm sm:text-base font-semibold text-teal-800 mt-1.5 pt-1.5 border-t border-teal-200">
                              {dlg.personBHy}
                            </p>
                          )}
                          {!revB && (
                            <span className="text-xs text-teal-600 block mt-1">
                              (սեղմեք հայերենը տեսնելու համար)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: TEACHER METHODOLOGY */}
        {activeTab === 'method' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800">
                  Մեթոդաբանություն
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">
                  🎤 Մեթոդ՝ ինչպես օգտագործել այս 50 հարցերը
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-1">
                  7-րդ դասարանի իսպաներենի խոսակցական հմտությունները բնական զարգացնելու քայլաշար։
                </p>
              </div>

              {/* 3 Stages */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200">
                  <div className="text-amber-800 font-bold text-base mb-1.5 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-extrabold">
                      1
                    </span>
                    <span>Առաջին փուլ</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                    {METHOD_GUIDELINES.stage1}
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-orange-50/80 border border-orange-200">
                  <div className="text-orange-800 font-bold text-base mb-1.5 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-extrabold">
                      2
                    </span>
                    <span>Երկրորդ փուլ</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                    {METHOD_GUIDELINES.stage2}
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                  <div className="text-emerald-800 font-bold text-base mb-1.5 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-extrabold">
                      3
                    </span>
                    <span>Երրորդ փուլ</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                    {METHOD_GUIDELINES.stage3}
                  </p>
                </div>
              </div>

              {/* Goal Note */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white text-sm sm:text-base leading-relaxed shadow-sm">
                <span className="text-amber-400 font-extrabold block mb-1 text-base sm:text-lg">🎯 Գլխավոր նպատակը՝</span>
                {METHOD_GUIDELINES.goal}
              </div>

              {/* Follow-up Questions Table */}
              <div>
                <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 mb-4">
                  Երրորդ փուլում ավելացվող հարցեր՝ զրույցը բնական շարունակելու համար
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {METHOD_FOLLOW_UP_QUESTIONS.map((item, idx) => {
                    const key = `follow-${idx}`;
                    const rev = isRevealed(key);

                    return (
                      <div
                        key={idx}
                        onClick={() => toggleReveal(key)}
                        className={`cursor-pointer rounded-2xl p-5 border transition-all text-left flex flex-col justify-between ${
                          rev
                            ? 'bg-amber-50/90 border-amber-300 shadow-xs'
                            : 'bg-white border-slate-200 hover:border-amber-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-slate-900">
                            {item.es}
                          </span>
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              speakSpanish(item.es);
                            }}
                            className="p-1.5 text-slate-400 hover:text-amber-600 rounded-lg"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="mt-3.5 pt-2.5 border-t border-slate-100">
                          {rev ? (
                            <p className="text-base font-bold text-amber-900">
                              {item.hy}
                            </p>
                          ) : (
                            <span className="text-xs sm:text-sm text-slate-400 flex items-center gap-1 font-medium">
                              <Eye className="w-4 h-4 text-amber-500" />
                              <span>Սեղմեք հայերենը տեսնելու համար</span>
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-14 border-t border-slate-200 bg-white py-8 text-center text-xs sm:text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-bold text-slate-800 text-sm sm:text-base">
            🇪🇸 Իսպաներենի խոսակցական պրակտիկա · 7-րդ դասարան (A2–B1)
          </p>
          <p className="mt-1.5 text-slate-500">
            Նախատեսված է դպրոցականների և ուսուցիչների համար՝ ինտերակտիվ թարգմանությամբ և բնական արտասանությամբ։
          </p>
        </div>
      </footer>
    </div>
  );
}
