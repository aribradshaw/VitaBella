import { NextRequest, NextResponse } from 'next/server';
import { getAllFAQs } from '../../../../lib/faq-server';
import { searchAndFilterFAQs } from '../../../../lib/faq';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || 'All';
    
    const allFAQs = await getAllFAQs();
    const filteredFAQs = searchAndFilterFAQs(allFAQs, query, category);
    
    return NextResponse.json(filteredFAQs);
  } catch (error) {
    console.error('FAQ search API error:', error);
    return NextResponse.json(
      { error: 'Failed to search FAQs' },
      { status: 500 }
    );
  }
}
