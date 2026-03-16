export interface BlogItem {
  $id?: string;
  title: string;
  description: string;
  image: string;
  date: string; 
  createdAt?: string;
}

export interface BlogState {
  items: BlogItem[];
  loading: boolean;
  error: string | null;
}