import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';
const hellosign = require('hellosign-sdk')({ key: process.env.SIGN_API_KEY });

export async function POST(req: Request) {
  try {
    const { draftText, email } = await req.json();

    if (!draftText || !email) {
      return NextResponse.json({ error: 'Missing draft text or email' }, { status: 400 });
    }

    // 为了让 Dropbox Sign 能识别，我们把生成的文本写进一个临时的文本文档里
    const tmpFilePath = path.join(os.tmpdir(), `Board_Resolution_${Date.now()}.txt`);
    fs.writeFileSync(tmpFilePath, draftText);

    const opts = {
      test_mode: 1, // 必须开启测试模式，否则会消耗付费额度
      title: 'Board Resolution for E-Signature',
      subject: 'Action Required: Please sign the corporate resolution',
      message: 'This resolution was automatically drafted by Brisk AI. Please review and append your signature to execute the corporate action.',
      signers: [
        {
          email_address: email,
          name: 'Company Director',
          order: 0,
        }
      ],
      file: [tmpFilePath]
    };

    // 发送给 Dropbox Sign API
    const response = await hellosign.signatureRequest.send(opts);
    
    // 删掉临时文件
    fs.unlinkSync(tmpFilePath);

    return NextResponse.json({ 
      success: true, 
      message: 'Signature request sent successfully!',
      signature_request_id: response.signature_request.signature_request_id
    });

  } catch (error: any) {
    console.error('Dropbox Sign API Error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to send signature request' 
    }, { status: 500 });
  }
}
