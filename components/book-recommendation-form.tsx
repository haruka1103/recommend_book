'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send } from 'lucide-react'

interface BookRecommendationFormProps {
  onSubmit: (mood: string) => void
  isLoading: boolean
}

export function BookRecommendationForm({
  onSubmit,
  isLoading,
}: BookRecommendationFormProps) {
  const [mood, setMood] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (mood.trim()) {
      onSubmit(mood)
      setMood('')
    }
  }

  const suggestedMoods = [
    '疲れている',
    'わくわくしている',
    '悲しい',
    '冒険したい気分',
    'リラックスしたい',
    '学びたい',
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="例: 最近疲れているので、心が癒される本が読みたい...
または、冒険好きなので、ファンタジーの世界に浸りたい..."
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        disabled={isLoading}
        className="min-h-24 resize-none bg-background border-border focus:ring-accent"
      />

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          または、下のボタンから選択してください：
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {suggestedMoods.map((suggestedMood) => (
            <button
              key={suggestedMood}
              type="button"
              onClick={() => setMood(suggestedMood)}
              disabled={isLoading}
              className="px-3 py-2 text-sm rounded-lg border border-border bg-card hover:bg-accent/10 hover:border-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-foreground"
            >
              {suggestedMood}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={!mood.trim() || isLoading}
          className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          <Send className="w-4 h-4 mr-2" />
          {isLoading ? '探索中...' : 'おすすめを探す'}
        </Button>
      </div>
    </form>
  )
}
