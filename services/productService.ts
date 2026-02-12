/*
 * @Description: Product data service (temporary mock data)
 */

import { Product, Category, Banner } from '@/types/product';

// Mock data for V1.0
export const getBanners = (): Banner[] => [
  {
    id: '1',
    title: 'Зимняя распродажа',
    subtitle: 'Скидки до 50%',
    image: require('@/assets/images/hero-banner.png'),
    discount: '50%',
  },
];

export const getCategories = (): Category[] => [
  { id: '1', name: 'Женщинам', icon: 'woman', count: 245 },
  { id: '2', name: 'Мужчинам', icon: 'man', count: 189 },
  { id: '3', name: 'Детям', icon: 'child-care', count: 156 },
  { id: '4', name: 'Аксессуары', icon: 'watch', count: 98 },
  { id: '5', name: 'Обувь', icon: 'checkroom', count: 134 },
  { id: '6', name: 'Спорт', icon: 'fitness-center', count: 87 },
];

export const getProducts = (): Product[] => [
  {
    id: '1',
    name: 'Платье вечернее',
    price: 4500,
    originalPrice: 9000,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop',
    category: 'Женщинам',
    brand: 'Bishkek Fashion',
    rating: 4.8,
    reviewCount: 124,
    sizes: ['S', 'M', 'L'],
    colors: ['#DC143C', '#1A0000', '#FFD700'],
    isSale: true,
  },
  {
    id: '2',
    name: 'Куртка зимняя',
    price: 8900,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop',
    category: 'Мужчинам',
    brand: 'Ala-Too Style',
    rating: 4.6,
    reviewCount: 89,
    sizes: ['M', 'L', 'XL'],
    colors: ['#1A0000', '#333333'],
    isNew: true,
  },
  {
    id: '3',
    name: 'Джинсы классические',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop',
    category: 'Женщинам',
    brand: 'Denim KG',
    rating: 4.7,
    reviewCount: 156,
    sizes: ['26', '28', '30', '32'],
    colors: ['#4169E1', '#1A1A1A'],
  },
  {
    id: '4',
    name: 'Свитер шерстяной',
    price: 2800,
    originalPrice: 3500,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop',
    category: 'Женщинам',
    brand: 'Warm KG',
    rating: 4.5,
    reviewCount: 67,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#DC143C', '#FFFFFF', '#FFD700'],
    isSale: true,
  },
  {
    id: '5',
    name: 'Пальто демисезонное',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=500&fit=crop',
    category: 'Мужчинам',
    brand: 'Elite Fashion',
    rating: 4.9,
    reviewCount: 203,
    sizes: ['M', 'L', 'XL'],
    colors: ['#8B4513', '#1A0000'],
    isNew: true,
  },
  {
    id: '6',
    name: 'Детский комбинезон',
    price: 2400,
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&h=500&fit=crop',
    category: 'Детям',
    brand: 'Kids Joy',
    rating: 4.8,
    reviewCount: 112,
    sizes: ['2-3', '4-5', '6-7'],
    colors: ['#DC143C', '#FFD700', '#4169E1'],
  },
];

export const searchProducts = (query: string, filters?: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  brands?: string[];
}): Product[] => {
  let results = getProducts();
  
  if (query) {
    results = results.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  if (filters?.category) {
    results = results.filter(p => p.category === filters.category);
  }
  
  if (filters?.minPrice !== undefined) {
    results = results.filter(p => p.price >= filters.minPrice!);
  }
  
  if (filters?.maxPrice !== undefined) {
    results = results.filter(p => p.price <= filters.maxPrice!);
  }
  
  if (filters?.sizes && filters.sizes.length > 0) {
    results = results.filter(p => 
      p.sizes.some(s => filters.sizes!.includes(s))
    );
  }
  
  if (filters?.brands && filters.brands.length > 0) {
    results = results.filter(p => filters.brands!.includes(p.brand));
  }
  
  return results;
};
