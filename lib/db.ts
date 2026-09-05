export type ProductCategory = 'laptop' | 'accessory' | 'service';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  cost: number;
  customerValue?: number;
  price?: number;
}

export const products = new Map<string, Product>([
  // Main Products (Laptops)
  ['p1', { id: 'p1', name: 'Nuvora Pro X', category: 'laptop', cost: 130000, price: 150000 }],
  ['p2', { id: 'p2', name: 'Nuvora Air', category: 'laptop', cost: 75000, price: 95000 }],
  ['p3', { id: 'p3', name: 'Nuvora Studio', category: 'laptop', cost: 240000, price: 280000 }],
  ['p4', { id: 'p4', name: 'Nuvora Gaming G-Series', category: 'laptop', cost: 180000, price: 215000 }],
  ['p5', { id: 'p5', name: 'Nuvora Dev Edition', category: 'laptop', cost: 155000, price: 185000 }],
  ['p6', { id: 'p6', name: 'Nuvora Lite', category: 'laptop', cost: 45000, price: 55000 }],
  
  // Asymmetric Addons
  ['care_plus', { id: 'care_plus', name: 'Nuvora Care+ 2 Years', category: 'service', cost: 1500, customerValue: 5000 }],
  ['care_premium', { id: 'care_premium', name: 'Accidental Damage Protection', category: 'service', cost: 2500, customerValue: 8500 }],
  ['sleeve', { id: 'sleeve', name: 'Pro Sleeve', category: 'accessory', cost: 1100, customerValue: 3000 }],
  ['backpack', { id: 'backpack', name: 'Commuter Tech Backpack', category: 'accessory', cost: 1800, customerValue: 4500 }],
  ['mouse', { id: 'mouse', name: 'Creator Mouse', category: 'accessory', cost: 1200, customerValue: 3000 }],
  ['keyboard', { id: 'keyboard', name: 'Mechanical Keyboard', category: 'accessory', cost: 2500, customerValue: 8000 }],
  ['monitor_4k', { id: 'monitor_4k', name: 'ProDisplay 4K Monitor', category: 'accessory', cost: 12000, customerValue: 32000 }],
  ['dock', { id: 'dock', name: 'Thunderbolt 4 Dock', category: 'accessory', cost: 4500, customerValue: 14000 }],
  ['priority_setup', { id: 'priority_setup', name: 'Priority Setup', category: 'service', cost: 500, customerValue: 2000 }],
  ['data_recovery', { id: 'data_recovery', name: 'Data Recovery Service', category: 'service', cost: 200, customerValue: 4000 }],
  ['ssd_1tb', { id: 'ssd_1tb', name: 'External SSD 1TB', category: 'accessory', cost: 2000, customerValue: 8000 }],
  ['headphones', { id: 'headphones', name: 'Nuvora Studio Headphones', category: 'accessory', cost: 3000, customerValue: 12000 }]
]);

export interface NegotiationSession {
  session_id: string;
  status: 'ACTIVE' | 'SAVED' | 'LOST';
  history: any[];
  revenueSaved: number;
  marginProtected: number;
  customerMessage?: string;
  selectedOffer?: any;
}

export const activeSessions = new Map<string, NegotiationSession>();
