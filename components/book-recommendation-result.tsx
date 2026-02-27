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
  
  // AIの回答（description）やジャンルから「現在の気分」を判定して画像を返す関数
  const getMoodImage = () => {
    // 判定材料としてジャンルと説明文を結合する
    const context = (genres.join(' ') + description).toLowerCase();
    
    if (context.includes('疲れて') || context.includes('癒やし') || context.includes('お疲れ')) {
      return '/moods/tired.png';
    } 
    if (context.includes('わくわく') || context.includes('楽しみ') || context.includes('興奮')) {
      return '/moods/excited.png';
    } 
    if (context.includes('悲しい') || context.includes('泣ける') || context.includes('切ない')) {
      return '/moods/sad.png';
    } 
    if (context.includes('冒険') || context.includes('旅') || context.includes('未知')) {
      return '/moods/adventure.png';
    } 
    if (context.includes('リラックス') || context.includes('落ち着く') || context.includes('穏やか')) {
      return '/moods/relax.png';
    } 
    if (context.includes('学び') || context.includes('知識') || context.includes('勉強') || context.includes('知的好奇心')) {
      return '/moods/learn.png';
    }
    
    // どのキーワードにもヒットしない場合のデフォルト画像
    return '/moods/default.jpg';
  };

  // この一連の回答に対して1つの「気分の画像」を決定
  const moodImage = getMoodImage();

  return (
    <div className="space-y-6">
      {/* Genres & Description Section (省略せずに表示) */}
      <Card className="bg-card/80 backdrop-blur border-border shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-5 h-5 text-accent" />
            <h3 className="text-xl font-semibold text-foreground">おすすめのジャンル</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {genres.map((genre, index) => (
              <div key={index} className="px-4 py-2 rounded-full bg-accent/20 text-accent font-medium border border-accent/30 text-sm">
                {genre}
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="bg-card/80 backdrop-blur border-border shadow-lg">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">あなたの気分に合った理由</h3>
          <p className="text-foreground/80 leading-relaxed text-sm">{description}</p>
        </div>
      </Card>

      {/* Book Recommendations Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-6 h-6 text-accent" />
          <h3 className="text-2xl font-semibold text-foreground">おすすめの本</h3>
        </div>

        <div className="grid gap-6">
          {books.map((book, index) => (
            <Card key={index} className="bg-card/80 backdrop-blur border-border shadow-lg hover:shadow-xl hover:border-accent/50 transition-all overflow-hidden">
              <div className="p-0 flex flex-col sm:flex-row">
                {/* 左側：本の表紙画像エリア */}
                <div className="w-full sm:w-40 h-56 sm:h-auto bg-muted relative flex-shrink-0">
                  {/* ロジック：Google Booksの表紙(book.cover)があればそれを表示。
                    なければ判定された気分の画像(moodImage)を表示。
                  */}
                  <img
                    src={book.cover || moodImage}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  {/* 番号バッジ */}
                  <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold shadow-md">
                    {index + 1}
                  </div>
                </div>

                {/* 右側：本の詳細情報 */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h4 className="text-xl font-bold text-foreground">{book.title}</h4>
                      {book.isEbook && (
                        <span className="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-accent/20 text-accent border border-accent/30">
                          eBook
                        </span>
                      )}
                    </div>
                    {book.author && (
                      <p className="text-sm font-medium text-accent mb-3">{book.author}</p>
                    )}
                    <p className="text-foreground/70 text-sm leading-relaxed mb-4">{book.reason}</p>
                  </div>

                  {/* アクションボタン */}
                  <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-border/50">
                    {book.previewUrl && (
                      <a href={book.previewUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline">
                        <BookOpen className="w-3.5 h-3.5" />
                        試し読みをする
                      </a>
                    )}
                    {book.infoLink && (
                      <a href={book.infoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors">
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