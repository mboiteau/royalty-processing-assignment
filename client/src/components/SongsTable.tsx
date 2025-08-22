import { memo, useCallback, useState } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { addInvoiceEntry } from '../store/invoicesSlice';
import type { Song } from '../types';
import SongRow from './SongRow';

interface SongsTableProps {
  songs: Song[];
}

interface IssuedInvoice {
  songId: number;
  date: string;
  progress: number;
}

const SongsTable = ({ songs }: SongsTableProps) => {
  const dispatch = useAppDispatch();
  const [issuedInvoices, setIssuedInvoices] = useState<IssuedInvoice[]>([]);

  const handleIssueInvoice = useCallback(
    (song: Song) => {
      const currentDateTime = new Date().toISOString();

      dispatch(
        addInvoiceEntry({
          songId: song.id,
          songName: song.name,
          author: song.author,
          progress: song.progress,
          date: currentDateTime,
        })
      );

      setIssuedInvoices(prev => [
        ...prev.filter(invoice => invoice.songId !== song.id),
        {
          songId: song.id,
          date: currentDateTime,
          progress: song.progress,
        },
      ]);
    },
    [dispatch]
  );

  const formatProgress = useCallback((progress: number) => {
    return `${Math.round(progress * 100)}%`;
  }, []);

  const formatDateTime = useCallback((dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }, []);

  const getIssuedInvoice = useCallback(
    (songId: number) => {
      return issuedInvoices.find(invoice => invoice.songId === songId);
    },
    [issuedInvoices]
  );

  if (songs.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">No songs available</div>
    );
  }

  return (
    <table className="bg-white mx-auto border border-gray-200 rounded-lg shadow-sm">
      <thead className="bg-gray-50 border-b text-left w-full">
        <tr>
          <th className="px-6 py-3 font-bold text-gray-500 w-40">ID</th>
          <th className="px-6 py-3 font-bold text-gray-500 w-96">Song Name</th>
          <th className="px-6 py-3 font-bold text-gray-500 w-80">Author</th>
          <th className="px-6 py-3 font-bold text-gray-500 w-64">Progress</th>
          <th className="px-6 py-3 font-bold text-gray-500 w-xl">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {songs.map((song, index) => (
          <SongRow
            key={song.id}
            song={song}
            index={index}
            issuedInvoice={getIssuedInvoice(song.id)}
            onIssueInvoice={handleIssueInvoice}
            formatProgress={formatProgress}
            formatDateTime={formatDateTime}
          />
        ))}
      </tbody>
    </table>
  );
};

export default memo(SongsTable);
