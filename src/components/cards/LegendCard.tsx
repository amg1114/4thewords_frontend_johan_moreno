import { formatDistanceToNow } from 'date-fns';
import type { Legend } from '@models/legend.interface';
import clsx from 'clsx';
import { useState } from 'react';
import { CalendarIcon, CircleUserRound, MapPin, SquarePenIcon, TagIcon, TrashIcon } from 'lucide-react';
import { Link } from 'react-router';
import useDashboard from '@hooks/useDashboard';

export default function LegendCard({ legend }: { legend: Legend }) {
  const [loadedImage, setLoadedImage] = useState(false);
  const relativeDate = formatDistanceToNow(new Date(legend.date));
  const { deleteLegend } = useDashboard();
  return (
    <div className="flex flex-col gap-2 rounded border border-gray-200 p-4">
      <img
        src={legend.image_url}
        alt={legend.name}
        className={clsx('mx-auto mb-2 h-56 w-auto rounded object-cover', {
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
      <h2 className="flex items-center gap-2 text-xl font-bold text-gray-600">
        {legend.name}
        <Link
          to={`/dashboard/legends/edit/${legend.id}`}
          className="rounded bg-green-600 px-2 py-1 text-xs text-white transition-colors hover:bg-green-700"
        >
          <SquarePenIcon />
        </Link>
        <button
          type="button"
          className="rounded bg-red-600 px-2 py-1 text-xs text-white transition-colors hover:bg-red-700"
          onClick={() => deleteLegend(legend.id)}
        >
          <TrashIcon />
        </button>
      </h2>
      <p>{legend.description}</p>
      <span className="flex w-fit items-center gap-1 text-xs text-gray-500">
        <CircleUserRound /> by {legend.publisher.name}
      </span>
      <span className="flex w-fit items-center gap-1 text-xs text-gray-500">
        <MapPin /> {legend.province.name}, {legend.canton.name} - {legend.district.name}
      </span>
    </div>
  );
}
