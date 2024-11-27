import { useEffect, useRef } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

import { useAnalyzer } from '../context/useAnalyzer'

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')

export function TableAnalyzer() {
  const {
    state: { tokens, analyzer, tokenSearch },
    actions: { setAnalyzer },
  } = useAnalyzer()

  const tableRef = useRef<HTMLTableElement>(null)
  let currentRow = 0

  useEffect(() => {
    setAnalyzer()
  }, [tokens, setAnalyzer])

  const tableData = analyzer.map((tableItem) =>
    letters.map((letter) => tableItem[letter] || ''),
  )
  useEffect(() => {
    const scrollContainer = tableRef.current

    const linhaDesejada = scrollContainer?.rows[currentRow]
    linhaDesejada?.scrollIntoView({ behavior: 'smooth' })
  }, [currentRow])

  console.log('Analyzer:', analyzer)
  console.log('Table data:', tableData)

  const isValidToken = () => {
    if (tokenSearch.length === 1) {
      currentRow = 0
      return tableData[0][tokenSearch.charCodeAt(0) - 'a'.charCodeAt(0)] !== ''
    }
    for (let i = 0; i < tokenSearch.length; i++) {
      const number = tokenSearch[i].charCodeAt(0) - 'a'.charCodeAt(0)
      if (tableData[currentRow][number] === '') return false
      if (i < tokenSearch.length - 1) currentRow = tableData[currentRow][number]
    }
    return true
  }

  const valid = isValidToken()

  useEffect(() => {
    const scrollContainer = tableRef

    const linhaDesejada = scrollContainer?.current?.rows[currentRow]
    linhaDesejada?.scrollIntoView({ behavior: 'smooth' })
  }, [currentRow, tableRef])

  return (
    <div className="flex h-[65vh] rounded-lg border border-gray-200 shadow-sm">
      <Table className="w-full table-fixed" ref={tableRef}>
        <TableHeader>
          <TableRow className="sticky top-0 bg-gray-100">
            <TableHead className="w-16 border-r px-4 py-3 text-center font-semibold text-gray-700">
              δ
            </TableHead>
            {letters.map((l) => (
              <TableHead
                key={l}
                className="px-4 py-3 text-center font-semibold text-gray-700"
              >
                {l.toUpperCase()}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              className={cn(
                'hover:bg-gray-50',
                rowIndex === currentRow && tokenSearch && !valid
                  ? 'bg-red-100'
                  : 'bg-white',
              )}
            >
              <TableCell className="flex border-r px-4 py-3">
                <div className="flex  items-center justify-between">
                  <span className="font-medium text-gray-900">{`q${rowIndex}`}</span>
                  {analyzer[rowIndex]?.end && (
                    <span className="ml-2 font-bold">*</span>
                  )}
                </div>
              </TableCell>
              {row.map((letter, letterIndex) => (
                <TableCell
                  key={letterIndex}
                  className={cn(
                    'px-4 py-3 text-center',
                    rowIndex === currentRow &&
                      valid &&
                      letter &&
                      tokenSearch[tokenSearch.length - 1] ===
                        letters[letterIndex]
                      ? 'bg-green-100 text-green-900'
                      : 'text-gray-700',
                  )}
                >
                  {letter ? `q${letter}` : '-'}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
