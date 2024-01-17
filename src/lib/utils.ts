import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// A hacky way to determine if an interview is done, in the event the text spills over through the stream
export const endInterviewDelimiter = '@@END_OF_INTERVIEW@@';
