import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
}

const categories = ['All', 'Exterior', 'Interior', 'Bedrooms', 'Kitchen', 'Outdoor Spaces'];

const propertyImages: GalleryImage[] = [
  { id: '1', url: '/DJI_0196.jpg', title: 'Aerial View', category: 'Exterior' },
  { id: '2', url: '/DJI_0198.jpg', title: 'Property Overview', category: 'Exterior' },
  { id: '3', url: '/DJI_0200.jpg', title: 'Pool Area', category: 'Outdoor Spaces' },
  { id: '4', url: '/DJI_0202.jpg', title: 'Sunset View', category: 'Exterior' },
  { id: '5', url: '/DJI_0206-2.jpg', title: 'Beach Access', category: 'Outdoor Spaces' },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredImages = selectedCategory === 'All'
    ? propertyImages
    : propertyImages.filter(img => img.category === selectedCategory);

  const handlePrevImage = () => {
    const newIndex = lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1;
    setLightboxIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const handleNextImage = () => {
    const newIndex = lightboxIndex === filteredImages.length - 1 ? 0 : lightboxIndex + 1;
    setLightboxIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const openImage = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setLightboxIndex(index);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'Escape') setSelectedImage(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, lightboxIndex, filteredImages]);

  return (
    <>
      <div className="bg-gradient-to-b from-stone-900 to-stone-800 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-amber-400 text-sm font-semibold tracking-wider uppercase">
            Visual Tour
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mt-3 mb-6">
            Property Gallery
          </h1>
          <p className="text-xl text-stone-300 max-w-3xl mx-auto leading-relaxed">
            Explore the stunning beauty of Sandbridge Farmhouse through our collection of professional photographs
          </p>
        </div>
      </div>

      <div className="bg-white border-b border-stone-200 sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          {filteredImages.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-stone-600">No images in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => openImage(image, index)}
                  className="group relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-offset-2 shadow-lg hover:shadow-2xl transition-all"
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-left">
                      <h3 className="font-bold text-white text-xl mb-1">{image.title}</h3>
                      <p className="text-amber-400 text-sm font-medium">{image.category}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-stone-900/97 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-6xl w-full max-h-[95vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 z-10 p-2 text-white hover:text-amber-400 transition-colors"
              aria-label="Close lightbox"
            >
              <X size={32} strokeWidth={2} />
            </button>

            <div className="relative bg-stone-950 rounded-xl overflow-hidden shadow-2xl">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>

            <div className="mt-6 text-center text-white">
              <h3 className="font-bold text-2xl mb-2">{selectedImage.title}</h3>
              <p className="text-amber-400 font-medium">{selectedImage.category}</p>
            </div>

            <div className="flex items-center justify-between mt-6 gap-4">
              <button
                onClick={handlePrevImage}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white backdrop-blur-sm"
                aria-label="Previous image"
              >
                <ChevronLeft size={28} strokeWidth={2} />
              </button>

              <div className="text-white text-lg font-medium">
                {lightboxIndex + 1} / {filteredImages.length}
              </div>

              <button
                onClick={handleNextImage}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white backdrop-blur-sm"
                aria-label="Next image"
              >
                <ChevronRight size={28} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
