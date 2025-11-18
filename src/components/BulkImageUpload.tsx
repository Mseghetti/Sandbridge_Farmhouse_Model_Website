import { useState } from 'react';
import { Upload, X, Check, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface UploadStatus {
  file: File;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
  imageId?: string;
}

export default function BulkImageUpload() {
  const [files, setFiles] = useState<UploadStatus[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const imageFiles = selectedFiles.filter(file => file.type.startsWith('image/'));

    const newFiles: UploadStatus[] = imageFiles.map(file => ({
      file,
      status: 'pending',
      progress: 0
    }));

    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async () => {
    if (files.length === 0) return;

    setIsUploading(true);

    for (let i = 0; i < files.length; i++) {
      const fileStatus = files[i];

      if (fileStatus.status === 'success') continue;

      setFiles(prev => prev.map((f, idx) =>
        idx === i ? { ...f, status: 'uploading', progress: 0 } : f
      ));

      try {
        const file = fileStatus.file;
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('gallery-images')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) throw uploadError;

        setFiles(prev => prev.map((f, idx) =>
          idx === i ? { ...f, progress: 50 } : f
        ));

        const { data: urlData } = supabase.storage
          .from('gallery-images')
          .getPublicUrl(filePath);

        const { data: dbData, error: dbError } = await supabase
          .from('gallery_images')
          .insert({
            title: file.name.replace(/\.[^/.]+$/, ''),
            storage_path: filePath,
            public_url: urlData.publicUrl,
            display_order: 0
          })
          .select()
          .single();

        if (dbError) throw dbError;

        setFiles(prev => prev.map((f, idx) =>
          idx === i ? { ...f, status: 'success', progress: 100, imageId: dbData.id } : f
        ));
      } catch (error) {
        setFiles(prev => prev.map((f, idx) =>
          idx === i ? {
            ...f,
            status: 'error',
            progress: 0,
            error: error instanceof Error ? error.message : 'Upload failed'
          } : f
        ));
      }
    }

    setIsUploading(false);
  };

  const successCount = files.filter(f => f.status === 'success').length;
  const errorCount = files.filter(f => f.status === 'error').length;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Bulk Image Upload</h2>

        <div className="mb-6">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF (Max 50 images at once)</p>
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={isUploading}
            />
          </label>
        </div>

        {files.length > 0 && (
          <>
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {files.length} file(s) selected
                {successCount > 0 && (
                  <span className="ml-2 text-green-600">
                    ({successCount} uploaded)
                  </span>
                )}
                {errorCount > 0 && (
                  <span className="ml-2 text-red-600">
                    ({errorCount} failed)
                  </span>
                )}
              </div>
              <button
                onClick={uploadImages}
                disabled={isUploading || files.every(f => f.status === 'success')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isUploading ? 'Uploading...' : 'Upload All'}
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto space-y-2">
              {files.map((fileStatus, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded overflow-hidden">
                    <img
                      src={URL.createObjectURL(fileStatus.file)}
                      alt={fileStatus.file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {fileStatus.file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(fileStatus.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    {fileStatus.error && (
                      <p className="text-xs text-red-600 mt-1">{fileStatus.error}</p>
                    )}
                  </div>

                  {fileStatus.status === 'uploading' && (
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${fileStatus.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">{fileStatus.progress}%</span>
                    </div>
                  )}

                  {fileStatus.status === 'success' && (
                    <div className="flex items-center gap-2 text-green-600">
                      <Check className="w-5 h-5" />
                      <span className="text-sm">Uploaded</span>
                    </div>
                  )}

                  {fileStatus.status === 'error' && (
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="w-5 h-5" />
                      <span className="text-sm">Failed</span>
                    </div>
                  )}

                  {fileStatus.status === 'pending' && !isUploading && (
                    <button
                      onClick={() => removeFile(index)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
