/*
 * @Description: Feed service
 */

import { FeedItem, Mall, Shop } from '@/types/feed';

export const getFeedItems = (): FeedItem[] => {
  return [
    {
      id: '1',
      type: 'video',
      mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&auto=format&fit=crop',
      product: {
        id: '1',
        name: 'Стильная куртка',
        price: 4500,
        brand: 'Fashion Brand',
      },
      author: {
        name: 'Модный блогер',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop',
      },
      likes: 1234,
      comments: 89,
      shares: 45,
    },
    {
      id: '2',
      type: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop',
      product: {
        id: '2',
        name: 'Модные кроссовки',
        price: 3200,
        brand: 'Sport Style',
      },
      author: {
        name: 'Стиль Бишкек',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop',
      },
      likes: 2456,
      comments: 156,
      shares: 78,
    },
    {
      id: '3',
      type: 'video',
      mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&auto=format&fit=crop',
      product: {
        id: '3',
        name: 'Платье вечернее',
        price: 5800,
        brand: 'Elegant',
      },
      author: {
        name: 'Fashion KG',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop',
      },
      likes: 3421,
      comments: 234,
      shares: 123,
    },
    {
      id: '4',
      type: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800&auto=format&fit=crop',
      product: {
        id: '4',
        name: 'Сумка кожаная',
        price: 2800,
        brand: 'Leather Co',
      },
      author: {
        name: 'Аксессуары KG',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop',
      },
      likes: 1890,
      comments: 92,
      shares: 34,
    },
    {
      id: '5',
      type: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop',
      product: {
        id: '5',
        name: 'Джинсы классические',
        price: 3600,
        brand: 'Denim Style',
      },
      author: {
        name: 'Fashion Trends',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop',
      },
      likes: 2134,
      comments: 145,
      shares: 67,
    },
  ];
};

export const getMalls = (): Mall[] => {
  return [
    {
      id: '1',
      name: 'Вефа Центр',
      image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800',
      address: 'пр. Чуй 155/1, Бишкек',
      schedule: 'Пн-Вс: 10:00 - 22:00',
      phone: '+996 312 123 456',
      promotions: [
        'Скидки до 50% на весь ассортимент',
        'Акция 2+1 на детскую одежду',
        'Бесплатная доставка при заказе от 3000 сом',
      ],
    },
    {
      id: '2',
      name: 'Дордой Плаза',
      image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800',
      address: 'ул. Ибраимова 115, Бишкек',
      schedule: 'Пн-Вс: 09:00 - 21:00',
      phone: '+996 312 987 654',
      promotions: [
        'Новая коллекция весна-лето 2026',
        'Скидка 30% на аксессуары',
      ],
    },
  ];
};

export const getShops = (): Shop[] => {
  return [
    {
      id: '1',
      name: 'Fashion Store KG',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200',
      addresses: [
        'ТЦ Вефа, 2 этаж, бутик 215',
        'ТЦ Дордой Плаза, 1 этаж, бутик 105',
        'ТЦ Азия Молл, 3 этаж, бутик 312',
      ],
      description: 'Модная одежда европейского качества. Официальный представитель ведущих брендов.',
      rating: 4.8,
      reviewCount: 342,
      videoCount: 24,
      productCount: 156,
    },
    {
      id: '2',
      name: 'Style Bishkek',
      image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800',
      logo: 'https://images.unsplash.com/photo-1558769132-cb1aea1f8cf5?w=200',
      addresses: [
        'ТЦ Вефа, 1 этаж, бутик 112',
        'ТЦ Глобус, 2 этаж, бутик 203',
      ],
      description: 'Стильная молодежная одежда по доступным ценам. Новые коллекции каждый месяц.',
      rating: 4.6,
      reviewCount: 218,
      videoCount: 18,
      productCount: 89,
    },
  ];
};
