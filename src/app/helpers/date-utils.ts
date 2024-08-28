export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    console.error('Invalid date string:', dateString);
    return '';
  }
  return date.toLocaleDateString();
}

export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    console.error('Invalid date string:', dateString);
    return '';
  }
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function convertToISOFormat(dateTimeStr: string): string {
  // Convert from DD.MM.YYYYTHH:mm to YYYY-MM-DDTHH:mm:ss
  const [date, time] = dateTimeStr.split('T');
  const [day, month, year] = date.split('.');
  return `${year}-${month}-${day}T${time}:00`;
}
