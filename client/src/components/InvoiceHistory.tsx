import { useAppSelector } from '../hooks/redux';

const InvoiceHistory = () => {
  const invoiceEntries = useAppSelector(state => state.invoices.entries);

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatProgress = (progress: number) => {
    return `${Math.round(progress * 100)}%`;
  };

  if (invoiceEntries.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Invoice History
        </h2>
        <div className="text-center py-8 text-gray-500">
          No invoices have been issued yet
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Invoice History</h2>
        <p className="text-sm text-gray-600 mt-1">
          {invoiceEntries.length} invoice
          {invoiceEntries.length !== 1 ? 's' : ''} issued
        </p>
      </div>

      <div className="divide-y divide-gray-200">
        {invoiceEntries
          .slice()
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .map(invoice => (
            <div key={invoice.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {invoice.songName}
                  </div>
                  <div className="text-sm text-gray-600">
                    by {invoice.author}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-900">
                    {formatDateTime(invoice.date)}
                  </div>
                  <div className="text-sm text-gray-600">
                    Progress: {formatProgress(invoice.progress)}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default InvoiceHistory;
