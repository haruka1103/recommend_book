'use client'

import { Card } from '@/components/ui/card'
import { BookOpen, Tag } from 'lucide-react'

interface BookRecommendationResultProps {
  genres: string[]
  description: string
  books: Array<{
    title: string
    reason: string
  }>
}

export function BookRecommendationResult({
  genres,
  description,
  books,
}: BookRecommendationResultProps) {
  return (
    <div className="space-y-6">
      {/* Genres */}
      <Card className="bg-card/80 backdrop-blur border-border shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-5 h-5 text-accent" />
            <h3 className="text-xl font-semibold text-foreground">
              おすすめのジャンル
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {genres.map((genre, index) => (
              <div
                key={index}
                className="px-4 py-2 rounded-full bg-accent/20 text-accent font-medium border border-accent/30"
              >
                {genre}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Description */}
      <Card className="bg-card/80 backdrop-blur border-border shadow-lg">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            あなたの気分に合った理由
          </h3>
          <p className="text-foreground/80 leading-relaxed">
            {description}
          </p>
        </div>
      </Card>

      {/* Book Recommendations */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-6 h-6 text-accent" />
          <h3 className="text-2xl font-semibold text-foreground">
            おすすめの本
          </h3>
        </div>

        <div className="grid gap-4">
          {books.map((book, index) => (
            <Card
              key={index}
              className="bg-card/80 backdrop-blur border-border shadow-lg hover:shadow-xl hover:border-accent/50 transition-all"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-accent">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {book.title}
                    </h4>
                    <p className="text-foreground/70">
                      {book.reason}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
