export interface MenuItem {
  $id?: string;
  id: number; // For internal ordering
  title: string;
  price: string;
  rating: number;
  image: string;
  description: string;
  category?: string;
  
}

export interface MenuState {
  items: MenuItem[];
  loading: boolean;
  error: string | null;
}

export interface MenuCardProps {
  $id?: string;
  id: number;
  title: string;
  price: string | number;
  rating: number;
  image: string;
  description: string;
  category?: string;
  onAddToCart: () => void; 
}