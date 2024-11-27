import './global.css'

import { Toaster } from 'sonner'

import { InputAnalyzer } from '@/components/InputAnalyzer'
import { SheetDictionary } from '@/components/SheetDictionary'
import { TableAnalyzer } from '@/components/Table'
import { Tags } from '@/components/Tags'

function App() {
  return (
    <>
      <Toaster richColors position="bottom-left" />
      <div className="mt-2 flex justify-center">
        <div className="xs:w-5/12 w-11/12 sm:w-10/12">
          <h3 className="m-2 border-b pb-3 text-center text-xl font-semibold">
            Lexical analyzer
          </h3>
          <div className="mt-3 flex justify-between">
            <div className="w-1/4">
              <InputAnalyzer />
            </div>
            <div>
              <SheetDictionary />
            </div>
          </div>
          <Tags />
          <TableAnalyzer />
        </div>
      </div>
    </>
  )
}

export { App }
