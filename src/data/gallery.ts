import { GalleryImage } from '../types';

export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    title: 'Aerial Property View',
    description: 'Stunning aerial view of the farmhouse and surrounding grounds',
    image_url: '/DJI_0198 copy.jpg',
    category: 'Grounds',
    display_order: 1,
  },
  {
    id: '2',
    title: 'Estate Overview',
    description: 'Expansive view showcasing the property and natural landscape',
    image_url: '/DJI_0200 copy.jpg',
    category: 'Grounds',
    display_order: 2,
  },
  {
    id: '3',
    title: 'Waterfront Vista',
    description: 'Panoramic view of the property with waterway and forest',
    image_url: '/DJI_0202 copy.jpg',
    category: 'Grounds',
    display_order: 3,
  },
  {
    id: '4',
    title: 'Farmhouse Exterior',
    description: 'Charming farmhouse with wrap-around porch and manicured lawn',
    image_url: '/DJI_0206-2.jpg',
    category: 'Facilities',
    display_order: 4,
  },
  {
    id: '5',
    title: 'Property Aerial',
    description: 'Bird\'s eye view of the venue and surrounding property',
    image_url: '/DJI_0196 copy.jpg',
    category: 'Grounds',
    display_order: 5,
  },
];

export const categories = ['All', 'Ceremony', 'Reception', 'Grounds', 'Facilities', 'Details'];
