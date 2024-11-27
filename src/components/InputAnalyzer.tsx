import { toast } from 'sonner'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useAnalyzer } from '../context/useAnalyzer'

export function InputAnalyzer() {
  const {
    state: { tokenSearch, tokens },
    actions: { setTokenSearch },
  } = useAnalyzer()

  function verifyToken(e: string) {
    const token = e.replace(/\s/g, '')
    if (/\s/.test(e)) {
      tokens.includes(token)
        ? toast.success(`The token ${token} is valid`, { duration: 5000 })
        : toast.error(`The token ${token} is not valid`, { duration: 5000 })

      setTokenSearch('')

      return
    }
    if (/^[A-Za-z\s]*$/.test(token)) setTokenSearch(token)
    else {
      toast.error('Enter a valid token')
      setTokenSearch('')
    }
  }

  return (
    <div className="space-y-2">
      <Label
        htmlFor="wordSearch"
        className="flex items-center gap-2 text-sm font-medium"
      ></Label>
      <Input
        type="text"
        id="wordSearch"
        value={tokenSearch}
        placeholder="Token"
        onChange={(e) => verifyToken(e.target.value.toLowerCase())}
        className="w-full"
      />
    </div>
  )
}
