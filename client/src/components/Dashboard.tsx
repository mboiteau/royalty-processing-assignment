import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { clearError, fetchSongs } from '../store/songsSlice';
import InvoiceHistory from './InvoiceHistory';
import SongsTable from './SongsTable';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { songs, loading, error } = useAppSelector(state => state.songs);

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-lg">Loading songs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <div className="flex items-center justify-between">
          <div className="text-red-600">Error: {error}</div>
          <button
            onClick={() => dispatch(clearError())}
            className="text-red-500 hover:text-red-700 underline"
          >
            Dismiss
          </button>
        </div>
        <button
          onClick={() => dispatch(fetchSongs())}
          className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold mb-4">Songs Library</h2>
        <SongsTable songs={songs} />
      </div>
      <div>
        <InvoiceHistory />
      </div>
    </div>
  );
};

export default Dashboard;
