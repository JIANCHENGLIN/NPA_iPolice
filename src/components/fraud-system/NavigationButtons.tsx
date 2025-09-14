import { useFraudForm } from './FraudFormContext';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const totalPages = 7;

export function NavigationButtons() {
  const { currentPage, setCurrentPage, state, saveDraft } = useFraudForm();

  // 檢查當前頁面是否已填寫必填欄位
  const isCurrentPageValid = () => {
    switch (currentPage) {
      case 1: // 案情摘要
        return state.isVictim !== null && state.fraudType !== '';
      case 4: // 案情說明
        return state.description !== '';
      case 5: // 基本資料
        return state.name !== '' && 
               state.gender !== '' && 
               state.birthDate !== '' && 
               state.idNumber !== '' && 
               state.phone !== '' && 
               state.email !== '';
      case 7: // 驗證送出
        return state.captchaCompleted;
      default:
        return true; // 選填頁面
    }
  };

  const handleNext = () => {
    if (!isCurrentPageValid()) {
      toast.error('請填寫完整必填欄位');
      return;
    }
    
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSaveDraft = () => {
    saveDraft();
    toast.success('草稿已儲存');
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="flex justify-between items-center">
        {/* 上一頁按鈕 */}
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="flex items-center"
        >
          <ChevronLeft size={16} className="mr-1" />
          上一頁
        </Button>

        {/* 儲存草稿按鈕 */}
        <Button
          variant="outline"
          onClick={handleSaveDraft}
          className="flex items-center"
        >
          <Save size={16} className="mr-1" />
          儲存草稿
        </Button>

        {/* 下一頁按鈕 */}
        <Button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="flex items-center"
          style={{ backgroundColor: '#003087' }}
        >
          下一頁
          <ChevronRight size={16} className="ml-1" />
        </Button>
      </div>

      {/* 頁面驗證提示 */}
      {!isCurrentPageValid() && (
        <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-md">
          <p className="text-sm text-orange-700">
            請填寫完整必填欄位後才能繼續下一頁
          </p>
        </div>
      )}
    </div>
  );
}