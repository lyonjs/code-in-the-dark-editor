'use client';
import useSWR from 'swr';
import fetchTemplates from '../actions/fetchTemplates';

export function useFetchTemplates() {
  const { data: templates } = useSWR(
    'templates',
    async () => {
      return await fetchTemplates();
    },
    {
      refreshInterval: 2000,
    }
  );

  return { templates };
}
