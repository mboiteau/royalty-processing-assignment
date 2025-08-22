export interface Song {
  id: number;
  name: string;
  author: string;
  progress: number;
}

export interface InvoiceEntry {
  id: number;
  songId: number;
  songName: string;
  author: string;
  progress: number;
  date: string;
}
