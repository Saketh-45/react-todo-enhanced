export function parseDateISO(dateStr){
  if(!dateStr) return null;
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
}
export function isToday(date){
  if(!date) return false;
  const d = new Date(); d.setHours(0,0,0,0);
  const t = new Date(date); t.setHours(0,0,0,0);
  return d.getTime() === t.getTime();
}
export function isOverdue(date){
  if(!date) return false;
  const now = new Date(); now.setHours(0,0,0,0);
  const d = new Date(date); d.setHours(0,0,0,0);
  return d.getTime() < now.getTime();
}
export function isUpcoming(date){
  if(!date) return false;
  const now = new Date(); now.setHours(0,0,0,0);
  const d = new Date(date); d.setHours(0,0,0,0);
  return d.getTime() > now.getTime();
}
export function formatDateShort(date){
  if(!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'});
}
