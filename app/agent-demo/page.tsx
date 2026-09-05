'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Globe, Cpu, CreditCard, ArrowRight } from 'lucide-react';

export default function AgentDemoPage() {
  const [discoveryData, setDiscoveryData] = useState<any>(null);
  const [negotiateResponse, setNegotiateResponse] = useState<any>(null);
  const [checkoutResponse, setCheckoutResponse] = useState<any>(null);
  
  const [productId, setProductId] = useState('p1');
  const [buyerIntent, setBuyerIntent] = useState('I am looking for a laptop for software development and want a good deal.');
  const [loading, setLoading] = useState(false);

  const fetchDiscovery = async () => {
    try {
      const res = await fetch('/.well-known/nuvora.json');
      const data = await res.json();
      setDiscoveryData(data);
    } catch (error) {
      console.error('Error fetching discovery data:', error);
    }
  };

  const submitNegotiation = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/agent/negotiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, buyerIntent })
      });
      const data = await res.json();
      setNegotiateResponse(data);
    } catch (error) {
      console.error('Error in negotiation:', error);
    } finally {
      setLoading(false);
    }
  };

  const completeCheckout = async () => {
    if (!negotiateResponse?.offer) return;
    setLoading(true);
    try {
      const res = await fetch('/api/agent/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: negotiateResponse.offer.productId,
          addonIds: negotiateResponse.offer.addons,
          agreedPrice: negotiateResponse.offer.finalPrice
        })
      });
      const data = await res.json();
      setCheckoutResponse(data);
    } catch (error) {
      console.error('Error in checkout:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <Link href="/" style={{ color: '#00d2ff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <ArrowRight style={{ transform: 'rotate(180deg)' }} size={16} /> Back to Home
          </Link>
          <h1 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>Agent Commerce Protocol</h1>
          <p style={{ color: '#aaa', fontSize: '1.2rem', margin: 0 }}>Making Nuvora AI-discoverable and transactable for machine buyers.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          
          {/* DISCOVER PANEL */}
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Globe color="#00d2ff" />
              <h2 style={{ margin: 0, fontSize: '1.25rem' }}>1. DISCOVER</h2>
            </div>
            <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1rem' }}>Agents read the .well-known manifest to learn about the merchant API.</p>
            
            <div style={{ background: '#111', padding: '1rem', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.85rem', marginBottom: '1rem', color: '#00d2ff' }}>
              GET /.well-known/nuvora.json
            </div>
            
            <button 
              onClick={fetchDiscovery}
              style={{ background: '#00d2ff', color: '#000', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', width: '100%', marginBottom: '1rem' }}
            >
              Fetch Manifest
            </button>

            {discoveryData && (
              <pre style={{ background: '#0a0a0a', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.8rem', color: '#ddd', border: '1px solid #222' }}>
                {JSON.stringify(discoveryData, null, 2)}
              </pre>
            )}
          </div>

          {/* NEGOTIATE PANEL */}
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Cpu color="#00d2ff" />
              <h2 style={{ margin: 0, fontSize: '1.25rem' }}>2. NEGOTIATE</h2>
            </div>
            <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1rem' }}>Machine-to-machine negotiation API to find optimal bundles and pricing.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
              <select 
                value={productId}
                onChange={e => setProductId(e.target.value)}
                style={{ background: '#111', color: '#fff', border: '1px solid #333', padding: '0.75rem', borderRadius: '6px', outline: 'none' }}
              >
                <option value="p1">Nuvora Pro X (₹1,50,000)</option>
                <option value="p2">Nuvora Air (₹95,000)</option>
                <option value="p3">Nuvora Studio (₹2,80,000)</option>
                <option value="p4">Nuvora Gaming G-Series (₹2,15,000)</option>
                <option value="p5">Nuvora Dev Edition (₹1,85,000)</option>
                <option value="p6">Nuvora Lite (₹55,000)</option>
              </select>
              
              <textarea 
                value={buyerIntent}
                onChange={e => setBuyerIntent(e.target.value)}
                rows={3}
                style={{ background: '#111', color: '#fff', border: '1px solid #333', padding: '0.75rem', borderRadius: '6px', outline: 'none', resize: 'none' }}
                placeholder="Enter buyer intent..."
              />
            </div>
            
            <button 
              onClick={submitNegotiation}
              disabled={loading}
              style={{ background: '#00d2ff', color: '#000', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', width: '100%', marginBottom: '1rem', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Negotiating...' : 'Send Request'}
            </button>

            {negotiateResponse && (
              <pre style={{ background: '#0a0a0a', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.8rem', color: '#ddd', border: '1px solid #222' }}>
                {JSON.stringify(negotiateResponse, null, 2)}
              </pre>
            )}
          </div>

          {/* CHECKOUT PANEL */}
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <CreditCard color="#00e676" />
              <h2 style={{ margin: 0, fontSize: '1.25rem' }}>3. CHECKOUT</h2>
            </div>
            <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1rem' }}>Re-validates the agreed offer against policies and generates a payment link.</p>
            
            {!negotiateResponse?.offer ? (
              <div style={{ color: '#555', textAlign: 'center', padding: '2rem', border: '1px dashed #333', borderRadius: '8px' }}>
                Complete negotiation first
              </div>
            ) : (
              <>
                <div style={{ background: '#111', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #333' }}>
                  <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.5rem' }}>Approved Offer:</div>
                  <div style={{ color: '#fff' }}>Product: {negotiateResponse.offer.productId}</div>
                  <div style={{ color: '#fff' }}>Price: ₹{negotiateResponse.offer.finalPrice}</div>
                  {negotiateResponse.offer.addons?.length > 0 && (
                    <div style={{ color: '#fff' }}>Addons: {negotiateResponse.offer.addons.join(', ')}</div>
                  )}
                </div>

                <button 
                  onClick={completeCheckout}
                  disabled={loading}
                  style={{ background: '#00e676', color: '#000', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', width: '100%', marginBottom: '1rem', opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? 'Processing...' : 'Complete Purchase'}
                </button>

                {checkoutResponse && (
                  <div style={{ background: '#0a0a0a', padding: '1rem', borderRadius: '8px', border: '1px solid #222' }}>
                    <div style={{ color: checkoutResponse.status === 'PAYMENT_LINK_GENERATED' ? '#00e676' : '#ff3366', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                      {checkoutResponse.status || 'ERROR'}
                    </div>
                    {checkoutResponse.url && (
                      <a href={checkoutResponse.url} target="_blank" rel="noreferrer" style={{ color: '#00d2ff', textDecoration: 'none', wordBreak: 'break-all' }}>
                        {checkoutResponse.url}
                      </a>
                    )}
                    {checkoutResponse.reason && (
                      <div style={{ color: '#ff3366', fontSize: '0.9rem' }}>{checkoutResponse.reason}</div>
                    )}
                    {checkoutResponse.error && (
                      <div style={{ color: '#ff3366', fontSize: '0.9rem' }}>{checkoutResponse.error}</div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
