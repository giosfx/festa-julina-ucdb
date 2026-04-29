export interface User {
  id: string
  name: string
  email: string
  roles: string[]
}

export interface AcademicPerson {
  type: 'student' | 'employee'
  ra?: string
  rf?: string
  name: string
  cpf: string
  email?: string
  status: 'active' | 'inactive'
}

export interface DiscountRecord {
  id: string
  personType: 'student' | 'employee'
  ra?: string
  rf?: string
  name: string
  cpf: string
  isActive: boolean
  grantedAt: string
  grantedBy: string
  revokedAt?: string
  revokedBy?: string
}

export interface DiscountLimitConfig {
  id: string
  userType: 'student' | 'employee'
  maxActiveDiscounts: number
  createdAt: string
  updatedAt: string
}

export interface AuditLog {
  id: string
  action: 'GRANT' | 'REVOKE' | 'CONFIG_UPDATE'
  entityType: 'DiscountRecord' | 'DiscountLimitConfig'
  entityId: string
  performedBy: string
  performedAt: string
  details: Record<string, unknown>
}

export interface SearchParams {
  query: string
  searchType?: 'ra' | 'rf' | 'name' | 'cpf'
  page: number
  pageSize: number
}

export interface SearchResult {
  items: AcademicPerson[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export type UserRole = 'admin' | 'moderator' | 'viewer'
