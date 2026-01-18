/**
 * Safely parse a date from an Astro collection date field
 * Handles timezone offset issues by constructing the date from components
 * @param dateInput - Date from Astro collection (could be Date object or string)
 * @returns A Date object representing midnight in local timezone
 */
export function parseCollectionDate(dateInput: Date | string): Date {
  let dateObj: Date;
  
  if (dateInput instanceof Date) {
    dateObj = dateInput;
  } else {
    dateObj = new Date(dateInput);
  }
  
  // Convert to ISO string and extract components to avoid timezone shifts
  const dateStr = dateObj.toISOString().split('T')[0];
  const [year, month, day] = dateStr.split('-');
  
  // Reconstruct date in local timezone
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

/**
 * Format a date for display in the UI
 * @param date - The date to format
 * @param options - Intl.DateTimeFormatOptions for customization
 * @returns Formatted date string
 */
export function formatDate(
  date: Date,
  options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
): string {
  return date.toLocaleDateString('en-US', options);
}

/**
 * Format a date for the month grouping in archive
 * @param date - The date to format
 * @returns Month and year string (e.g., "January 2026")
 */
export function formatMonthYear(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

/**
 * Format a date for short display (e.g., "Sat, Jan 18")
 * @param date - The date to format
 * @returns Short date string
 */
export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}
