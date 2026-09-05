import { NextResponse } from 'next/server';
import { products } from '../../../../lib/db';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  try {
    const allProducts = Array.from(products.values());
    
    const catalog = {
      laptops: allProducts.filter(p => p.category === 'laptop'),
      accessories: allProducts.filter(p => p.category === 'accessory'),
      services: allProducts.filter(p => p.category === 'service'),
    };

    return NextResponse.json(catalog, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500, headers: corsHeaders });
  }
}
