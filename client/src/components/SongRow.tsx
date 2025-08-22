import { memo, useCallback } from 'react';
import type { Song } from '../types';

interface IssuedInvoice {
  songId: number;
  date: string;
  progress: number;
}

interface SongRowProps {
  song: Song;
  index: number;
  issuedInvoice: IssuedInvoice | undefined;
  onIssueInvoice: (song: Song) => void;
  formatProgress: (progress: number) => string;
  formatDateTime: (dateTime: string) => string;
}

const SongRow = memo(
  ({
    song,
    index,
    issuedInvoice,
    onIssueInvoice,
    formatProgress,
    formatDateTime,
  }: SongRowProps) => {
    const handleClick = useCallback(() => {
      onIssueInvoice(song);
    }, [onIssueInvoice, song]);

    const rowClassName = `${
      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
    } hover:bg-gray-100`;

    const progressWidth = `${song.progress * 100}%`;

    return (
      <tr key={song.id} className={rowClassName}>
        <td className="px-6 py-4 text-sm font-medium text-gray-900">
          #{song.id}
        </td>
        <td className="px-6 py-4 text-sm text-gray-900">
          <div className="font-medium">{song.name}</div>
        </td>
        <td className="px-6 py-4 text-sm text-gray-700">{song.author}</td>
        <td className="px-6 py-4 text-sm text-gray-700">
          <div className="flex items-center">
            <div className="w-16 bg-gray-200 rounded-full mr-3">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: progressWidth }}
              />
            </div>
            <span className="text-xs font-medium">
              {formatProgress(song.progress)}
            </span>
          </div>
        </td>
        <td className="px-6 py-4 text-sm">
          <div className="flex items-start space-x-4 min-h-[3rem]">
            <button
              onClick={handleClick}
              className="px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 hover:cursor-pointer flex-shrink-0"
            >
              Issue Invoice
            </button>
            <div className="flex-1 min-w-0">
              {issuedInvoice && (
                <div className="text-xs text-green-600">
                  <div>Issued: {formatDateTime(issuedInvoice.date)}</div>
                  <div>Progress: {formatProgress(issuedInvoice.progress)}</div>
                </div>
              )}
            </div>
          </div>
        </td>
      </tr>
    );
  }
);

export default SongRow;
