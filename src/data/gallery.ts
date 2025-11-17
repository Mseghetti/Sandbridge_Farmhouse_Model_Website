import { GalleryImage } from '../types';

export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    title: 'Ceremony Space',
    description: 'Beautiful outdoor ceremony setup with garden backdrop',
    image_url: 'https://images.pexels.com/photos/2506992/pexels-photo-2506992.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Ceremony',
    display_order: 1,
  },
  {
    id: '2',
    title: 'Reception Hall',
    description: 'Elegant indoor reception space with natural light',
    image_url: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Reception',
    display_order: 2,
  },
  {
    id: '3',
    title: 'Garden Grounds',
    description: 'Lush green gardens perfect for photos and strolling',
    image_url: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Grounds',
    display_order: 3,
  },
  {
    id: '4',
    title: 'Bridal Suite',
    description: 'Comfortable and spacious bridal preparation area',
    image_url: 'https://images.pexels.com/photos/3697609/pexels-photo-3697609.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Facilities',
    display_order: 4,
  },
  {
    id: '5',
    title: 'Cocktail Lounge',
    description: 'Intimate bar area for mingling and appetizers',
    image_url: 'https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Reception',
    display_order: 5,
  },
  {
    id: '6',
    title: 'Decorated Tables',
    description: 'Sample table settings and decor arrangements',
    image_url: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Details',
    display_order: 6,
  },
  {
    id: '7',
    title: 'Sunset Views',
    description: 'Golden hour backdrop perfect for evening celebrations',
    image_url: 'https://images.pexels.com/photos/4425323/pexels-photo-4425323.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Grounds',
    display_order: 7,
  },
  {
    id: '8',
    title: 'Outdoor Terrace',
    description: 'Covered terrace area for extended ceremonies and events',
    image_url: 'https://images.pexels.com/photos/3721520/pexels-photo-3721520.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Ceremony',
    display_order: 8,
  },
];

export const categories = ['All', 'Ceremony', 'Reception', 'Grounds', 'Facilities', 'Details'];
