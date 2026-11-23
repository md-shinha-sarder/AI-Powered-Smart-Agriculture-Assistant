import { useEffect, useRef, useState } from 'react'
import { Activity, Bot, Check, ChevronDown, CircleHelp, CloudSun, FileImage, Leaf, LoaderCircle, Plus, Send, ShieldCheck, Sprout, Stethoscope, Trash2, Waves, X } from 'lucide-react'
import './FarmAdvisor.css'

const crops = ['Rice', 'Wheat', 'Tomato', 'Potato', 'Maize', 'Chili', 'Jute', 'Other']
const stages = ['Seedling', 'Vegetative', 'Flowering', 'Fruiting / grain filling', 'Harvest']
const prompts = [
  { icon: Stethoscope, title: 'Diagnose a crop problem', question: 'The leaves on my crop are turning yellow. What should I check first?' },
  { icon: Waves, title: 'Plan irrigation', question: 'How can I tell whether my field needs irrigation today?' },
  { icon: Sprout, title: 'Improve soil health', question: 'What practical steps can improve soil health for my next planting?' },
]
const storageKey = 'fieldwise-conversations-v1'
const emptyMessages = []

function readConversations() {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) ?? '[]')
    return Array.isArray(stored) ? stored : []
  } catch {
    return []
  }
}

function imageAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result).split(',')[1])
    reader.onerror = () => reject(new Error('The photo could not be read.'))
    reader.readAsDataURL(file)
  })
}

function FarmAdvisor() {
  const [conversations, setConversations] = useState(readConversations)
  const [activeId, setActiveId] = useState(null)
  const [crop, setCrop] = useState('Rice')
  const [stage, setStage] = useState('Vegetative')
  const [region, setRegion] = useState('')
  const [language, setLanguage] = useState('English')
  const [question, setQuestion] = useState('')
  const [photo, setPhoto] = useState(null)
  const [loading, setLoading] = useState(false)
  const [apiStatus, setApiStatus] = useState('checking')
  const [notice, setNotice] = useState('')
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)
  const activeConversation = conversations.find((item) => item.id === activeId)
  const messages = activeConversation?.messages ?? emptyMessages

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(conversations))
  }, [conversations])

  useEffect(() => {
    let active = true
    async function checkApi() {
      try {
        const response = await fetch('/api/health')
        const data = await response.json()
        if (active) setApiStatus(data.configured ? 'ready' : 'missing')
      } catch {
        if (active) setApiStatus('offline')
      }
    }
    checkApi()
    const intervalId = window.setInterval(checkApi, 8000)
    return () => {
      active = false
      window.clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, loading])

  function updateConversation(id, transform) {
    setConversations((current) => current.map((item) => item.id === id ? transform(item) : item))
  }

  function startConversation() {
    setActiveId(null)
    setQuestion('')
    setPhoto(null)
    setNotice('')
  }

  async function submitQuestion(event) {
    event.preventDefault()
    const text = question.trim()
    if (!text || loading) return

    const id = activeId ?? crypto.randomUUID()
    const userMessage = { id: crypto.randomUUID(), role: 'user', text, photoName: photo?.name ?? '', createdAt: Date.now() }
    const existing = conversations.find((item) => item.id === id)
    if (existing) {
      updateConversation(id, (item) => ({ ...item, messages: [...item.messages, userMessage], updatedAt: Date.now() }))
    } else {
      setConversations((current) => [{ id, title: text.slice(0, 52), updatedAt: Date.now(), messages: [userMessage] }, ...current])
      setActiveId(id)
    }

    setQuestion('')
    setNotice('')
    setLoading(true)
    try {
      const image = photo ? { data: await imageAsBase64(photo), mimeType: photo.type } : null
      const response = await fetch('/api/advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, crop, stage, region, language, image }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error ?? 'The advisor could not answer right now.')
      updateConversation(id, (item) => ({
        ...item,
        updatedAt: Date.now(),
        messages: [...item.messages, { id: crypto.randomUUID(), role: 'assistant', text: result.answer, createdAt: Date.now() }],
      }))
    } catch (error) {
      updateConversation(id, (item) => ({
        ...item,
        messages: [...item.messages, { id: crypto.randomUUID(), role: 'assistant', text: `I could not reach the agriculture advisor. ${error.message}`, failed: true, createdAt: Date.now() }],
      }))
      setNotice('Check the API connection and try again.')
    } finally {
      setLoading(false)
      setPhoto(null)
    }
  }

  function removeConversation(id, event) {
    event.stopPropagation()
    setConversations((current) => current.filter((item) => item.id !== id))
    if (activeId === id) startConversation()
  }

  function choosePrompt(text) {
    setQuestion(text)
    document.querySelector('#question-input')?.focus()
  }

  return <div className="app-shell">
    <aside className="sidebar">
      <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); startConversation() }}>
        <span className="brand-icon"><Sprout size={20} /></span>
        <span className="brand-name">Fieldwise<small>AGRICULTURE AI</small></span>
      </a>
      <button className="new-chat-button" onClick={startConversation}><Plus size={17} /> New question <span>+</span></button>
      <div className="sidebar-label">YOUR FIELD DESK</div>
      <div className="field-profile">
        <span className="field-symbol"><Leaf size={17} /></span>
        <span><strong>My farm</strong><small>Crop advice workspace</small></span>
        <ChevronDown size={14} />
      </div>
      <div className="sidebar-label recent-label">RECENT QUESTIONS</div>
      <div className="conversation-list">
        {conversations.map((conversation) => <button className={`conversation-item ${activeId === conversation.id ? 'conversation-active' : ''}`} key={conversation.id} onClick={() => { setActiveId(conversation.id); setNotice('') }}>
          <span>{conversation.title}</span><Trash2 size={14} onClick={(event) => removeConversation(conversation.id, event)} aria-label="Delete conversation" />
        </button>)}
        {conversations.length === 0 && <p className="empty-history">Your questions will be saved here.</p>}
      </div>
      <div className="sidebar-foot"><span className="avatar">F</span><span><strong>Farm assistant</strong><small>Advice, in your language</small></span><CircleHelp size={16} /></div>
    </aside>

    <main className="main-workspace">
      <header className="topbar">
        <div className="breadcrumbs"><strong>AI-Powered-Smart-Agriculture-Assistant</strong><span className="breadcrumb-divider">/</span><span>AI advisor</span></div>
        <div className={`connection-status status-${apiStatus}`}><i />{apiStatus === 'ready' ? 'AI connected' : apiStatus === 'missing' ? 'API key needed' : apiStatus === 'offline' ? 'API offline' : 'Connecting'}</div>
      </header>

      <div className="workspace-grid">
        <section className="advisor-column">
          <div className="advisor-heading">
            <div className="advisor-avatar"><Bot size={20} /></div>
            <div><p className="eyebrow">YOUR AGRICULTURE ADVISOR</p><h1>What is happening in your field?</h1><p>Describe a crop issue and get clear next steps shaped around your farm.</p></div>
          </div>

          <div className="context-bar">
            <label><span>Crop</span><select value={crop} onChange={(event) => setCrop(event.target.value)}>{crops.map((item) => <option key={item}>{item}</option>)}</select></label>
            <span className="context-separator" />
            <label><span>Growth stage</span><select value={stage} onChange={(event) => setStage(event.target.value)}>{stages.map((item) => <option key={item}>{item}</option>)}</select></label>
            <span className="context-separator" />
            <label className="location-label"><span>Farm location</span><input value={region} onChange={(event) => setRegion(event.target.value)} placeholder="Add area or district" /></label>
          </div>

          <div className={`conversation-panel ${messages.length ? 'has-messages' : ''}`}>
            {messages.length === 0 ? <div className="welcome-state">
              <span className="welcome-kicker"><span />FIELDWISE AI</span>
              <h2>Better decisions<br />start with a good question.</h2>
              <p>Tell me what you see, when it started, and what you have already tried. A crop photo can help me understand the problem.</p>
              <div className="prompt-list">{prompts.map(({ icon: Icon, title, question: prompt }) => <button className="prompt-card" key={title} onClick={() => choosePrompt(prompt)}><span className="prompt-icon"><Icon size={17} /></span><span><strong>{title}</strong><small>{prompt}</small></span><ArrowUpIcon /></button>)}</div>
            </div> : <div className="message-list">{messages.map((message) => <article className={`message message-${message.role} ${message.failed ? 'message-failed' : ''}`} key={message.id}>
              <span className="message-avatar">{message.role === 'assistant' ? <Bot size={16} /> : 'F'}</span>
              <div className="message-body"><span className="message-author">{message.role === 'assistant' ? 'Fieldwise advisor' : 'You'}</span><p>{message.text}</p>{message.photoName && <span className="attached-name"><FileImage size={13} />{message.photoName}</span>}</div>
            </article>)}{loading && <div className="thinking-state"><span className="message-avatar"><Bot size={16} /></span><span><LoaderCircle size={16} className="spin" /> Reviewing your field details...</span></div>}<div ref={messagesEndRef} /></div>}
          </div>

          <form className="question-composer" onSubmit={submitQuestion}>
            {photo && <div className="photo-chip"><FileImage size={16} /><span>{photo.name}</span><button type="button" onClick={() => setPhoto(null)} aria-label="Remove photo"><X size={14} /></button></div>}
            <textarea id="question-input" value={question} onChange={(event) => setQuestion(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit() } }} placeholder="Describe a problem, ask for a plan, or share what you observe..." rows={3} maxLength={3000} />
            <div className="composer-toolbar">
              <div className="composer-options"><button type="button" className="photo-button" onClick={() => fileInputRef.current?.click()}><FileImage size={15} /><span>Add crop photo</span></button><input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={(event) => { const selected = event.target.files?.[0]; if (selected && selected.size > 3 * 1024 * 1024) { setNotice('Choose a crop photo smaller than 3 MB.'); event.target.value = ''; return } setPhoto(selected ?? null); setNotice('') }} /><label className="language-select">Reply in<select value={language} onChange={(event) => setLanguage(event.target.value)}><option>English</option><option>Bangla</option></select><ChevronDown size={12} /></label></div>
              <span className="character-count">{question.length}/3000</span>
              <button className="send-button" type="submit" disabled={!question.trim() || loading} aria-label="Send question">{loading ? <LoaderCircle size={17} className="spin" /> : <Send size={17} />}</button>
            </div>
            {notice && <p className="request-notice">{notice}</p>}
          </form>
          <p className="advisory-disclaimer"><ShieldCheck size={13} /> AI guidance can be wrong. Confirm high-risk treatment decisions with a local agriculture expert.</p>
        </section>

        <aside className="insight-column">
          <section className="field-photo-card"><img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=85" alt="Green agricultural fields under a bright sky" /><div className="photo-overlay"><span>FIELD NOTES</span><strong>Every field<br />has a story.</strong></div><span className="photo-index">01 / 04</span></section>
          <section className="guidance-card"><div className="card-heading"><span className="mini-icon"><Activity size={15} /></span><span>GET MORE USEFUL ADVICE</span></div><h2>A little context<br />goes a long way.</h2><ul><li><Check size={14} />Mention when the issue began</li><li><Check size={14} />Describe affected leaves or stems</li><li><Check size={14} />Share recent rain or watering</li><li><Check size={14} />Attach a clear, close photo</li></ul><div className="context-tip"><CloudSun size={16} /><span>Add your district for locally relevant guidance.</span></div></section>
          <section className="trust-card"><span className="trust-icon"><ShieldCheck size={18} /></span><div><strong>Advice with care</strong><p>Suggestions are educational, not a substitute for local expertise or product labels.</p></div></section>
          <div className="api-footnote"><span className={`api-led led-${apiStatus}`} />{apiStatus === 'missing' ? 'Set GEMINI_API_KEY to enable answers.' : apiStatus === 'offline' ? 'Start the API server to connect.' : 'Your question is sent securely through the app server.'}</div>
        </aside>
      </div>
    </main>
  </div>
}

function ArrowUpIcon() {
  return <span className="prompt-arrow">↗</span>
}

export default FarmAdvisor