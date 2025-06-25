import { NextRequest, NextResponse } from 'next/server';
import { getAllFAQs, searchFAQs } from '../../../../lib/faq';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    
    const allFAQs = await getAllFAQs();
    const results = searchFAQs(allFAQs, query);
    
    return NextResponse.json(results);
  } catch (error) {
    console.error('FAQ search API error:', error);
    return NextResponse.json({ error: 'Failed to search FAQs' }, { status: 500 });
  }
}
