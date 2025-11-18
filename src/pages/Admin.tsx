import { useState, useEffect } from 'react';
import { Trash2, Edit2, Save, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import BulkImageUpload from '../components/BulkImageUpload';

interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  public_url: string;
  storage_path: string;
  is_featured: boolean;
  display_order: number;
}

export default function Admin() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', is_featured: false, display_order: 0 });

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

  const deleteImage = async (image: GalleryImage) => {
    if (!confirm(`Delete "${image.title}"?`)) return;

    try {
      const { error: storageError } = await supabase.storage
        .from('gallery-images')
        .remove([image.storage_path]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', image.id);

      if (dbError) throw dbError;

      setImages(prev => prev.filter(img => img.id !== image.id));
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image');
    }
  };

  const startEdit = (image: GalleryImage) => {
    setEditingId(image.id);
    setEditForm({
      title: image.title,
      description: image.description || '',
      is_featured: image.is_featured,
      display_order: image.display_order
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ title: '', description: '', is_featured: false, display_order: 0 });
  };

  const saveEdit = async (id: string) => {
    try {
      const { error } = await supabase
        .from('gallery_images')
        .update({
          title: editForm.title,
          description: editForm.description || null,
          is_featured: editForm.is_featured,
          display_order: editForm.display_order
        })
        .eq('id', id);

      if (error) throw error;

      setImages(prev => prev.map(img =>
        img.id === id ? { ...img, ...editForm, description: editForm.description || null } : img
      ));
      cancelEdit();
    } catch (error) {
      console.error('Error updating image:', error);
      alert('Failed to update image');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sage-500"></div>
          <p className="mt-4 text-stone-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-serif text-4xl font-bold text-stone-900 mb-8">Gallery Admin</h1>

        <div className="mb-12">
          <BulkImageUpload />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Manage Images ({images.length})</h2>

          {images.length === 0 ? (
            <p className="text-stone-600 text-center py-12">No images yet. Upload some above!</p>
          ) : (
            <div className="space-y-4">
              {images.map((image) => (
                <div key={image.id} className="flex gap-4 p-4 border border-stone-200 rounded-lg hover:border-sage-300 transition-colors">
                  <div className="flex-shrink-0 w-32 h-32 bg-stone-100 rounded overflow-hidden">
                    <img
                      src={image.public_url}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    {editingId === image.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editForm.title}
                          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                          className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-sage-500"
                          placeholder="Title"
                        />
                        <textarea
                          value={editForm.description}
                          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                          className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-sage-500"
                          placeholder="Description (optional)"
                          rows={2}
                        />
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={editForm.is_featured}
                              onChange={(e) => setEditForm({ ...editForm, is_featured: e.target.checked })}
                              className="rounded border-stone-300 text-sage-600 focus:ring-sage-500"
                            />
                            <span className="text-sm text-stone-700">Featured</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <span className="text-sm text-stone-700">Order:</span>
                            <input
                              type="number"
                              value={editForm.display_order}
                              onChange={(e) => setEditForm({ ...editForm, display_order: parseInt(e.target.value) || 0 })}
                              className="w-20 px-2 py-1 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-sage-500"
                            />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3 className="font-semibold text-lg text-stone-900">{image.title}</h3>
                        {image.description && (
                          <p className="text-stone-600 text-sm mt-1">{image.description}</p>
                        )}
                        <div className="flex gap-3 mt-2 text-xs text-stone-500">
                          {image.is_featured && (
                            <span className="px-2 py-1 bg-sage-100 text-sage-700 rounded">Featured</span>
                          )}
                          <span>Order: {image.display_order}</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    {editingId === image.id ? (
                      <>
                        <button
                          onClick={() => saveEdit(image.id)}
                          className="p-2 bg-sage-500 text-white rounded hover:bg-sage-600 transition-colors"
                          title="Save"
                        >
                          <Save size={20} />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-2 bg-stone-300 text-stone-700 rounded hover:bg-stone-400 transition-colors"
                          title="Cancel"
                        >
                          <X size={20} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(image)}
                          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={20} />
                        </button>
                        <button
                          onClick={() => deleteImage(image)}
                          className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={20} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
