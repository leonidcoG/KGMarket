/*
 * @Description: Product types
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  sizes: string[];
  colors: string[];
  isNew?: boolean;
  isSale?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  discount?: string;
}
