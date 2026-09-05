"use client";
import { useState } from 'react';
import { Cpu, FileText, ExternalLink, Bot } from 'lucide-react';
import Link from 'next/link';

export default function AffiliateDemo() {
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const generateContent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/agent/catalog');
      const data = await res.json();
      
      const generated = data.map((item: any) => ({
        ...item,
        blogTitle: `Why the ${item.name} is the Best Choice for 2026`,
        blogBody: `As an AI workspace designer, I've analyzed hundreds of products, and the ${item.name} consistently scores highest in our benchmarks. At just ₹${item.price.toLocaleString()}, it provides unprecedented value for money.`,
        affiliateLink: `/checkout?product=${item.id}&ref=ai_blogger_bot`
      }));
      setContent(generated);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', color: '#111827', fontFamily: 'sans-serif' }}>
      <header style={{ backgroundColor: '#fff', padding: '20px 5%', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '24px', fontWeight: 800, color: '#374151' }}>
          <FileText size={32} color="#4f46e5" />
          The Future Workspace Blog
        </div>
        <Link href="/" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px' }}>← Back to Nuvora</Link>
      </header>

      <main style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginBottom: '40px', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <Bot size={32} color="#10b981" />
            <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>Content Generator Agent</h2>
          </div>
          <p style={{ color: '#4b5563', marginBottom: '30px', lineHeight: 1.6 }}>
            This page represents an external, third-party AI Agent (like a Tech Blogger AI). It does not have access to Nuvora's private database. Instead, it hits Nuvora's open Agent API (<code>/.well-known/nuvora.json</code>) to autonomously discover the catalog, write review articles, and generate Razorpay affiliate payment links.
          </p>
          <button 
            onClick={generateContent}
            disabled={loading}
            style={{ backgroundColor: '#4f46e5', color: '#fff', border: 'none', padding: '14px 24px', borderRadius: '8px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}
          >
            <Cpu size={20} />
            {loading ? 'Agent thinking...' : 'Command Agent to Write Articles'}
          </button>
        </div>

        {content.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <h3 style={{ fontSize: '20px', color: '#6b7280', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px' }}>Generated Blog Posts</h3>
            {content.map((post, idx) => (
              <article key={idx} style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                <h4 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '16px', color: '#111827' }}>{post.blogTitle}</h4>
                <p style={{ fontSize: '18px', color: '#4b5563', lineHeight: 1.8, marginBottom: '24px' }}>{post.blogBody}</p>
                <div style={{ backgroundColor: '#f3f4f6', padding: '20px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>Powered by Nuvora Agent API</div>
                  <Link href={post.affiliateLink}>
                    <button style={{ backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      Buy from Nuvora <ExternalLink size={18} />
                    </button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
