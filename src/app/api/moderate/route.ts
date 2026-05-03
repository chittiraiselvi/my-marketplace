import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { title, description, category } = await req.json()
    if (!title) return NextResponse.json({ error: 'Title required' }, { status: 400 })

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) return NextResponse.json({ error: 'API key missing' }, { status: 500 })

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{
          role: 'user',
          content: `You are a product moderator for an Indian marketplace.
Analyze this product and respond ONLY with valid JSON:
Title: ${title}
Description: ${description || 'No description'}
Category: ${category || 'General'}

Return ONLY this JSON format, no other text:
{"approved":true,"score":85,"reason":"Product looks genuine","flags":[]}

If fake/counterfeit/prohibited return:
{"approved":false,"score":10,"reason":"Counterfeit product detected","flags":["fake product"]}`
        }],
        temperature: 0.1,
        max_tokens: 200,
      })
    })

    const data = await response.json()
    console.log('Groq response:', JSON.stringify(data).slice(0, 200))

    const text = data?.choices?.[0]?.message?.content
    if (!text) return NextResponse.json({ approved: true, score: 75, reason: 'Auto approved', flags: [] })

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) return NextResponse.json({ approved: true, score: 75, reason: 'Auto approved', flags: [] })

    const result = JSON.parse(jsonMatch[0])
    return NextResponse.json(result)

  } catch (error) {
    console.error('Moderation error:', error)
    return NextResponse.json({ approved: true, score: 75, reason: 'Auto approved', flags: [] })
  }
}