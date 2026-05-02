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
Include placeholders like [Company Name], [UEN], [Date] ONLY if the user doesn't provide them.
CRITICAL INSTRUCTION: DO NOT generate blank signature placeholders (e.g. Director 2: ______) unless the prompt implies there are multiple unknown directors. ONLY create signature blocks for the specific director(s) explicitly named in the prompt. If the prompt says "The sole director signing is Jane Doe", you MUST ONLY create one signature line for Jane Doe and absolutely no others.
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
    
    const companyMatch = prompt.match(/for\s+([^(]+?)\s*\(UEN/i) || prompt.match(/for\s+(.*?)\./i);
    const uenMatch = prompt.match(/UEN:\s*([A-Za-z0-9]+)\)/i);
    const directorMatch = prompt.match(/director[^i]*is\s+([^.]+)/i);
    
    const companyName = companyMatch ? companyMatch[1].trim() : '[Company Name]';
    const uen = uenMatch ? uenMatch[1].trim() : '[UEN]';
    const directorName = directorMatch ? directorMatch[1].trim() : '[Director]';

    // Fallback Mock just in case API fails during a demo
    const mockDraft = `DIRECTORS' RESOLUTION IN WRITING PASSED PURSUANT TO THE CONSTITUTION OF THE COMPANY

COMPANY: ${companyName}
UEN: ${uen}

1. APPROVAL OF CORPORATE ACTION
NOTED THAT the Company has proposed to execute the changes as requested by the Management.

IT IS RESOLVED THAT:
(a) The proposed changes be and are hereby approved.
(b) Any Director or the Company Secretary be and is hereby authorised to lodge the necessary notifications with the Accounting and Corporate Regulatory Authority (ACRA).

2. AUTHORITY TO EXECUTE
RESOLVED FURTHER THAT any one Director or Company Secretary be authorised to sign all such forms, documents, and do all such acts as may be necessary to give effect to the above resolution.

Dated this: ${new Date().toLocaleDateString('en-SG')}

_____________________
${directorName}
Director`;

    return NextResponse.json({ 
      draft: mockDraft, 
      note: "Generated via Backup Mock Engine (OpenAI API Error)" 
    });
  }
}
