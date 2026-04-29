import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

const searchSchema = z.object({
  query: z.string().min(1, 'Digite um RA, RF, Nome ou CPF'),
  searchType: z.enum(['ra', 'rf', 'name', 'cpf']).optional(),
})

type SearchFormData = z.infer<typeof searchSchema>

interface SearchFormProps {
  onSearch: (data: SearchFormData) => void
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [searchType, setSearchType] = useState<'ra' | 'rf' | 'name' | 'cpf' | 'auto'>('auto')
  
  const { register, handleSubmit, formState: { errors } } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  })

  const validateInput = (value: string): 'ra' | 'rf' | 'name' | 'cpf' => {
    const cleanValue = value.replace(/\D/g, '')
    if (/^\d{6}$/.test(cleanValue)) return 'ra'
    if (/^\d{4}$/.test(cleanValue)) return 'rf'
    if (/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(value)) return 'cpf'
    return 'name'
  }

  const onSubmit = (data: SearchFormData) => {
    const detectedType = searchType === 'auto' ? validateInput(data.query) : searchType
    onSearch({ ...data, searchType: detectedType })
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <Input
              {...register('query')}
              placeholder="Buscar por RA (6 dígitos), RF (4 dígitos), Nome ou CPF"
              className="w-full"
            />
            {errors.query && (
              <p className="text-sm text-destructive">{errors.query.message}</p>
            )}
          </div>
          
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as typeof searchType)}
            className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="auto">Automático</option>
            <option value="ra">RA</option>
            <option value="rf">RF</option>
            <option value="name">Nome</option>
            <option value="cpf">CPF</option>
          </select>
          
          <Button type="submit">
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
