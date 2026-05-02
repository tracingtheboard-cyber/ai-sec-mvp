import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI SDK
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const systemInstruction = `You are a professional Corporate Secretary in Singapore. 
Your task is to draft an official 'Directors Resolution in Writing' (Board Resolution) based on the user's request.
Format the output strictly as a formal legal document. 
Include placeholders like [Company Name], [UEN], [Date] if the user doesn't provide them.
Do not add any conversational filler, return ONLY the resolution text.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // 速度快，价格便宜，写这种模板足够了
      messages: [
        { role: 'system', content: systemInstruction },
        { role: 'user', content: prompt }
      ],
      temperature: 0.2, // Low temperature for legal/formal text
    });

    const draft = response.choices[0]?.message?.content || "";

    return NextResponse.json({ draft });
  } catch (error: any) {
    console.error('Error generating resolution with OpenAI:', error);
    
    // Fallback Mock just in case API fails during a demo
    const mockDraft = `DIRECTORS' RESOLUTION IN WRITING PASSED PURSUANT TO THE CONSTITUTION OF THE COMPANY

COMPANY NAME: [Extracted Company Name]
UEN: [Extracted UEN]

1. APPROVAL OF CORPORATE ACTION
NOTED THAT the Company has proposed to execute the changes as requested by the Management.

IT IS RESOLVED THAT:
(a) The proposed changes be and are hereby approved.
(b) Any Director or the Company Secretary be and is hereby authorised to lodge the necessary notifications with the Accounting and Corporate Regulatory Authority (ACRA).

2. AUTHORITY TO EXECUTE
RESOLVED FURTHER THAT any one Director or Company Secretary be authorised to sign all such forms, documents, and do all such acts as may be necessary to give effect to the above resolution.

Dated this: ${new Date().toLocaleDateString('en-SG')}

_____________________
Director
`;

    return NextResponse.json({ 
      draft: mockDraft, 
      note: "Generated via Backup Mock Engine (OpenAI API Error)" 
    });
  }
}
