'use client';

import { useAppSelector } from '@/redux/hooks';

// ----------------------------------------------------------------------

export function ContactMap() {
  const { vendor } = useAppSelector((state) => state.vendor);
  const map_link = vendor?.map_link;

  return (
    <div className="w-full h-full min-h-[300px]">
      <iframe
        src={map_link}
        width="100%"
        height="100%"
        className="border-0 block w-full h-full"
        loading='lazy'
      />
    </div>
  );
}