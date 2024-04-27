import { format, parseISO } from 'date-fns'

const formatDate = (dateString?: string): string => {
  if (!dateString) {
    return 'Неизвестно'
  }
  return format(parseISO(dateString), 'MMMM d, yyyy')
}

export default formatDate
