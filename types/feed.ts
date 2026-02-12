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
  image: string;
  address: string;
  schedule: string;
  phone: string;
  promotions: string[];
}

export interface Shop {
  id: string;
  name: string;
  image: string;
  logo: string;
  addresses: string[];
  description: string;
  rating: number;
  reviewCount: number;
  videoCount: number;
  productCount: number;
}
