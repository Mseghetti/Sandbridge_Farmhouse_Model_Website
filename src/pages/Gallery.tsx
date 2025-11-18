import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  public_url: string;
  is_featured: boolean;
  display_order: number;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('display_order', { ascending: true })
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredImages = images;

  const handlePrevImage = () => {
    setLightboxIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
    setSelectedImage(filteredImages[lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1]);
  };

  const handleNextImage = () => {
    setLightboxIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
    setSelectedImage(filteredImages[lightboxIndex === filteredImages.length - 1 ? 0 : lightboxIndex + 1]);
  };

  const openImage = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setLightboxIndex(index);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sage-500"></div>
          <p className="mt-4 text-stone-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-b from-sand-100 to-sand-50 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-sage-500 text-sm font-medium tracking-wide uppercase">
            Explore Our Spaces
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mt-2">
            Venue Gallery
          </h1>
          <p className="text-lg text-stone-600 mt-4 max-w-2xl mx-auto">
            Work in progress - More photos coming soon! Discover the beauty and elegance of Sandbridge Farmhouse.
          </p>
        </div>
      </div>

      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {images.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-stone-600 text-lg">No images in gallery yet. Upload some images to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => openImage(image, index)}
                  className="group relative overflow-hidden rounded-lg aspect-video cursor-pointer focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
                >
                  <img
                    src={image.public_url}
                    alt={image.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div>
                      <h3 className="font-semibold text-white text-lg">{image.title}</h3>
                      {image.description && (
                        <p className="text-sand-200 text-sm">{image.description}</p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-stone-900/95 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close"
            >
              <X size={24} className="text-white" />
            </button>

            <img
              src={selectedImage.public_url}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
            />

            <div className="mt-4 text-center text-white">
              <h3 className="font-semibold text-lg">{selectedImage.title}</h3>
              {selectedImage.description && (
                <p className="text-sand-200">{selectedImage.description}</p>
              )}
            </div>

            <div className="flex items-center justify-between mt-4">
              <button
                onClick={handlePrevImage}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              <span className="text-white text-sm">
                {lightboxIndex + 1} / {filteredImages.length}
              </span>

              <button
                onClick={handleNextImage}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
