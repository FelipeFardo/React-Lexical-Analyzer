import { PlusCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'

import { useAnalyzer } from '../context/useAnalyzer'
import { Input } from './ui/input'

const schema = z
  .string()
  .toLowerCase()
  .refine((value) => value.length > 0, { message: 'Enter a token' })
  .refine(
    (value) => /^[a-zA-Z]+$/.test(value),
    'Only letters are allowed, no spaces',
  )

type FormData = {
  token: string
}

export function InputDictionary() {
  const {
    state: { tokens },
    actions: { insertToken },
  } = useAnalyzer()

  const { register, handleSubmit, setValue, watch } = useForm<FormData>()
  const nome = watch('token', '') // o valor inicial é vazio

  const onSubmit = (data: { token: string }) => {
    try {
      schema.parse(data.token)
    } catch (error) {
      if (error instanceof z.ZodError) toast.error(error.issues[0].message)
      return
    }
    if (tokens.includes(data.token))
      return toast.error('This token already exists in the dictionary')
    insertToken(data.token)
    toast.success(data.token + ' has been added')
    setValue('token', '')
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-2">
        <div className="flex w-full justify-between gap-3">
          <Input {...register('token')} className="flex-grow" />
          <Button type="submit" disabled={!nome}>
            <PlusCircle className="h-4 w-4" />
            <span className="sr-only">Add token</span>
          </Button>
        </div>
      </form>
    </>
  )
}
