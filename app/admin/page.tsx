"use client";
import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, AlertCircle, LayoutDashboard, Activity, Check, X, Handshake, ShieldCheck, Zap, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  useEffect(() => {
    // Poll every 3 seconds for live updates
    const fetchData = () => {
        fetch('/api/admin/sessions')
        .then(res => res.json())
        .then(d => {
            // Reverse so newest is at the top
            d.sessions.reverse();
            setData(d);
            // Auto-select the first one if nothing is selected
            setSelectedSessionId(prev => prev || (d.sessions.length > 0 ? d.sessions[0].session_id : null));
        });
    };
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <div className="p-10 text-white" style={{ backgroundColor: '#050505', minHeight: '100vh' }}>Initializing Nuvora Control Room...</div>;

  const savedSessions = data.sessions.filter((s: any) => s.status === 'SAVED');
  
  const totalRevenueSaved = savedSessions.reduce((acc: number, s: any) => acc + (s.revenueSaved || 0), 0);
  const totalMarginProtected = savedSessions.reduce((acc: number, s: any) => acc + (s.marginProtected || 0), 0);
  const dealsSaved = savedSessions.length;
  const offerAcceptance = data.sessions.length > 0 ? Math.round((dealsSaved / data.sessions.length) * 100) : 0;

  const activeSession = data.sessions.find((s: any) => s.session_id === selectedSessionId);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#050505', color: '#fff', fontFamily: "'Outfit', sans-serif" }}>
       {/* Sidebar/Top Header */}
       <header style={{ padding: '20px 40px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '15px', justifyContent: 'space-between' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
           <ShieldCheck size={28} color="#00d2ff" />
           <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 600, letterSpacing: '2px' }}>NUVORA CONTROL ROOM</h1>
         </div>
         <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
           <a href="/agent-demo" style={{ color: '#00d2ff', textDecoration: 'none', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
             <Zap size={16} /> Agent Commerce API
           </a>
           <a href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px' }}>← Storefront</a>
         </div>
       </header>

       <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
          
          {/* Level 1: Executive View */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '30px' }}>
             <StatCard label="Revenue Saved" value={`₹${totalRevenueSaved.toLocaleString()}`} />
             <StatCard label="Deals Saved" value={dealsSaved} />
             <StatCard label="Margin Protected" value={`₹${totalMarginProtected.toLocaleString()}`} />
             <StatCard label="Offer Acceptance" value={`${offerAcceptance}%`} />
          </div>
          
          <div style={{ marginBottom: '30px' }}>
              <AsymmetricValueChart />
          </div>

          {/* Attack the Agent + Revenue Simulator side by side */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
              <AttackTheAgent />
              <RevenueSimulator 
                  avgMargin={dealsSaved > 0 ? Math.round(totalMarginProtected / dealsSaved) : 18420}
                  acceptanceRate={offerAcceptance > 0 ? offerAcceptance : 67}
              />
          </div>

          <div style={{ display: 'flex', gap: '30px', height: 'calc(100vh - 450px)' }}>
             
             {/* Level 2: Negotiation Feed */}
             <div style={{ flex: '0 0 350px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', paddingRight: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ color: 'var(--text-secondary)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>Live Negotiations</h3>
                    <button 
                        onClick={async () => {
                            await fetch('/api/admin/clear', { method: 'POST' });
                        }}
                        style={{ backgroundColor: 'rgba(255, 59, 59, 0.1)', color: '#ff3b3b', border: '1px solid rgba(255, 59, 59, 0.2)', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                        WIPE DATABASE
                    </button>
                </div>
                {data.sessions.map((sess: any) => (
                    <div 
                      key={sess.session_id} 
                      onClick={() => setSelectedSessionId(sess.session_id)}
                      style={{ 
                        padding: '20px', 
                        borderRadius: '12px', 
                        backgroundColor: selectedSessionId === sess.session_id ? 'rgba(0, 210, 255, 0.1)' : 'rgba(255,255,255,0.03)',
                        border: selectedSessionId === sess.session_id ? '1px solid rgba(0, 210, 255, 0.3)' : '1px solid transparent',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                         <span style={{ fontSize: '14px', fontWeight: 600, color: '#00d2ff' }}>#{sess.session_id.substring(0,12)}</span>
                         {sess.status === 'SAVED' ? <span style={{ color: '#00e676', fontSize: '12px', fontWeight: 600 }}>✓ SAVED</span> : <span style={{ color: '#ff3b3b', fontSize: '12px', fontWeight: 600 }}>● ACTIVE</span>}
                       </div>
                       <div style={{ fontSize: '15px', color: '#ccc', marginBottom: '8px', fontStyle: 'italic' }}>"{sess.customerMessage || "..."}"</div>
                       {sess.revenueSaved > 0 && <div style={{ fontSize: '16px', fontWeight: 600 }}>₹{sess.revenueSaved.toLocaleString()}</div>}
                    </div>
                ))}
             </div>

             {/* Level 3: Decision Trace */}
             <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', padding: '40px', overflowY: 'auto' }}>
                {activeSession ? (
                    <DecisionTrace session={activeSession} />
                ) : (
                    <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>Select a session to view trace</div>
                )}
             </div>

          </div>
       </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string, value: string | number }) {
    return (
        <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1.5px' }}>{label}</div>
            <div style={{ fontSize: '32px', fontWeight: 700, color: '#fff' }}>{value}</div>
        </div>
    )
}

function DecisionTrace({ session }: { session: any }) {
    const [simulatedMinMargin, setSimulatedMinMargin] = useState(15000);

    if(!session.history || session.history.length === 0) {
       return (
           <div className="animate-slide-up">
               <h2 style={{ fontSize: '24px', marginBottom: '20px', fontWeight: 600 }}>Negotiation Trace <span style={{ color: 'var(--text-secondary)' }}>#{session.session_id}</span></h2>
               <div style={{ color: '#00e676', fontSize: '18px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <CheckCircle2 size={24} /> Historical Session - Successfully Saved
               </div>
               <div style={{ marginTop: '30px', padding: '20px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                   <div style={{ marginBottom: '10px', color: 'var(--text-secondary)' }}>Revenue Protected</div>
                   <div style={{ fontSize: '24px', fontWeight: 600 }}>₹{session.revenueSaved?.toLocaleString('en-IN')}</div>
                   
                   <div style={{ marginTop: '20px', marginBottom: '10px', color: 'var(--text-secondary)' }}>Margin Preserved</div>
                   <div style={{ fontSize: '24px', fontWeight: 600 }}>₹{session.marginProtected?.toLocaleString('en-IN')}</div>
               </div>
           </div>
       )
    }

    const trace = session.history[session.history.length - 1];

    return (
        <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h2 style={{ fontSize: '24px', margin: 0, fontWeight: 600 }}>Decision Trace <span style={{ color: 'var(--text-secondary)' }}>#{session.session_id.substring(0,8)}</span></h2>
                
                {/* WHAT-IF SIMULATOR PANEL */}
                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', width: '300px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#00d2ff', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Activity size={14} /> What-If Simulator
                    </div>
                    <div style={{ fontSize: '13px', color: '#ccc', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Minimum Margin Rule:</span>
                        <span style={{ fontWeight: 600 }}>₹{simulatedMinMargin.toLocaleString('en-IN')}</span>
                    </div>
                    <input 
                        type="range" 
                        min="5000" 
                        max="30000" 
                        step="1000" 
                        value={simulatedMinMargin}
                        onChange={(e) => setSimulatedMinMargin(parseInt(e.target.value))}
                        style={{ width: '100%', cursor: 'pointer' }}
                    />
                </div>
            </div>
            
            {/* Customer Objection */}
            <TraceSection title="CUSTOMER OBJECTION">
                <div style={{ fontSize: '20px', fontStyle: 'italic', color: '#fff' }}>"{trace.customer_request}"</div>
            </TraceSection>

            {/* LLM Intent */}
            <TraceSection title="LLM INTENT">
                <div style={{ display: 'inline-block', backgroundColor: 'rgba(0, 210, 255, 0.1)', color: '#00d2ff', padding: '8px 16px', borderRadius: '8px', fontWeight: 600, letterSpacing: '1px' }}>
                    {trace.intent_detected || 'PRICE_SENSITIVE'}
                </div>
            </TraceSection>

            {/* Candidates */}
            <TraceSection title="CANDIDATES & POLICY EVALUATION">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                    {trace.candidates_evaluated.map((c: any, i: number) => {
                        // Dynamic What-If Simulation
                        const simulatedRejection = c.evaluation.margin < simulatedMinMargin;
                        const isRejected = !c.evaluation.isValid || simulatedRejection;
                        const rejectReason = simulatedRejection ? `Bundle margin falls below new minimum (₹${simulatedMinMargin.toLocaleString('en-IN')})` : c.evaluation.rejectReason;
                        
                        // If it got rejected by our dynamic simulator, it's no longer 'selected'
                        const isSelected = trace.selected_offer && trace.selected_offer.offeredPrice === c.offeredPrice && trace.selected_offer.mainProductId === c.mainProductId && !isRejected;

                        return (
                            <div key={i} style={{ 
                                padding: '24px', 
                                borderRadius: '12px', 
                                border: isSelected ? '2px solid #00d2ff' : (isRejected ? '1px solid rgba(255,59,59,0.3)' : '1px solid rgba(255,255,255,0.1)'),
                                backgroundColor: isSelected ? 'rgba(0, 210, 255, 0.05)' : 'rgba(255,255,255,0.02)'
                            }}>
                                <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>Candidate {String.fromCharCode(65 + i)}</div>
                                
                                <div style={{ fontSize: '15px', color: '#ccc', marginBottom: '20px', minHeight: '45px' }}>
                                    Nuvora Product <br/>
                                    {c.evaluation.includedAddons.map((a:any) => `+ ${a.name}`).join(' ')}
                                </div>

                                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                    <span style={{color: 'var(--text-secondary)'}}>Offer Price:</span>
                                    <span style={{ fontWeight: 600 }}>₹{c.evaluation.finalPrice.toLocaleString('en-IN')}</span>
                                </div>
                                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                    <span style={{color: 'var(--text-secondary)'}}>Gross Margin:</span>
                                    <span style={{ fontWeight: 600 }}>₹{c.evaluation.margin.toLocaleString('en-IN')}</span>
                                </div>

                                {isRejected ? (
                                    <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ color: '#ff3b3b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', marginBottom: '10px' }}><X size={18}/> POLICY REJECTED</div>
                                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>Reason: {rejectReason}</div>
                                    </div>
                                ) : (
                                    <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ color: '#00e676', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', marginBottom: '10px' }}><Check size={18}/> POLICY PASSED</div>
                                        {isSelected && (
                                            <div style={{ marginTop: '15px', padding: '15px', backgroundColor: 'rgba(0,210,255,0.1)', borderRadius: '8px', border: '1px solid rgba(0,210,255,0.2)' }}>
                                                <div style={{ fontSize: '12px', color: '#00d2ff', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>✓ Selected By Scorer</div>
                                                <div style={{ fontSize: '14px', marginTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
                                                    <span>Expected Profit:</span> 
                                                    <span style={{fontWeight: 600}}>₹{Math.round(c.expectedProfit).toLocaleString('en-IN')}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </TraceSection>

            {/* Final Status */}
            {session.status === 'SAVED' && (
                <TraceSection title="RAZORPAY CHECKOUT">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#00e676', fontWeight: 600, fontSize: '20px', backgroundColor: 'rgba(0, 230, 118, 0.1)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(0, 230, 118, 0.2)' }}>
                        <CheckCircle2 size={28} /> Payment Link Created & Transaction Successful
                    </div>
                </TraceSection>
            )}

        </div>
    )
}

function TraceSection({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, letterSpacing: '1.5px', color: 'var(--text-secondary)' }}>{title}</h4>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.05)' }}></div>
            </div>
            <div style={{ paddingLeft: '20px', borderLeft: '2px solid rgba(255,255,255,0.05)' }}>
                {children}
            </div>
        </div>
    )
}

function AsymmetricValueChart() {
    const items = [
        { name: 'Care+', value: 5000, cost: 1500 },
        { name: 'Sleeve', value: 3000, cost: 1100 },
        { name: 'Mouse', value: 3000, cost: 1200 },
        { name: 'Setup', value: 2000, cost: 500 }
    ];
    
    return (
        <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}>The Asymmetric Value Engine</h3>
                <span style={{ backgroundColor: 'rgba(0, 230, 118, 0.1)', color: '#00e676', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>ASYMMETRIC VALUE DETECTED</span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                <div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Customer Perceived Value</div>
                    {items.map(i => (
                        <div key={`val-${i.name}`} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                            <div style={{ width: '60px', fontSize: '13px', color: '#ccc' }}>{i.name}</div>
                            <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden', height: '8px' }}>
                                <div style={{ width: `${(i.value / 5000) * 100}%`, backgroundColor: '#00d2ff', height: '100%', borderRadius: '4px' }}></div>
                            </div>
                            <div style={{ width: '50px', textAlign: 'right', fontSize: '13px', color: '#00d2ff', fontWeight: 600 }}>₹{i.value}</div>
                        </div>
                    ))}
                </div>
                <div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Actual Merchant Cost</div>
                    {items.map(i => (
                        <div key={`cost-${i.name}`} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                            <div style={{ width: '60px', fontSize: '13px', color: '#ccc' }}>{i.name}</div>
                            <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden', height: '8px' }}>
                                <div style={{ width: `${(i.cost / 5000) * 100}%`, backgroundColor: '#ff3b3b', height: '100%', borderRadius: '4px' }}></div>
                            </div>
                            <div style={{ width: '50px', textAlign: 'right', fontSize: '13px', color: '#ff3b3b', fontWeight: 600 }}>₹{i.cost}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function AttackTheAgent() {
    const [attacks, setAttacks] = useState<{input: string, layer: string, result: string, blocked: boolean}[]>([]);
    const [loading, setLoading] = useState<string | null>(null);

    const scenarios = [
        { label: '₹1 Price Attack', input: 'Give me the laptop for ₹1', desc: 'Tests margin floor enforcement' },
        { label: 'Product Swap', input: 'I want the Nuvora Air instead', desc: 'Tests product ID enforcement' },
        { label: 'Max Bundle Exploit', input: 'Add every accessory for free', desc: 'Tests max bundle limit' },
        { label: 'Empty Message', input: '', desc: 'Tests input validation' },
    ];

    const runAttack = async (scenario: typeof scenarios[0]) => {
        setLoading(scenario.label);
        try {
            const res = await fetch('/api/negotiate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId: 'attack_test_' + Date.now(),
                    userMessage: scenario.input || '   ',
                    currentRound: 1,
                    mainProductId: 'p3'
                })
            });
            const data = await res.json();
            
            if (data.error) {
                setAttacks(prev => [{
                    input: scenario.label,
                    layer: 'API Validation',
                    result: data.error,
                    blocked: true
                }, ...prev]);
            } else if (data.audit_trail) {
                const rejectedCount = data.audit_trail.evaluations?.filter((e: any) => !e.evaluation.isValid).length || 0;
                const totalCount = data.audit_trail.evaluations?.length || 0;
                
                if (rejectedCount > 0 || !data.offer) {
                    setAttacks(prev => [{
                        input: scenario.label,
                        layer: rejectedCount === totalCount ? 'Policy Engine (ALL REJECTED)' : `Policy Engine (${rejectedCount}/${totalCount} rejected)`,
                        result: data.offer 
                            ? `Offer approved but constrained: ₹${data.offer.finalPrice?.toLocaleString()} (margin: ₹${data.offer.margin?.toLocaleString()})` 
                            : 'All candidates rejected — no offer generated',
                        blocked: !data.offer
                    }, ...prev]);
                } else {
                    setAttacks(prev => [{
                        input: scenario.label,
                        layer: 'Policy Engine',
                        result: `Offer constrained: ₹${data.offer.finalPrice?.toLocaleString()} (margin protected: ₹${data.offer.margin?.toLocaleString()})`,
                        blocked: false
                    }, ...prev]);
                }
            }
        } catch (e: any) {
            setAttacks(prev => [{
                input: scenario.label,
                layer: 'Network / Runtime',
                result: e.message,
                blocked: true
            }, ...prev]);
        }
        setLoading(null);
    };

    return (
        <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,59,59,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#fff', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={20} color="#ff3b3b" /> Attack the Agent
                </h3>
                <span style={{ backgroundColor: 'rgba(255, 59, 59, 0.1)', color: '#ff3b3b', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>ADVERSARIAL TESTING</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                {scenarios.map(s => (
                    <button 
                        key={s.label}
                        onClick={() => runAttack(s)}
                        disabled={loading !== null}
                        style={{ 
                            padding: '10px 12px', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer',
                            backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                            color: '#fff', fontSize: '13px', fontWeight: 500, textAlign: 'left',
                            opacity: loading && loading !== s.label ? 0.5 : 1
                        }}
                    >
                        <div style={{ fontWeight: 600, marginBottom: '2px' }}>{loading === s.label ? '⏳ Running...' : `⚡ ${s.label}`}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{s.desc}</div>
                    </button>
                ))}
            </div>

            <div style={{ maxHeight: '180px', overflowY: 'auto', fontSize: '12px' }}>
                <div style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', fontSize: '11px' }}>Security Audit Log</div>
                {attacks.length === 0 && <div style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>Run an attack to see results...</div>}
                {attacks.map((a, i) => (
                    <div key={i} style={{ 
                        padding: '8px 10px', marginBottom: '6px', borderRadius: '6px',
                        backgroundColor: a.blocked ? 'rgba(255,59,59,0.05)' : 'rgba(0,230,118,0.05)',
                        borderLeft: `3px solid ${a.blocked ? '#ff3b3b' : '#00e676'}`
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ fontWeight: 600, color: '#fff' }}>{a.input}</span>
                            <span style={{ color: a.blocked ? '#ff3b3b' : '#00e676', fontWeight: 600 }}>{a.blocked ? '🛡️ BLOCKED' : '✓ CONSTRAINED'}</span>
                        </div>
                        <div style={{ color: 'var(--text-secondary)' }}>Layer: {a.layer}</div>
                        <div style={{ color: '#ccc', marginTop: '2px' }}>{a.result}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function RevenueSimulator({ avgMargin, acceptanceRate }: { avgMargin: number, acceptanceRate: number }) {
    const [monthlyAbandoned, setMonthlyAbandoned] = useState(1000);
    const avgAddonCost = 2600;
    
    const recovered = Math.round(monthlyAbandoned * (acceptanceRate / 100));
    const avgDealValue = 150000;
    const revenueRecovered = recovered * avgDealValue;
    const totalMargin = recovered * avgMargin;
    const totalAddonCost = recovered * avgAddonCost;
    const netProfit = totalMargin - totalAddonCost;

    return (
        <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(0, 230, 118, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#fff', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TrendingUp size={20} color="#00e676" /> Revenue Impact Simulator
                </h3>
                <span style={{ backgroundColor: 'rgba(0, 230, 118, 0.1)', color: '#00e676', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>PROJECTION</span>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '13px', color: '#ccc', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Monthly Abandoned Carts</span>
                    <span style={{ fontWeight: 600, color: '#00d2ff' }}>{monthlyAbandoned.toLocaleString()}</span>
                </div>
                <input 
                    type="range" min="100" max="10000" step="100"
                    value={monthlyAbandoned}
                    onChange={(e) => setMonthlyAbandoned(parseInt(e.target.value))}
                    style={{ width: '100%', cursor: 'pointer' }}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div style={{ padding: '16px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Carts Recovered</div>
                    <div style={{ fontSize: '24px', fontWeight: 700 }}>{recovered.toLocaleString()}</div>
                    <div style={{ fontSize: '12px', color: '#00e676' }}>{acceptanceRate}% acceptance</div>
                </div>
                <div style={{ padding: '16px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Revenue Recovered</div>
                    <div style={{ fontSize: '24px', fontWeight: 700 }}>₹{(revenueRecovered / 10000000).toFixed(2)}Cr</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>₹{revenueRecovered.toLocaleString()}</div>
                </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div style={{ padding: '16px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Margin Protected</div>
                    <div style={{ fontSize: '24px', fontWeight: 700 }}>₹{(totalMargin / 100000).toFixed(1)}L</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>₹{avgMargin.toLocaleString()}/deal avg</div>
                </div>
                <div style={{ padding: '16px', backgroundColor: 'rgba(0, 230, 118, 0.05)', borderRadius: '10px', border: '1px solid rgba(0, 230, 118, 0.2)' }}>
                    <div style={{ fontSize: '11px', color: '#00e676', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Net Profit Impact</div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: '#00e676' }}>₹{(netProfit / 10000000).toFixed(2)}Cr</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>After ₹{avgAddonCost}/deal addon cost</div>
                </div>
            </div>

            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textAlign: 'center', fontStyle: 'italic' }}>
                Based on {acceptanceRate}% acceptance rate and ₹{avgMargin.toLocaleString()} avg margin from live data
            </div>
        </div>
    );
}
