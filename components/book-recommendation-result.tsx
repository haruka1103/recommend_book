'use client'

import { Card } from '@/components/ui/card'
import { BookOpen, Tag, ExternalLink, Book as BookIcon } from 'lucide-react'

interface BookRecommendationResultProps {
  genres: string[]
  description: string
  books: Array<{
    title: string
    author?: string
    reason: string
    cover?: string | null
    previewUrl?: string | null
    isEbook?: boolean
    infoLink?: string | null
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

        <div className="grid gap-6">
          {books.map((book, index) => (
            <Card
              key={index}
              className="bg-card/80 backdrop-blur border-border shadow-lg hover:shadow-xl hover:border-accent/50 transition-all overflow-hidden"
            >
              <div className="p-0 flex flex-col sm:flex-row">
                {/* 左側：本の表紙画像 */}
                <div className="w-full sm:w-40 h-56 sm:h-auto bg-muted relative flex-shrink-0">
                  {book.cover ? (
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-accent/5">
                      {/* 修正箇所: BookIcom ではなく BookIcon */}
                      <BookIcon className="w-10 h-10 mb-2 opacity-20" />
                      <span className="text-xs">No Image</span>
                    </div>
                  )}
                  {/* 番号バッジ */}
                  <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold shadow-md">
                    {index + 1}
                  </div>
                </div>

                {/* 右側：本の詳細情報 */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h4 className="text-xl font-bold text-foreground">
                        {book.title}
                      </h4>
                      {book.isEbook && (
                        <span className="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-accent/20 text-accent border border-accent/30">
                          eBook
                        </span>
                      )}
                    </div>
                    {book.author && (
                      <p className="text-sm font-medium text-accent mb-3">
                        {book.author}
                      </p>
                    )}
                    <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                      {book.reason}
                    </p>
                  </div>

                  {/* 修正箇所: コメントアウトの閉じタグミスを修正 */}
                  {/* アクションボタン */}
                  <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-border/50">
                    {book.previewUrl && (
                      <a
                        href={book.previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        試し読みをする
                      </a>
                    )}
                    {book.infoLink && (
                      <a
                        href={book.infoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        詳細を見る
                      </a>
                    )}
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