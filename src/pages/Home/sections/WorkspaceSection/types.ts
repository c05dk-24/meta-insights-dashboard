export interface Note {
  id: string;
  text: string;
  color: string;
}

export interface Request {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
  timestamp: string;
}