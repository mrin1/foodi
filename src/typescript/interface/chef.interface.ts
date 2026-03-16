export interface ChefItem {
  $id?: string;
  name: string;
  image: string;
  designation: string;
  createdAt: string;
}

export interface ChefState {
  items: ChefItem[];
  loading: boolean;
  error: string | null;
}