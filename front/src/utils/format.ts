import dayjs from 'dayjs';

export function formatDate(date: Date): string {
  return dayjs(date).format('[Editado em] DD/MM/YYYY [às] HH:mm');
}
