import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { title, description, category } = await req.json()

    if (!title) {
      return NextResponse.json({ error: 'Title required' }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'API key missing' }, { status: 500 })
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a product moderator for an Indian marketplace.

Analyze this product listing and respond ONLY with valid JSON, no other text:
Title: ${title}
Description: ${description || 'No description'}
Category: ${category || 'General'}

Respond with ONLY this JSON format:
{
  "approved": true or false,
  "score": number between 0-100,
  "reason": "brief explanation in one sentence",
  "flags": ["list of issues"] or []
}

Approve if: genuine product, legal item, appropriate content.
Reject if: fake/counterfeit, prohibited item, adult content, dangerous goods.`
            }]
          }]
        })
      }
    )

    const data = await response.json()
    const text = data.candidates[0].content.parts[0].text
    
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return NextResponse.json({ approved: true, score: 75, reason: 'Auto approved', flags: [] })
    }
    
    const result = JSON.parse(jsonMatch[0])
    return NextResponse.json(result)

  } catch (error) {
    console.error('Moderation error:', error)
    return NextResponse.json({ approved: true, score: 75, reason: 'Auto approved', flags: [] })
  }
}