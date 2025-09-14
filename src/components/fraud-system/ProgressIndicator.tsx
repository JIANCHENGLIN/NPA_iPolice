import { useFraudForm } from './FraudFormContext';

const pages = [
  { id: 1, name: '案情摘要', required: true },
  { id: 2, name: '詐騙資料', required: false },
  { id: 3, name: '檔案上傳', required: false },
  { id: 4, name: '案情說明', required: true },
  { id: 5, name: '基本資料', required: true },
  { id: 6, name: '地址資訊', required: false },
  { id: 7, name: '驗證送出', required: true }
];

export function ProgressIndicator() {
  const { currentPage, setCurrentPage } = useFraudForm();
  
  const progressPercentage = (currentPage / pages.length) * 100;

  return (
    <div className="bg-white px-5 py-3 border-b border-gray-100">
      {/* 進度條 */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
        <div 
          className="h-2 rounded-full transition-all duration-300"
          style={{ 
            width: `${progressPercentage}%`,
            backgroundColor: '#003087'
          }}
        />
      </div>
      
      {/* 頁面指示器 */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-1">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => setCurrentPage(page.id)}
              className={`w-6 h-6 rounded-full text-xs font-medium transition-colors duration-200 flex items-center justify-center ${
                page.id === currentPage
                  ? 'text-white'
                  : page.id < currentPage
                  ? 'text-white'
                  : 'text-gray-400 border'
              }`}
              style={{
                backgroundColor: page.id <= currentPage ? '#003087' : 'transparent',
                borderColor: page.id > currentPage ? '#E5E5E7' : 'transparent'
              }}
            >
              {page.id}
            </button>
          ))}
        </div>
        
        {/* 當前頁面名稱 */}
        <div className="text-sm" style={{ color: '#8E8E93' }}>
          {currentPage}/7 - {pages[currentPage - 1]?.name}
        </div>
      </div>
    </div>
  );
}