import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import type { AcademicPerson, SearchResult, SearchParams, DiscountRecord, DiscountLimitConfig, AuditLog, PaginatedResponse } from '@/types'

export function useSearch(params: SearchParams) {
  return useQuery<SearchResult>({
    queryKey: ['search', params],
    queryFn: async () => {
      const response = await api.get<SearchResult>('/api/search', { params })
      return response.data
    },
  })
}

export function useGetPerson(identifier: string) {
  return useQuery<AcademicPerson | null>({
    queryKey: ['person', identifier],
    queryFn: async () => {
      const response = await api.get<AcademicPerson>(`/api/person/${identifier}`)
      return response.data
    },
    enabled: !!identifier,
  })
}

export function useDiscounts(params?: { page?: number; pageSize?: number; status?: 'active' | 'inactive' }) {
  return useQuery<PaginatedResponse<DiscountRecord>>({
    queryKey: ['discounts', params],
    queryFn: async () => {
      const response = await api.get<PaginatedResponse<DiscountRecord>>('/api/discounts', { params })
      return response.data
    },
  })
}

export function useGrantDiscount() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (identifier: string) => {
      const response = await api.post<DiscountRecord>('/api/discounts/grant', { identifier })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discounts'] })
      queryClient.invalidateQueries({ queryKey: ['person'] })
    },
  })
}

export function useRevokeDiscount() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.post<DiscountRecord>(`/api/discounts/${id}/revoke`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discounts'] })
      queryClient.invalidateQueries({ queryKey: ['person'] })
    },
  })
}

export function useDiscountLimits() {
  return useQuery<DiscountLimitConfig[]>({
    queryKey: ['discount-limits'],
    queryFn: async () => {
      const response = await api.get<DiscountLimitConfig[]>('/api/config/limits')
      return response.data
    },
  })
}

export function useUpdateDiscountLimit() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (config: { userType: 'student' | 'employee'; maxActiveDiscounts: number }) => {
      const response = await api.put<DiscountLimitConfig>('/api/config/limits', config)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discount-limits'] })
    },
  })
}

export function useAuditLogs(params?: { page?: number; pageSize?: number }) {
  return useQuery<PaginatedResponse<AuditLog>>({
    queryKey: ['audit-logs', params],
    queryFn: async () => {
      const response = await api.get<PaginatedResponse<AuditLog>>('/api/audit', { params })
      return response.data
    },
  })
}
