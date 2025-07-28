import { formatDistanceToNow } from 'date-fns';
import type { Legend } from '@models/legend.interface';
import clsx from 'clsx';
import { useState } from 'react';
import { CalendarIcon, CircleUserRound, TagIcon } from 'lucide-react';

export default function LegendCard({ legend }: { legend: Legend }) {
  const [loadedImage, setLoadedImage] = useState(false);
  const relativeDate = formatDistanceToNow(new Date(legend.date));

  return (
    <div className="flex flex-col gap-2 rounded border border-gray-200 p-4">
      <img
        src={legend.image_url}
        alt={legend.name}
        className={clsx('mb-2 h-auto w-full rounded object-cover', {
          hidden: !loadedImage,
        })}
        onLoad={() => setLoadedImage(true)}
      />
      {!loadedImage && <div className="mb-2 aspect-video w-full animate-pulse rounded bg-gray-200" />}
      <div className="flex items-center gap-1 text-xs text-gray-900">
        <span className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1">
          <TagIcon /> {legend.category.name}
        </span>
        <time dateTime={legend.date} className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1">
          <CalendarIcon /> {relativeDate} ago
        </time>
      </div>
      <h2 className="text-xl font-bold text-gray-600">{legend.name}</h2>
      <p>{legend.description}</p>
      <span className="flex w-fit items-center gap-1 text-xs text-gray-500">
        <CircleUserRound /> by {legend.publisher.name}
      </span>
    </div>
  );
}
