'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { BookRecommendationForm } from '@/components/book-recommendation-form'
import { BookRecommendationResult } from '@/components/book-recommendation-result'
import { Book, Sparkles } from 'lucide-react'

export default function Home() {
  const [recommendation, setRecommendation] = useState<{
    genres: string[]
    description: string
    books: Array<{ title: string; reason: string }>
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (mood: string) => {
    setIsLoading(true)
    setRecommendation(null)

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood }),
      })

      const data = await response.json()
      setRecommendation(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <div className="border-b border-border/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Book className="w-8 h-8 text-accent" />
            <h1 className="text-4xl font-bold text-foreground">本の気分ガイド</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            今のあなたの気分にぴったりな本のジャンルを発見しましょう
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Input Section */}
          <Card className="bg-card/80 backdrop-blur border-border shadow-lg mb-8">
            <div className="p-8">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-6 h-6 text-accent" />
                <h2 className="text-2xl font-semibold text-foreground">
                  あなたの気分を教えてください
                </h2>
              </div>
              <BookRecommendationForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </div>
          </Card>

          {/* Result Section */}
          {recommendation && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <BookRecommendationResult
                genres={recommendation.genres}
                description={recommendation.description}
                books={recommendation.books}
              />
            </div>
          )}

          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="mb-4 inline-block">
                  <div className="w-12 h-12 border-4 border-border border-t-accent rounded-full animate-spin" />
                </div>
                <p className="text-muted-foreground text-lg">
                  あなたの気分に合った本を探索中...
                </p>
              </div>
            </div>
          )}

          {!recommendation && !isLoading && (
            <div className="text-center py-12">
              <div className="inline-block p-4 rounded-full bg-accent/10 mb-4">
                <Book className="w-8 h-8 text-accent" />
              </div>
              <p className="text-muted-foreground">
                上のフォームに気分を入力して、おすすめの本を見つけてください
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
