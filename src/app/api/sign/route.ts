import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { draftText, email } = await req.json();

    if (!draftText || !email) {
      return NextResponse.json({ error: 'Missing draft text or email' }, { status: 400 });
    }

    const apiKey = process.env.SIGN_API_KEY || "";
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing Dropbox Sign API Key' }, { status: 500 });
    }

    // Use native Web FormData to bypass any Node.js/Windows file stream issues
    const formData = new FormData();
    formData.append('test_mode', '1'); // 必须为1，测试模式免费
    formData.append('title', 'Board Resolution for E-Signature');
    formData.append('subject', 'Action Required: Please sign the corporate resolution');
    formData.append('message', 'This resolution was automatically drafted by Brisk AI. Please review and append your signature to execute the corporate action.');
    formData.append('signers[0][email_address]', email);
    formData.append('signers[0][name]', 'Company Director');
    
    // Create an in-memory text file from the AI draft
    const fileBlob = new Blob([draftText], { type: 'text/plain' });
    formData.append('file[0]', fileBlob, 'Board_Resolution.txt');

    const authHeader = 'Basic ' + Buffer.from(apiKey + ':').toString('base64');

    // Make a raw fetch request directly to Dropbox Sign API
    const res = await fetch('https://api.hellosign.com/v3/signature_request/send', {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
      },
      body: formData,
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("Dropbox Sign API Error:", result);
      const errorMsg = result.error?.error_msg || JSON.stringify(result);
      return NextResponse.json({ error: errorMsg }, { status: res.status });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Signature request sent successfully!',
      signature_request_id: result.signature_request?.signature_request_id
    });

  } catch (error: any) {
    console.error('Fetch Error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to connect to signature API' 
    }, { status: 500 });
  }
}
