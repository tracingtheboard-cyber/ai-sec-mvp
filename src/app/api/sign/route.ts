import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import * as DropboxSign from '@dropbox/sign';

export async function POST(req: Request) {
  try {
    const { draftText, email } = await req.json();

    if (!draftText || !email) {
      return NextResponse.json({ error: 'Missing draft text or email' }, { status: 400 });
    }

    // 确保目录存在
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }

    const tmpFilePath = path.join(publicDir, `Board_Resolution_${Date.now()}.txt`);
    fs.writeFileSync(tmpFilePath, draftText);

    // Initialize the official Dropbox Sign SDK
    const signatureRequestApi = new DropboxSign.SignatureRequestApi();
    signatureRequestApi.username = process.env.SIGN_API_KEY || "";

    const signer: DropboxSign.SubSignatureRequestSigner = {
      emailAddress: email,
      name: "Company Director",
      order: 0,
    };

    const data: DropboxSign.SignatureRequestSendRequest = {
      title: "Board Resolution for E-Signature",
      subject: "Action Required: Please sign the corporate resolution",
      message: "This resolution was automatically drafted by Brisk AI. Please review and append your signature to execute the corporate action.",
      signers: [signer],
      file: [fs.createReadStream(tmpFilePath)],
      testMode: true,
    };

    const result = await signatureRequestApi.signatureRequestSend(data);
    
    // Clean up temp file
    fs.unlinkSync(tmpFilePath);

    return NextResponse.json({ 
      success: true, 
      message: 'Signature request sent successfully!',
      signature_request_id: result.body.signatureRequest?.signatureRequestId
    });

  } catch (error: any) {
    console.error('Dropbox Sign API Error:', error);
    let errorMessage = error.message;
    if (error.body && error.body.error) {
       errorMessage = error.body.error.errorMsg || JSON.stringify(error.body);
    }
    return NextResponse.json({ 
      error: errorMessage || 'Failed to send signature request' 
    }, { status: 500 });
  }
}
