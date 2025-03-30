
export const minute2HHmm = (minute)=> {
  const HH = Math.floor(minute / 60).toString().padStart(2, '0')
  const mm = String(minute % 60).padStart(2, '0')
  return `${HH}:${mm}`;
}