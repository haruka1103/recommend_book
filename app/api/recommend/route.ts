import { google } from '@ai-sdk/google';
import { generateText, Output } from 'ai'
import { z } from 'zod'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { mood } = await request.json()

  if (!mood || typeof mood !== 'string') {
    return NextResponse.json(
      { error: 'Invalid mood input' },
      { status: 400 }
    )
  }

  try {
    const result = await generateText({
    model: google('models/gemini-2.5-flash'),
    system: `あなたは優秀な選書アシスタントです。ユーザーの気分や感情に基づいて、適切な本のジャンルと具体的なおすすめの本を提案してください。必ず日本語で回答してください。`,
    prompt: `ユーザーの今の気分・感情は 「${mood}」です。

以下の内容を提案してください:
1. この気分に合う3－4つの本のジャンル
2. なぜそれらのジャンルが今の気分に合うのかの詳細な説明
3. 3 具体的なおすすめの本3冊(タイトル、著者、おすすめする理由)`,
    output: Output.object({
      schema: z.object({
        genres: z.array(z.string()).describe('気分に合った本のジャンル'),
        description: z.string().describe('なぜそのジャンルが合うのかの説明'),
        books: z.array(
          z.object({
            title: z.string().describe('本のタイトルと著者名'),
            reason: z.string().describe('その本がなぜ今の気分に合うのかの理由'),
          })
        ).min(3).max(5).describe('おすすめの本のリスト'),
      }),
    }),
  })
    //const resultObj = (result as any)?.object
    const resultObj = (result as any).object ?? (result as any).experimental_output
    if (!resultObj) {
      console.error('generateText returned no object', result)
      return NextResponse.json(
        { error: 'AI service returned an empty result' },
        { status: 502 }
      )
    }
    console.log('Successfully generated recommendation:', resultObj)

    return NextResponse.json(resultObj)
  } catch (err) {
    console.error('Error in /api/recommend:', err)
    // Return error message but avoid leaking sensitive details
    return NextResponse.json(
      { error: (err as Error)?.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
