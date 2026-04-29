import { AcademicPerson } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BadgeCheck, User, GraduationCap, Building2 } from 'lucide-react'

interface PersonCardProps {
  person: AcademicPerson
  hasActiveDiscount: boolean
  onGrant: () => void
  onRevoke: () => void
  canModify: boolean
}

export function PersonCard({ person, hasActiveDiscount, onGrant, onRevoke, canModify }: PersonCardProps) {
  const Icon = person.type === 'student' ? GraduationCap : Building2

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-lg">{person.name}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {person.type === 'student' ? 'Estudante' : 'Funcionário'} • {person.status === 'active' ? 'Ativo' : 'Inativo'}
          </p>
        </div>
        {hasActiveDiscount && (
          <BadgeCheck className="h-6 w-6 text-green-600" />
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          {person.ra && (
            <div>
              <span className="text-muted-foreground">RA:</span> {person.ra}
            </div>
          )}
          {person.rf && (
            <div>
              <span className="text-muted-foreground">RF:</span> {person.rf}
            </div>
          )}
          <div className="col-span-2">
            <span className="text-muted-foreground">CPF:</span> {person.cpf}
          </div>
          {person.email && (
            <div className="col-span-2">
              <span className="text-muted-foreground">Email:</span> {person.email}
            </div>
          )}
        </div>
        
        {canModify && person.status === 'active' && (
          <div className="pt-2">
            {hasActiveDiscount ? (
              <Button variant="destructive" onClick={onRevoke} className="w-full">
                Revogar Desconto
              </Button>
            ) : (
              <Button onClick={onGrant} className="w-full">
                Conceder Desconto
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
