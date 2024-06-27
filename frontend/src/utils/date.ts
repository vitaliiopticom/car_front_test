import {
  addMonths,
  Duration,
  endOfDay,
  endOfMonth,
  format,
  isFirstDayOfMonth,
  isValid,
  parseISO,
  parseJSON,
  set,
  startOfMonth,
  Locale
} from 'date-fns';
import { de, es, fr } from 'date-fns/locale';

type DateValue = Date | string | number | null | undefined;

export type FormatDateTimeLang = 'de' | 'fr' | 'es';

const localeMap: Record<FormatDateTimeLang, Locale> = {
  de,
  fr,
  es,
};

export const parseDate = (date: DateValue, iso?: boolean) => {
  if (!date) return null;
// @ts-ignore
  const parsed = iso ? parseISO(date as string) : parseJSON(date);

  if (!parsed || !isValid(parsed)) return null;

  return parsed;
};

export const formatDate = (date: Date, pattern = 'dd/MM/yyyy') => {
  return format(date, pattern);
};

export const formatDateTime = (
  date: Date,
  pattern = 'dd/MM/yyyy HH:mm',
  language?: FormatDateTimeLang,
) => {
  return format(date, pattern, {
    locale: language ? localeMap[language] : undefined,
  });
};

export const formatDateToAPI = (date: Date) => {
  if (!date) return '';

  return date.toJSON();
};

export const setDate = (date: Date, duration: Duration) => {
  return set(date, duration);
};

export const endOfTheDay = (date: Date) => {
  return endOfDay(date);
};

const getFirstAndLastDayOfMonth = (date = new Date()) => {
  return {
    dateFrom: startOfMonth(date),
    dateTo: endOfTheDay(endOfMonth(date)),
  };
};

export const getFirstAndCurrentDayOfMonth = (date = new Date()) => {
  if (isFirstDayOfMonth(date)) {
    return getFirstAndLastDayOfMonth(addMonths(date, -1));
  }

  return { dateFrom: startOfMonth(date), dateTo: endOfTheDay(date) };
};
