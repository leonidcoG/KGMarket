/*
 * @Description: Feed service
 */

import { FeedItem, Mall, Shop } from '@/types/feed';

export const getFeedItems = (): FeedItem[] => {
  return [
    {
      id: '1',
      type: 'video',
      mediaUrl: require('@/assets/coffe.mp4'),
      thumbnail: 'https://i.pinimg.com/736x/33/c7/bf/33c7bf073f11851dd249e904fb7cbd38.jpg',
      product: {
        id: '1',
        name: 'Утренний кофе',
        price: 350,
        brand: 'Coffee House',
      },
      author: {
        name: 'Coffee Lover',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop',
      },
      likes: 1234,
      comments: 89,
      shares: 45,
    },
    {
      id: '2',
      type: 'image',
      mediaUrl: 'https://ya-modnaya.ru/_pu/6/90214064.jpg',
      thumbnail: 'https://ya-modnaya.ru/_pu/6/90214064.jpg',
      product: {
        id: '2',
        name: 'Модный образ 2026',
        price: 9800,
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
      type: 'image',
      mediaUrl: 'https://i.pinimg.com/originals/ee/6e/25/ee6e25c50fe5a138ae9e85f0f1bdc752.jpg',
      thumbnail: 'https://i.pinimg.com/originals/ee/6e/25/ee6e25c50fe5a138ae9e85f0f1bdc752.jpg',
      product: {
        id: '3',
        name: 'Стильный костюм',
        price: 11200,
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
      images: [
        require('@/assets/images/malls/vefa.jpg'),
        require('@/assets/images/malls/vefa_2.jpg'),
        require('@/assets/images/malls/vefa_3.jpg'),
      ],
      address: 'ул. Байтик Баатыра 98, Бишкек',
      schedule: 'Пн-Вс: 10:00 - 22:00',
      phone: '+996 312 590 000',
      description: 'Современный торгово-развлекательный центр. Множество брендовых магазинов, фуд-корт и кинотеатр.',
      coordinates: {
        latitude: 42.8636,
        longitude: 74.6163,
      },
      schemaUrl: 'https://vefa.kg/map',
      websiteUrl: 'https://vefa.kg',
      promotions: [
        'Скидки до 50% на весь ассортимент',
        'Акция 2+1 на детскую одежду',
        'Бесплатная доставка при заказе от 3000 сом',
      ],
    },
    {
      id: '2',
      name: 'Бишкек Парк',
      images: [
        require('@/assets/images/malls/bishkek_park/bp1.jpg'),
        require('@/assets/images/malls/bishkek_park/bp2.jpg'),
        require('@/assets/images/malls/bishkek_park/bp3.jpg'),
      ],
      address: 'ул. Киевская 148, Бишкек',
      schedule: 'Пн-Вс: 10:00 - 22:00',
      phone: '+996 312 345 678',
      description: 'Один из крупнейших ТРЦ в центре города. Большой выбор одежды, аксессуаров и развлечений.',
      coordinates: {
        latitude: 42.8752,
        longitude: 74.5884,
      },
      schemaUrl: 'https://bishkekpark.kg/map',
      websiteUrl: 'https://bishkekpark.kg',
      promotions: [
        'Розыгрыш автомобиля при покупке от 2000 сом',
        'Ночные скидки каждую пятницу',
      ],
    },
    {
      id: '3',
      name: 'Азия Молл',
      images: [
        require('@/assets/images/malls/asiamall.jpg'),
        require('@/assets/images/malls/asiamall_2.jpg'),
        require('@/assets/images/malls/asiamall_3.jpg'),
      ],
      address: 'пр. Ч. Айтматова 3, Бишкек',
      schedule: 'Пн-Вс: 10:00 - 22:00',
      phone: '+996 312 567 890',
      description: 'Новый просторный торговый центр с современным дизайном и удобной парковкой.',
      coordinates: {
        latitude: 42.8547,
        longitude: 74.5878,
      },
      schemaUrl: 'https://asiamall.kg/map',
      websiteUrl: 'https://asiamall.kg',
      promotions: [
        'Фестиваль еды на фуд-корте',
        'Скидка 10% для именинников',
      ],
    },
  ];
};

export const getShops = (): Shop[] => {
  return [
    {
      id: '1',
      name: 'Fashion Store KG',
      images: [
        require('@/assets/images/shops/gallery/fashion_main.jpg'),
        require('@/assets/images/shops/gallery/fashion_2.jpg'),
        require('@/assets/images/shops/gallery/fashion_3.jpg'),
      ],
      logo: require('@/assets/images/shops/logos/fashion_logo.jpg'),
      addresses: [
        'ТЦ Вефа, 2 этаж, бутик 215',
        'ТЦ Дордой Плаза, 1 этаж, бутик 105',
        'ТЦ Азия Молл, 3 этаж, бутик 312',
      ],
      phone: '+996 555 123 456',
      coordinates: {
        latitude: 42.8636,
        longitude: 74.6163,
      },
      schemaUrl: 'https://example.com/schema1',
      description: 'Модная одежда европейского качества. Официальный представитель ведущих брендов.',
      rating: 4.8,
      reviewCount: 342,
      videoCount: 24,
      productCount: 156,
    },
    {
      id: '2',
      name: 'Men Style',
      images: [
        require('@/assets/images/shops/gallery/men_main.jpg'),
        require('@/assets/images/shops/gallery/men_2.jpg'),
        require('@/assets/images/shops/gallery/men_3.jpg'),
      ],
      logo: require('@/assets/images/shops/logos/men_logo.jpg'),
      addresses: [
        'ТЦ Бишкек Парк, 2 этаж, бутик B12',
        'ТЦ Азия Молл, 1 этаж, бутик A45',
      ],
      phone: '+996 700 987 654',
      coordinates: {
        latitude: 42.8752,
        longitude: 74.5884,
      },
      schemaUrl: 'https://example.com/schema2',
      description: 'Классические и современные мужские костюмы. Аксессуары и обувь от лучших мастеров.',
      rating: 4.9,
      reviewCount: 128,
      videoCount: 12,
      productCount: 84,
    },
  ];
};
