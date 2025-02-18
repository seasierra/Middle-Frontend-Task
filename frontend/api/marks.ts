import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export type Mark = {
  id: number
  name: string
  comment: string
  x: number
  y: number
}

type List<T> = {
  marks: T[]
  count: number
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

const req = async (path: string, options?: RequestInit) => {
  const res = await fetch(`${API_URL}${path}`, options)

  const data = await res.json()

  return data
}

const mutationReq = <T>(path: string, method: string, body?: T) =>
  req(path, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

export const useMarksList = () => {
  return useQuery<List<Mark>>({
    queryKey: ['marks'],
    queryFn: () => req('/mark/list'),
  })
}

export const useAddMark = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (mark: Omit<Mark, 'id'>) => mutationReq('/mark', 'POST', mark),
    onSuccess: () => {
      queryClient.invalidateQueries()
      toast.success('Mark added successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export const useEditMark = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (mark: Mark) => mutationReq(`/mark/${mark.id}`, 'PUT', mark),
    onSuccess: () => {
      queryClient.invalidateQueries()
      toast.success('Mark updated successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export const useDeleteMark = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => mutationReq(`/mark/${id}`, 'DELETE'),
    onSuccess: () => {
      queryClient.invalidateQueries()
      toast.success('Mark deleted successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
