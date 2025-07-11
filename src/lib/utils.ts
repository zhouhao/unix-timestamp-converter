import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Timestamp conversion utilities
export function isValidTimestamp(timestamp: string | number): boolean {
  const num = typeof timestamp === 'string' ? parseFloat(timestamp) : timestamp
  return !isNaN(num) && isFinite(num) && num > 0
}

export function detectTimestampFormat(timestamp: number): 'seconds' | 'milliseconds' {
  // Timestamps after year 2001 in seconds will be > 978307200
  // Timestamps before year 2500 in milliseconds will be < 16725225600000
  if (timestamp > 1000000000000) {
    return 'milliseconds'
  }
  return 'seconds'
}

export function convertTimestampToDate(timestamp: number): Date {
  const format = detectTimestampFormat(timestamp)
  return new Date(format === 'seconds' ? timestamp * 1000 : timestamp)
}

export function formatDateTime(date: Date, timezone: string = 'local'): string {
  if (timezone === 'UTC') {
    return date.toISOString().replace('T', ' ').replace('.000Z', ' UTC')
  }
  return date.toLocaleString()
}

export function getCurrentTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

// Comprehensive timezone list for global coverage
export const MAJOR_TIMEZONES = [
  // UTC
  {value: 'UTC', label: 'UTC (Coordinated Universal Time)'},

  // North America
  {value: 'America/New_York', label: 'EST/EDT (New York, Eastern)'},
  {value: 'America/Chicago', label: 'CST/CDT (Chicago, Central)'},
  {value: 'America/Denver', label: 'MST/MDT (Denver, Mountain)'},
  {value: 'America/Los_Angeles', label: 'PST/PDT (Los Angeles, Pacific)'},
  {value: 'America/Vancouver', label: 'PST/PDT (Vancouver)'},
  {value: 'America/Toronto', label: 'EST/EDT (Toronto)'},
  {value: 'America/Mexico_City', label: 'CST/CDT (Mexico City)'},

  // South America
  {value: 'America/Sao_Paulo', label: 'BRT (São Paulo)'},
  {value: 'America/Argentina/Buenos_Aires', label: 'ART (Buenos Aires)'},
  {value: 'America/Lima', label: 'PET (Lima)'},
  {value: 'America/Bogota', label: 'COT (Bogotá)'},

  // Europe
  {value: 'Europe/London', label: 'GMT/BST (London)'},
  {value: 'Europe/Paris', label: 'CET/CEST (Paris)'},
  {value: 'Europe/Berlin', label: 'CET/CEST (Berlin)'},
  {value: 'Europe/Rome', label: 'CET/CEST (Rome)'},
  {value: 'Europe/Madrid', label: 'CET/CEST (Madrid)'},
  {value: 'Europe/Amsterdam', label: 'CET/CEST (Amsterdam)'},
  {value: 'Europe/Zurich', label: 'CET/CEST (Zurich)'},
  {value: 'Europe/Vienna', label: 'CET/CEST (Vienna)'},
  {value: 'Europe/Stockholm', label: 'CET/CEST (Stockholm)'},
  {value: 'Europe/Oslo', label: 'CET/CEST (Oslo)'},
  {value: 'Europe/Copenhagen', label: 'CET/CEST (Copenhagen)'},
  {value: 'Europe/Helsinki', label: 'EET/EEST (Helsinki)'},
  {value: 'Europe/Warsaw', label: 'CET/CEST (Warsaw)'},
  {value: 'Europe/Prague', label: 'CET/CEST (Prague)'},
  {value: 'Europe/Budapest', label: 'CET/CEST (Budapest)'},
  {value: 'Europe/Athens', label: 'EET/EEST (Athens)'},
  {value: 'Europe/Istanbul', label: 'TRT (Istanbul)'},
  {value: 'Europe/Moscow', label: 'MSK (Moscow)'},

  // Asia
  {value: 'Asia/Dubai', label: 'GST (Dubai, UAE)'},
  {value: 'Asia/Kolkata', label: 'IST (Mumbai, Delhi)'},
  {value: 'Asia/Dhaka', label: 'BST (Dhaka)'},
  {value: 'Asia/Bangkok', label: 'ICT (Bangkok)'},
  {value: 'Asia/Jakarta', label: 'WIB (Jakarta)'},
  {value: 'Asia/Singapore', label: 'SGT (Singapore)'},
  {value: 'Asia/Hong_Kong', label: 'HKT (Hong Kong)'},
  {value: 'Asia/Shanghai', label: 'CST (Beijing, Shanghai)'},
  {value: 'Asia/Taipei', label: 'CST (Taipei)'},
  {value: 'Asia/Seoul', label: 'KST (Seoul)'},
  {value: 'Asia/Tokyo', label: 'JST (Tokyo)'},
  {value: 'Asia/Manila', label: 'PHT (Manila)'},
  {value: 'Asia/Karachi', label: 'PKT (Karachi)'},
  {value: 'Asia/Tehran', label: 'IRST (Tehran)'},
  {value: 'Asia/Jerusalem', label: 'IST (Jerusalem)'},
  {value: 'Asia/Riyadh', label: 'AST (Riyadh)'},

  // Africa
  {value: 'Africa/Cairo', label: 'EET (Cairo)'},
  {value: 'Africa/Lagos', label: 'WAT (Lagos)'},
  {value: 'Africa/Johannesburg', label: 'SAST (Johannesburg)'},
  {value: 'Africa/Nairobi', label: 'EAT (Nairobi)'},
  {value: 'Africa/Casablanca', label: 'WET (Casablanca)'},

  // Oceania
  {value: 'Australia/Sydney', label: 'AEST/AEDT (Sydney)'},
  {value: 'Australia/Melbourne', label: 'AEST/AEDT (Melbourne)'},
  {value: 'Australia/Perth', label: 'AWST (Perth)'},
  {value: 'Pacific/Auckland', label: 'NZST/NZDT (Auckland)'},
  {value: 'Pacific/Fiji', label: 'FJT (Fiji)'},
  {value: 'Pacific/Honolulu', label: 'HST (Honolulu)'},

  // Others
  {value: 'Atlantic/Reykjavik', label: 'GMT (Reykjavik)'},
  {value: 'America/Anchorage', label: 'AKST/AKDT (Anchorage)'},
]