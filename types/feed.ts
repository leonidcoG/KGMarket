/*
 * @Description: Feed types
 */

export interface FeedItem {
  id: string;
  type: 'video' | 'image';
  mediaUrl: any;
  thumbnail?: string;
  product: {
    id: string;
    name: string;
    price: number;
    brand: string;
  };
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
  comments: number;
  shares: number;
}

export interface Mall {
  id: string;
  name: string;
  images: any[]; // Поддержка URL и require()
  address: string;
  description: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  schemaUrl?: string;
  websiteUrl?: string;
  promotions: string[];
  phone: string;
  schedule: string;
}

export interface Shop {
  id: string;
  name: string;
  images: any[]; // Поддержка URL и require()
  logo: any; // Поддержка URL и require()
  addresses: string[];
  phone: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  schemaUrl?: string;
  description: string;
  rating: number;
  reviewCount: number;
  videoCount: number;
  productCount: number;
}
