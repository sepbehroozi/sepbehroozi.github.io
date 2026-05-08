import type { DateRange } from '../data/resume';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

// Render 'YYYY' as '2021' and 'YYYY-MM' as 'Feb 2021'.
// Anything else is returned unchanged so callers can render literal strings.
function formatPoint(value: string): string {
  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) return value;
  const year = match[1];
  const monthIndex = parseInt(match[2], 10) - 1;
  if (monthIndex < 0 || monthIndex > 11) return value;
  return `${MONTHS[monthIndex]} ${year}`;
}

export function formatRange(range: DateRange): string {
  const end = range.end === 'present' ? 'Present' : formatPoint(range.end);
  return `${formatPoint(range.start)} – ${end}`;
}
