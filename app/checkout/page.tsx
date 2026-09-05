"use client";
import { useSearchParams } from 'next/navigation';
import { useState, Suspense, useEffect } from 'react';
import { Lock, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'Nuvora System';
  const price = searchParams.get('price') ? parseInt(searchParams.get('price') as string) : 150000;
  
  const [loading, setLoading] = useState(false);
  const [showFlashOffer, setShowFlashOffer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0 && !sessionStorage.getItem("flashShown")) {
            setShowFlashOffer(true);
            sessionStorage.setItem("flashShown", "true");
        }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  useEffect(() => {
    if (showFlashOffer && timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
        return () => clearTimeout(timer);
    }
  }, [showFlashOffer, timeLeft]);

  const handleStandardCheckout = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/standard-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, price })
        });
        const data = await res.json();
        if (data.url) {
            window.location.href = data.url;
        } else {
            alert(`Checkout failed: ${data.error || 'Unknown error'}`);
        }
      } catch (e) {
          alert("Network error.");
      }
      setLoading(false);
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#050505', color: '#fff', fontFamily: "'Outfit', sans-serif", padding: '60px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '40px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShoppingCart size={32} /> Your Cart
        </h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '40px' }}>
            <div className="glass-panel" style={{ padding: '30px', borderRadius: '16px' }}>
                <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px', marginBottom: '24px' }}>Items</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '18px' }}>
                    <div>
                        <div style={{ fontWeight: 600 }}>{name}</div>
                        <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Standard Configuration</div>
                    </div>
                    <div>₹{price.toLocaleString("en-IN")}</div>
                </div>
            </div>

            <div className="glass-panel" style={{ padding: '30px', borderRadius: '16px', height: 'fit-content' }}>
                <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px', marginBottom: '24px' }}>Order Summary</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: 'var(--text-secondary)' }}>
                    <span>Subtotal</span>
                    <span>₹{price.toLocaleString("en-IN")}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: 'var(--text-secondary)' }}>
                    <span>Shipping</span>
                    <span>Free</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', fontSize: '20px', fontWeight: 600, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
                    <span>Total</span>
                    <span>₹{price.toLocaleString("en-IN")}</span>
                </div>
                
                <button className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }} onClick={handleStandardCheckout} disabled={loading}>
                    {loading ? "Processing..." : <><Lock size={18} /> Secure Checkout</>}
                </button>

                <div style={{ marginTop: '24px', textAlign: 'center' }}>
                   <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px' }}>← Back to Store</Link>
                </div>
            </div>
        </div>
      </div>
      
      {showFlashOffer && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <div style={{ backgroundColor: '#111827', padding: '40px', borderRadius: '16px', maxWidth: '500px', width: '90%', border: '2px solid #10b981', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
                 <div style={{ fontSize: '14px', textTransform: 'uppercase', color: '#10b981', fontWeight: 800, letterSpacing: '2px', marginBottom: '16px' }}>⚡️ Flash Bundle Unlocked</div>
                 <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '20px', color: '#fff' }}>Wait! Don't leave empty-handed.</h2>
                 <p style={{ color: '#9ca3af', marginBottom: '30px', fontSize: '16px', lineHeight: 1.6 }}>
                    Complete your checkout right now, and the AI will automatically bundle the <strong>Creator Mouse</strong> and <strong>Priority Setup</strong> for absolutely FREE.
                 </p>
                 <div style={{ fontSize: '48px', fontWeight: 800, color: timeLeft < 10 ? '#ef4444' : '#fff', marginBottom: '30px', fontVariantNumeric: 'tabular-nums' }}>
                    00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                 </div>
                 <div style={{ display: 'flex', gap: '16px' }}>
                     <button onClick={() => setShowFlashOffer(false)} style={{ flex: 1, backgroundColor: 'transparent', border: '1px solid #374151', color: '#d1d5db', padding: '16px', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}>No thanks</button>
                     <button onClick={handleStandardCheckout} disabled={loading || timeLeft === 0} style={{ flex: 2, backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '16px', borderRadius: '8px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', opacity: timeLeft === 0 ? 0.5 : 1 }}>
                        {loading ? 'Processing...' : 'Claim Free Bundle & Checkout'}
                     </button>
                 </div>
             </div>
          </div>
      )}
    </div>
  );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div style={{ padding: '40px', color: '#fff' }}>Loading cart...</div>}>
            <CheckoutContent />
        </Suspense>
    )
}
