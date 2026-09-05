"use client";
import { CheckCircle, Truck, Package, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#050505', color: '#fff', fontFamily: "'Outfit', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-panel" style={{ padding: '60px', borderRadius: '24px', maxWidth: '600px', width: '100%', textAlign: 'center', border: '1px solid rgba(0, 230, 118, 0.3)', backgroundColor: 'rgba(0, 230, 118, 0.02)' }}>
        <CheckCircle size={80} color="#00e676" style={{ margin: '0 auto 24px auto' }} />
        
        <h1 style={{ fontSize: '32px', marginBottom: '12px', fontWeight: 700 }}>Order Confirmed!</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', marginBottom: '40px' }}>
          Your payment was successful. We are now preparing your Nuvora system for dispatch.
        </p>

        <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '24px', marginBottom: '40px', textAlign: 'left' }}>
           <h3 style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', color: 'var(--text-secondary)' }}>Order Details</h3>
           
           <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <Package size={24} color="#00d2ff" />
              <div>
                 <div style={{ fontWeight: 600 }}>Status</div>
                 <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Processing Custom Configuration</div>
              </div>
           </div>

           <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <Truck size={24} color="#00d2ff" />
              <div>
                 <div style={{ fontWeight: 600 }}>Delivery ETA</div>
                 <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Priority Shipping (2-3 Business Days)</div>
              </div>
           </div>

           <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <ShieldCheck size={24} color="#00d2ff" />
              <div>
                 <div style={{ fontWeight: 600 }}>Warranty & Support</div>
                 <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Bundle inclusions activated as per your negotiated offer</div>
              </div>
           </div>
        </div>

        <Link href="/">
          <button className="btn-primary" style={{ padding: '16px 32px', fontSize: '16px' }}>
            Return to Storefront
          </button>
        </Link>
      </div>
    </div>
  );
}
