import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

import { useAnalyzer } from '../context/useAnalyzer'

export function Tags() {
  const {
    state: { tokens, tokenSearch },
    actions: { setTokenSearch },
  } = useAnalyzer()

  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold">Suggestions</h2>

      <div className="mb-4 flex gap-2">
        {tokens.map((e) => (
          <Badge
            key={e}
            variant="secondary"
            onClick={() => setTokenSearch(e)}
            className={cn(
              'cursor-pointer  transition-all hover:bg-primary hover:text-primary-foreground',
              e.toLowerCase().startsWith(tokenSearch.toLowerCase())
                ? 'opacity-100'
                : 'opacity-50',
            )}
          >
            {e}
          </Badge>
        ))}
      </div>
    </div>
  )
}
