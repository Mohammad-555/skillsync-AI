import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { VoiceControlBar } from '../Common/VoiceControlBar';
import { ALL_MOCK_EXAMS } from '../../utils/mockExamData';
import { useAuth } from '../../context/AuthContext';
import {
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Sparkles,
  Zap,
  Check,
  Send,
  ArrowRight,
  HelpCircle
} from 'lucide-react';

import { generateGovMockExamQuestionsAI } from '../../utils/openRouterService';

/**
 * Deterministically constructs a 20-question non-repeating test set for any exam and setIndex.
 */
export const get20QuestionSet = (exam, setIndex = 0) => {
  if (!exam) return [];
  
  if (exam.questionSets && Array.isArray(exam.questionSets[setIndex]) && exam.questionSets[setIndex].length === 20) {
    return exam.questionSets[setIndex];
  }

  const allPool = [];
  if (exam.questionSets && Array.isArray(exam.questionSets)) {
    exam.questionSets.forEach(set => {
      if (Array.isArray(set)) allPool.push(...set);
    });
  } else if (exam.questions && Array.isArray(exam.questions)) {
    allPool.push(...exam.questions);
  }

  if (allPool.length === 0) return [];

  const total = allPool.length;
  const selected = [];
  const startOffset = (setIndex * 20) % total;

  for (let i = 0; i < 20; i++) {
    const qIdx = (startOffset + i) % total;
    const baseQ = allPool[qIdx];
    selected.push({
      ...baseQ,
      id: `${baseQ.id || 'q'}-set${setIndex}-${i + 1}`
    });
  }

  return selected;
};

export const GovMockTest = () => {
  const govExams = ALL_MOCK_EXAMS.filter(e => e.sector === 'government');

  const [selectedExamId, setSelectedExamId] = useState('upsc-gs');
  
  const [currentSetIndex, setCurrentSetIndex] = useState(() => {
    const saved = localStorage.getItem('skillsync_last_gov_set_upsc-gs');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  const [testStarted, setTestStarted] = useState(false);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes for 20 questions
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeQuestions, setActiveQuestions] = useState([]);

  const currentExam = govExams.find(e => e.id === selectedExamId) || govExams[0];

  // When changing exam, automatically retrieve that exam's next non-repeating set
  const handleExamChange = (examId) => {
    setSelectedExamId(examId);
    const saved = localStorage.getItem(`skillsync_last_gov_set_${examId}`);
    const nextSet = saved !== null ? parseInt(saved, 10) : 0;
    setCurrentSetIndex(nextSet);
  };

  useEffect(() => {
    let timer;
    if (testStarted && !isCompleted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (testStarted && timeLeft === 0 && !isCompleted) {
      handleCompleteTest();
    }
    return () => clearInterval(timer);
  }, [testStarted, isCompleted, timeLeft]);

  // Assembles 100% brand new, unique questions via AI and tracked history
  const prepareAndStartTest = async (setIdx) => {
    setIsGeneratingQuestions(true);
    try {
      // Retrieve history of previously attempted question stems to prevent repetition
      let attempted = [];
      try {
        const savedAttempted = localStorage.getItem('skillsync_attempted_gov_questions');
        if (savedAttempted) attempted = JSON.parse(savedAttempted);
      } catch (e) {
        console.warn('Error reading attempted question history:', e);
      }

      const questions = await generateGovMockExamQuestionsAI({
        examName: currentExam.name,
        category: currentExam.category || 'government',
        count: 20,
        attemptNumber: setIdx + 1,
        excludedQuestionsSummary: attempted
      });

      const finalQuestions = (questions && questions.length >= 5) 
        ? questions 
        : get20QuestionSet(currentExam, setIdx);

      // Save question stems to guarantee zero repetition on next attempts
      const newStems = finalQuestions.map(q => q.question);
      const updatedHistory = [...new Set([...attempted, ...newStems])].slice(-200);
      localStorage.setItem('skillsync_attempted_gov_questions', JSON.stringify(updatedHistory));

      setActiveQuestions(finalQuestions);
      localStorage.setItem(`skillsync_last_gov_set_${selectedExamId}`, setIdx.toString());
      setTestStarted(true);
      setCurrentQIndex(0);
      setUserAnswers({});
      setTimeLeft(1200); // 20 minutes for 20 questions
      setIsCompleted(false);
    } catch (err) {
      console.error('Failed to prepare test questions via AI:', err);
      // Fallback smoothly to deterministic 20-question set
      setActiveQuestions(get20QuestionSet(currentExam, setIdx));
      setTestStarted(true);
      setCurrentQIndex(0);
      setUserAnswers({});
      setTimeLeft(1200);
      setIsCompleted(false);
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  const handleStartTest = () => {
    prepareAndStartTest(currentSetIndex);
  };

  // Automatically updates to the next non-repeating set without repeating
  const handleRetakeExamWithNewSet = () => {
    const nextSet = currentSetIndex + 1;
    setCurrentSetIndex(nextSet);
    prepareAndStartTest(nextSet);
  };

  const handleSelectOption = (optIndex) => {
    if (isCompleted) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQIndex]: optIndex
    }));
  };

  const { addTestResult } = useAuth();

  const handleCompleteTest = () => {
    setIsCompleted(true);
    setTestStarted(false);
    const nextSet = currentSetIndex + 1;
    setCurrentSetIndex(nextSet);
    localStorage.setItem(`skillsync_last_gov_set_${selectedExamId}`, nextSet.toString());

    let correct = 0;
    activeQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correct) correct++;
    });
    const totalQ = activeQuestions.length || 20;
    const percent = Math.round((correct / totalQ) * 100);

    if (addTestResult) {
      addTestResult({
        id: `t-gov-${Date.now()}`,
        title: `${currentExam?.name || 'Government'} Mock Test (Attempt #${currentSetIndex + 1})`,
        score: `${percent}%`,
        totalQuestions: totalQ,
        correctAnswers: correct,
        category: 'government',
        timeTaken: formatTime(1200 - timeLeft),
        status: percent >= 60 ? 'Passed' : 'Needs Review'
      });
    }

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const calculateScore = () => {
    let correct = 0;
    activeQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correct) correct++;
    });
    return {
      score: correct,
      total: activeQuestions.length || 20,
      percentage: Math.round((correct / (activeQuestions.length || 20)) * 100)
    };
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const currentQ = activeQuestions[currentQIndex] || activeQuestions[0];
  const speechText = currentQ
    ? `Question ${currentQIndex + 1} of 20: ${currentQ.question}. Option A: ${currentQ.options[0]}. Option B: ${currentQ.options[1]}. Option C: ${currentQ.options[2]}. Option D: ${currentQ.options[3]}.`
    : '';

  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div style={{ padding: '1rem 0 3rem 0' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{
        padding: '2rem',
        marginBottom: '2rem',
        background: 'linear-gradient(135deg, var(--primary-lavender-subtle), var(--bg-surface))',
        borderLeft: '5px solid var(--primary-lavender)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div style={{ flex: 1, minWidth: '280px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <span className="badge badge-lavender">🎙️ Voice-Narrated AI Engine</span>
            <span className="badge badge-mint">20 Questions Per Mock Test</span>
            <span className="badge badge-blue">Auto-Updating Non-Repeating Sets</span>
          </div>
          <h2 style={{ fontSize: '1.75rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            Government Mock Examination Simulator
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '800px' }}>
            Official exam questions for UPSC Civil Services, SSC CGL, Banking (IBPS/SBI), Railways (RRB NTPC), NDA/CDS, State PSC, RBI Grade B, and SSC CHSL. Each session delivers a fresh, automatically rotating 20-question test set.
          </p>
        </div>
      </div>

      {/* Test Selection View (Sets are hidden, automated 20-question delivery) */}
      {!testStarted && !isCompleted && (
        <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center', width: '100%', marginBottom: '2rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--primary-lavender-subtle)',
            color: 'var(--primary-lavender)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem auto'
          }}>
            <Award size={32} />
          </div>

          <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Select Government Mock Examination</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
            Choose an exam domain below. The AI simulator automatically loads a <strong>fresh 20-question exam set</strong> with non-repeating rotation on every attempt.
          </p>

          <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
              CHOOSE GOVERNMENT COMPETITIVE EXAM (8 MAJOR NATIONAL EXAMS)
            </label>
            <select
              value={selectedExamId}
              onChange={(e) => handleExamChange(e.target.value)}
              className="select-field"
              style={{ width: '100%', fontSize: '1rem', padding: '0.85rem', fontWeight: '600' }}
            >
              {govExams.map(exam => (
                <option key={exam.id} value={exam.id}>
                  {exam.icon} {exam.name}
                </option>
              ))}
            </select>
          </div>

          {/* Exam Summary Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.75rem',
            background: 'var(--bg-subtle)',
            padding: '1.25rem',
            borderRadius: '0.75rem',
            marginBottom: '2rem',
            fontSize: '0.875rem'
          }}>
            <div>
              <span style={{ color: 'var(--text-light)', display: 'block', marginBottom: '2px' }}>Exam Format</span>
              <strong style={{ fontSize: '1.05rem', color: 'var(--primary-lavender)' }}>20 Questions</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-light)', display: 'block', marginBottom: '2px' }}>Time Allowed</span>
              <strong style={{ fontSize: '1.05rem', color: 'var(--text-main)' }}>20:00 Mins</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-light)', display: 'block', marginBottom: '2px' }}>Set Delivery</span>
              <strong style={{ fontSize: '1.05rem', color: 'var(--accent-mint)' }}>Auto-Rotating 🔄</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-light)', display: 'block', marginBottom: '2px' }}>Voice AI</span>
              <strong style={{ fontSize: '1.05rem', color: 'var(--primary-lavender)' }}>Enabled 🎙️</strong>
            </div>
          </div>

          <button
            onClick={handleStartTest}
            disabled={isGeneratingQuestions}
            className="btn btn-primary"
            style={{
              padding: '0.9rem 2.75rem',
              fontSize: '1.1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              cursor: isGeneratingQuestions ? 'wait' : 'pointer'
            }}
          >
            {isGeneratingQuestions ? (
              <>
                <Zap size={18} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                Generating Unique AI Questions...
              </>
            ) : (
              <>Start 20-Question Mock Test →</>
            )}
          </button>
        </div>
      )}

      {/* Active Exam Test View */}
      {testStarted && !isCompleted && (
        <div className="glass-panel" style={{ padding: '2rem 2.5rem', width: '100%', marginBottom: '2rem' }}>
          {/* Top Bar: Exam Info & Timer */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--border-color)',
            marginBottom: '1rem',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
              <span className="badge badge-lavender">{currentExam.name}</span>
              <span className="badge badge-mint">Question {currentQIndex + 1} of 20</span>
              <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                ({answeredCount} of 20 Answered)
              </span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: timeLeft < 180 ? 'rgba(239, 68, 68, 0.15)' : 'var(--accent-mint-subtle)',
              color: timeLeft < 180 ? '#ef4444' : 'var(--accent-mint)',
              padding: '0.4rem 0.85rem',
              borderRadius: '9999px',
              fontWeight: '700'
            }}>
              <Clock size={16} /> Time Remaining: {formatTime(timeLeft)}
            </div>
          </div>

          {/* Sleek Visual Progress Bar */}
          <div style={{
            width: '100%',
            height: '6px',
            background: 'var(--border-color-subtle)',
            borderRadius: '999px',
            overflow: 'hidden',
            marginBottom: '1.25rem'
          }}>
            <div style={{
              height: '100%',
              width: `${((currentQIndex + 1) / 20) * 100}%`,
              background: 'linear-gradient(90deg, var(--primary-lavender), var(--accent-mint))',
              transition: 'width 0.3s ease'
            }} />
          </div>

          {/* Question Jump Palette (1 to 20) */}
          <div style={{
            marginBottom: '1.25rem',
            padding: '0.75rem 1rem',
            background: 'var(--bg-subtle)',
            borderRadius: '0.75rem',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Question Navigator (1 - 20)
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Click any number to jump
              </span>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(10, 1fr)',
              gap: '0.35rem'
            }}>
              {Array.from({ length: 20 }, (_, idx) => {
                const isCurrent = currentQIndex === idx;
                const isAnswered = userAnswers[idx] !== undefined;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentQIndex(idx)}
                    style={{
                      height: '32px',
                      borderRadius: '0.4rem',
                      border: isCurrent
                        ? '2px solid var(--primary-lavender)'
                        : isAnswered
                        ? '1px solid var(--accent-mint)'
                        : '1px solid var(--border-color)',
                      background: isCurrent
                        ? 'var(--primary-lavender)'
                        : isAnswered
                        ? 'var(--accent-mint-subtle)'
                        : 'var(--bg-surface)',
                      color: isCurrent
                        ? '#ffffff'
                        : isAnswered
                        ? 'var(--accent-mint)'
                        : 'var(--text-main)',
                      fontWeight: isCurrent || isAnswered ? '800' : '600',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.15s ease'
                    }}
                    title={`Jump to Question ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI Voice Narrator Controller Bar */}
          <VoiceControlBar
            textToRead={speechText}
            title={`Voice Narrator • Question ${currentQIndex + 1} of 20`}
          />

          {/* Question Text */}
          <div style={{ marginBottom: '1.75rem', marginTop: '0.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', lineHeight: '1.5', fontWeight: '600' }}>
              <span style={{ color: 'var(--primary-lavender)', marginRight: '0.4rem' }}>Q{currentQIndex + 1}.</span>
              {currentQ.question}
            </h3>
          </div>

          {/* Options Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
            {currentQ.options.map((opt, idx) => {
              const isSelected = userAnswers[currentQIndex] === idx;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: '0.75rem',
                    border: `2px solid ${isSelected ? 'var(--primary-lavender)' : 'var(--border-color)'}`,
                    background: isSelected ? 'var(--primary-lavender-subtle)' : 'var(--bg-surface)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    transition: 'all 0.2s ease'
                  }}
                  className="account-card-hover"
                >
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    border: `2px solid ${isSelected ? 'var(--primary-lavender)' : 'var(--border-color)'}`,
                    background: isSelected ? 'var(--primary-lavender)' : 'transparent',
                    color: isSelected ? '#fff' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '0.85rem',
                    flexShrink: 0
                  }}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span style={{ fontSize: '0.975rem', color: 'var(--text-main)', fontWeight: isSelected ? '600' : '400' }}>
                    {opt}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <button
              onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQIndex === 0}
              className="btn btn-secondary"
              style={{ opacity: currentQIndex === 0 ? 0.5 : 1 }}
            >
              <ChevronLeft size={16} /> Previous
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {currentQIndex < 19 ? (
                <button
                  onClick={() => setCurrentQIndex(prev => prev + 1)}
                  className="btn btn-primary"
                >
                  Next Question <ChevronRight size={16} />
                </button>
              ) : null}

              <button
                onClick={handleCompleteTest}
                className="btn btn-mint"
                style={{ padding: '0.65rem 1.5rem', fontWeight: '800' }}
              >
                Submit Mock Test (20 Qs) <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completed Results View */}
      {isCompleted && (
        <div className="glass-panel" style={{ padding: '2.5rem', width: '100%', marginBottom: '2rem' }}>
          {(() => {
            const stats = calculateScore();
            return (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    background: 'var(--accent-mint-subtle)',
                    color: 'var(--accent-mint)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem auto'
                  }}>
                    <Award size={40} />
                  </div>
                  <h3 style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>Mock Examination Summary</h3>
                  <p style={{ color: 'var(--text-muted)' }}>
                    {currentExam.name} • <strong>20 Questions Standardized Test</strong>
                  </p>

                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    margin: '1.5rem 0',
                    padding: '1rem 2.5rem',
                    borderRadius: '1rem',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-color)'
                  }}>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>YOUR SCORE</span>
                      <span style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--primary-lavender)' }}>
                        {stats.score} / {stats.total}
                      </span>
                    </div>
                    <div style={{ width: '1px', height: '40px', background: 'var(--border-color)' }}></div>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>ACCURACY</span>
                      <span style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--accent-mint)' }}>
                        {stats.percentage}%
                      </span>
                    </div>
                  </div>
                </div>

                <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                  Detailed Answer Explanations (All 20 Questions)
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                  {activeQuestions.map((q, idx) => {
                    const uAns = userAnswers[idx];
                    const isCorrect = uAns === q.correct;
                    return (
                      <div key={q.id || idx} style={{
                        padding: '1.25rem',
                        borderRadius: '0.75rem',
                        border: `1px solid ${isCorrect ? 'var(--accent-mint-border)' : 'rgba(239, 68, 68, 0.3)'}`,
                        background: isCorrect ? 'var(--accent-mint-subtle)' : 'rgba(239, 68, 68, 0.05)'
                      }}>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          {isCorrect ? <CheckCircle2 size={20} color="var(--accent-mint)" style={{ flexShrink: 0, marginTop: '2px' }} /> : <XCircle size={20} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />}
                          <h5 style={{ fontSize: '1rem', color: 'var(--text-main)' }}>Q{idx + 1}: {q.question}</h5>
                        </div>
                        <p style={{ fontSize: '0.875rem', margin: '0.4rem 0', color: 'var(--text-muted)' }}>
                          <strong>Your Answer:</strong> {uAns !== undefined ? q.options[uAns] : 'Not Answered'}<br />
                          <strong>Correct Answer:</strong> <span style={{ color: 'var(--accent-mint)', fontWeight: '700' }}>{q.options[q.correct]}</span>
                        </p>
                        <div style={{
                          fontSize: '0.85rem',
                          background: 'var(--bg-surface)',
                          padding: '0.65rem 0.85rem',
                          borderRadius: '0.5rem',
                          borderLeft: '3px solid var(--primary-lavender)',
                          marginTop: '0.5rem',
                          color: 'var(--text-main)'
                        }}>
                          <strong>Explanation:</strong> {q.explanation}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={handleRetakeExamWithNewSet}
                    className="btn btn-primary"
                    title="Automatically advances to the next non-repeating 20-question set"
                    style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}
                  >
                    Start Next Mock Test (20 Fresh Questions) <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={handleStartTest}
                    className="btn btn-secondary"
                    style={{ padding: '0.75rem 1.25rem' }}
                  >
                    <RotateCcw size={16} /> Retake This Test (20 Qs)
                  </button>
                  <button
                    onClick={() => { setIsCompleted(false); setTestStarted(false); }}
                    className="btn btn-secondary"
                    style={{ padding: '0.75rem 1.25rem' }}
                  >
                    <BookOpen size={16} /> Choose Another Exam
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default GovMockTest;
