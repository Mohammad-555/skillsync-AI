import React, { useState, useEffect } from 'react';
import {
  Key,
  Cpu,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
  Sparkles,
  Zap,
  Activity,
  Eye,
  EyeOff,
  Trash2
} from 'lucide-react';
import {
  OPENROUTER_POPULAR_MODELS,
  getOpenRouterConfig,
  saveOpenRouterConfig,
  testOpenRouterConnection
} from '../../utils/openRouterService';

export const OpenRouterSettingsModal = ({ isOpen, onClose, onConfigSaved }) => {
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('meta-llama/llama-3.3-70b-instruct');
  const [showKey, setShowKey] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null); // { success: boolean, latency?: number, error?: string }
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const config = getOpenRouterConfig();
      setApiKey(config.apiKey || '');
      setSelectedModel(config.model || 'google/gemini-2.0-flash-001');
      setTestResult(null);
      setSaveSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    if (!apiKey.trim()) {
      setTestResult({ success: false, error: 'Please enter an OpenRouter API key first.' });
      return;
    }

    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await testOpenRouterConnection(apiKey.trim(), selectedModel);
      setTestResult(res);
    } catch (e) {
      setTestResult({ success: false, error: e.message || 'Connection test failed.' });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = () => {
    const config = {
      apiKey: apiKey.trim(),
      model: selectedModel,
      siteUrl: window.location.origin,
      siteName: 'SkillSync AI Mock Interview'
    };
    saveOpenRouterConfig(config);
    setSaveSuccess(true);
    if (onConfigSaved) onConfigSaved(config);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 900);
  };

  const handleClearKey = () => {
    setApiKey('');
    setTestResult(null);
    saveOpenRouterConfig({
      apiKey: '',
      model: selectedModel,
      siteUrl: window.location.origin,
      siteName: 'SkillSync AI Mock Interview'
    });
    if (onConfigSaved) onConfigSaved({ apiKey: '', model: selectedModel });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(5, 7, 15, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '1rem'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '560px',
        borderRadius: '1.25rem',
        padding: '2rem',
        background: 'var(--bg-surface-elevated)',
        border: '1px solid var(--primary-lavender-border)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px var(--primary-lavender-subtle)',
        position: 'relative',
        animation: 'fadeIn 0.2s ease-out'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--primary-lavender), #3b82f6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <Cpu size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
                OpenRouter AI Settings
              </h2>
              <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                Power real-time interview evaluation & dynamic track generation
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'var(--bg-subtle)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* API Key Input */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Key size={15} color="var(--primary-lavender)" /> OpenRouter API Key
            </label>
            <a
              href="https://openrouter.ai/keys"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.75rem',
                color: 'var(--primary-lavender)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontWeight: '600'
              }}
            >
              Get Free Key <ExternalLink size={12} />
            </a>
          </div>

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                setTestResult(null);
              }}
              placeholder="sk-or-v1-..."
              className="input-field"
              style={{
                width: '100%',
                paddingRight: '4.5rem',
                fontSize: '0.9rem',
                fontFamily: showKey ? 'inherit' : 'monospace'
              }}
            />

            <div style={{ position: 'absolute', right: '8px', display: 'flex', gap: '4px' }}>
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '4px'
                }}
                title={showKey ? 'Hide key' : 'Show key'}
              >
                {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>

              {apiKey && (
                <button
                  type="button"
                  onClick={handleClearKey}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ef4444',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                  title="Clear Key"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
            Key is stored locally in your browser and used only to contact OpenRouter AI directly.
          </p>
        </div>

        {/* Model Selection */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
            <Cpu size={15} color="var(--accent-mint)" /> Select AI Model
          </label>

          <select
            value={selectedModel}
            onChange={(e) => {
              setSelectedModel(e.target.value);
              setTestResult(null);
            }}
            className="input-field"
            style={{ width: '100%', fontSize: '0.9rem', marginBottom: '0.75rem' }}
          >
            {OPENROUTER_POPULAR_MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.provider}) — [{m.badge}]
              </option>
            ))}
          </select>

          {/* Quick Model Pill Selectors */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {OPENROUTER_POPULAR_MODELS.map((m) => {
              const active = selectedModel === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setSelectedModel(m.id);
                    setTestResult(null);
                  }}
                  style={{
                    padding: '0.3rem 0.65rem',
                    fontSize: '0.725rem',
                    borderRadius: '20px',
                    border: active ? '1px solid var(--primary-lavender)' : '1px solid var(--border-color)',
                    background: active ? 'var(--primary-lavender-subtle)' : 'var(--bg-subtle)',
                    color: active ? 'var(--primary-lavender)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    fontWeight: active ? '800' : '600',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {m.provider}: {m.badge}
                </button>
              );
            })}
          </div>
        </div>

        {/* Test Connection Feedback */}
        {testResult && (
          <div style={{
            marginBottom: '1.25rem',
            padding: '0.75rem 1rem',
            borderRadius: '0.75rem',
            fontSize: '0.825rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: testResult.success ? 'var(--accent-mint-subtle)' : 'rgba(239, 68, 68, 0.12)',
            color: testResult.success ? 'var(--accent-mint)' : '#ef4444',
            border: `1px solid ${testResult.success ? 'var(--accent-mint-border)' : 'rgba(239,68,68,0.3)'}`
          }}>
            {testResult.success ? (
              <>
                <CheckCircle2 size={16} />
                <span>
                  <strong>Connected successfully!</strong> Latency: {testResult.latency}ms ({selectedModel})
                </span>
              </>
            ) : (
              <>
                <AlertCircle size={16} />
                <span>
                  <strong>Connection failed:</strong> {testResult.error}
                </span>
              </>
            )}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid var(--border-color-subtle)' }}>
          <button
            type="button"
            onClick={handleTestConnection}
            disabled={isTesting || !apiKey.trim()}
            className="btn btn-secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.85rem',
              padding: '0.6rem 1rem',
              opacity: !apiKey.trim() ? 0.5 : 1
            }}
          >
            {isTesting ? <Activity size={15} className="animate-spin" /> : <Zap size={15} color="var(--primary-lavender)" />}
            {isTesting ? 'Testing Ping...' : 'Test Connection'}
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="btn btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.85rem',
              fontWeight: '800',
              padding: '0.6rem 1.4rem'
            }}
          >
            {saveSuccess ? <CheckCircle2 size={16} /> : <Sparkles size={16} />}
            {saveSuccess ? 'Saved!' : 'Save & Activate'}
          </button>
        </div>
      </div>
    </div>
  );
};
