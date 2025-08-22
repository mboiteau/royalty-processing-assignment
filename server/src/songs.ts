export interface Song {
  id: number;
  name: string;
  author: string;
  progress: number;
}

export const songs: Song[] = [
  { id: 1, name: "Flowers", author: "Miley Cyrus", progress: 0.15 },
  { id: 2, name: "Anti-Hero", author: "Taylor Swift", progress: 0.27 },
  { id: 3, name: "As It Was", author: "Harry Styles", progress: 0.62 },
  { id: 4, name: "Bad Habit", author: "Steve Lacy", progress: 0.84 },
  { id: 5, name: "Unholy", author: "Sam Smith ft. Kim Petras", progress: 0.41 },
  { id: 6, name: "Heat Waves", author: "Glass Animals", progress: 0.93 },
  { id: 7, name: "About Damn Time", author: "Lizzo", progress: 0.58 },
  { id: 8, name: "Running Up That Hill", author: "Kate Bush", progress: 0.72 },
  { id: 9, name: "Stay", author: "The Kid LAROI & Justin Bieber", progress: 0.36 },
  { id: 10, name: "Good 4 U", author: "Olivia Rodrigo", progress: 0.89 }
];
