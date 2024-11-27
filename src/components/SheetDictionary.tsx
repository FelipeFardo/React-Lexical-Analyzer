import { MinusCircle } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { useAnalyzer } from '../context/useAnalyzer'
import { InputDictionary } from './InputDictionary'

export function SheetDictionary() {
  const {
    state: { tokens },
    actions: { removeToken, resetTokens },
  } = useAnalyzer()

  const removerTokenFunc = (token: string) => {
    removeToken(token)
    toast.success(token + ' has been successfully removed!')
  }

  const resetTokensFunc = () => {
    resetTokens()
    toast.success('All tokens have been successfully removed!')
  }

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button className=" mt-auto h-full text-white">Dictionary</Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col sm:max-w-[425px]">
          <SheetHeader>
            <SheetTitle>Token Manager</SheetTitle>
            <SheetDescription>
              Add, remove, or reset tokens in your dictionary.
            </SheetDescription>
          </SheetHeader>
          <div className="mx-auto flex h-full w-full max-w-md flex-col space-y-4 p-4">
            <InputDictionary />
            <ScrollArea className="flex h-auto rounded-md border p-2">
              {tokens.length > 0 ? (
                <ul className=" space-y-2">
                  {tokens.map((token) => (
                    <li
                      key={token}
                      className="group flex items-center justify-between border-b border-gray-200 p-2"
                    >
                      <span className="mr-2 flex-grow truncate">{token}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removerTokenFunc(token)}
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                        aria-label={`Remove token ${token}`}
                      >
                        <MinusCircle className="h-5 w-5 text-destructive" />
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="p-4 text-center text-muted-foreground">
                  No tokens added yet
                </p>
              )}
            </ScrollArea>
          </div>
          <SheetFooter>
            <Button variant="destructive" onClick={resetTokensFunc}>
              Reset Dictionary
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}
