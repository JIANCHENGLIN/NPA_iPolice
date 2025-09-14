import { useState, useRef } from 'react';
import { useFraudForm } from '../FraudFormContext';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Upload, Camera, X, FileText, Image } from 'lucide-react';

export function FileUploadPage() {
  const { state, dispatch } = useFraudForm();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(file => {
      // 檢查檔案類型
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        alert('不支援的檔案格式。請上傳 JPG、PNG、GIF 或 PDF 檔案。');
        return;
      }

      // 檢查檔案大小
      if (file.size > 10 * 1024 * 1024) { // 10MB
        alert('檔案大小不能超過 10MB');
        return;
      }

      dispatch({ type: 'ADD_FILE', file });
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const removeFile = (index: number) => {
    dispatch({ type: 'REMOVE_FILE', index });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <Image size={20} className="text-blue-500" />;
    } else if (fileType === 'application/pdf') {
      return <FileText size={20} className="text-red-500" />;
    }
    return <FileText size={20} className="text-gray-500" />;
  };

  // 模擬拍照功能
  const takePhoto = () => {
    // 模擬拍照結果
    const mockPhoto = new File(['mock photo content'], 'photo.jpg', { type: 'image/jpeg' });
    dispatch({ type: 'ADD_FILE', file: mockPhoto });
  };

  return (
    <div className="p-5 space-y-6">
      <h2 className="text-xl font-semibold" style={{ color: '#1C1C1E' }}>
        檔案上傳（選填）
      </h2>

      {/* 上傳區域 */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragOver 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Upload size={48} className="mx-auto mb-4 text-gray-400" />
        <p className="text-lg mb-2" style={{ color: '#1C1C1E' }}>
          拖拉檔案到此處或點擊選擇檔案
        </p>
        <p className="text-sm text-gray-500 mb-4">
          支援格式：JPG、PNG、GIF、PDF<br />
          檔案大小：最大 10MB
        </p>
        
        <div className="flex gap-3 justify-center">
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={16} className="mr-2" />
            選擇檔案
          </Button>
          
          <Button
            variant="outline"
            onClick={takePhoto}
          >
            <Camera size={16} className="mr-2" />
            拍照
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf"
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files)}
        />
      </div>

      {/* 已上傳檔案列表 */}
      {state.files.length > 0 && (
        <div className="space-y-3">
          <Label className="text-base font-medium">
            已上傳檔案 ({state.files.length})
          </Label>
          
          <div className="space-y-2">
            {state.files.map((file, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-md">
                {getFileIcon(file.type)}
                <div className="flex-1 ml-3">
                  <div className="text-sm font-medium" style={{ color: '#1C1C1E' }}>
                    {file.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatFileSize(file.size)} • {file.type}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 上傳說明 */}
      <div className="p-4 bg-blue-50 rounded-md border border-blue-200">
        <h4 className="font-medium text-blue-800 mb-2">上傳建議</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• 詐騙相關對話截圖</li>
          <li>• 轉帳收據或付款證明</li>
          <li>• 可疑網站頁面截圖</li>
          <li>• 其他相關證據文件</li>
        </ul>
      </div>

      {/* 隱私聲明 */}
      <div className="p-4 bg-gray-50 rounded-md">
        <p className="text-sm text-gray-600">
          <strong>隱私保護：</strong><br />
          上傳的檔案僅用於詐騙案件調查，將依法保護您的個人隱私。
          系統會自動移除圖片中的GPS等敏感資訊。
        </p>
      </div>
    </div>
  );
}