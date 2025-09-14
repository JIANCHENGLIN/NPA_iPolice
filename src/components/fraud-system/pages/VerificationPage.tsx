import { useState, useEffect } from 'react';
import { useFraudForm } from '../FraudFormContext';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { CheckCircle, RotateCcw, Send } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

// 圖片驗證題目
const captchaQuestions = [
  {
    question: '請點擊圖片中的貓',
    images: ['🐱', '🐶', '🚗', '🌳'],
    correctIndex: 0
  },
  {
    question: '請點擊圖片中的汽車',
    images: ['🌸', '🚗', '🏠', '🐦'],
    correctIndex: 1
  },
  {
    question: '請點擊圖片中的房子',
    images: ['🍎', '🌊', '🏠', '☀️'],
    correctIndex: 2
  },
  {
    question: '請點擊圖片中的樹',
    images: ['🌳', '🍔', '📱', '✈️'],
    correctIndex: 0
  }
];

export function VerificationPage() {
  const { state, dispatch } = useFraudForm();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const question = captchaQuestions[currentQuestion];

  // 重新產生驗證題目
  const regenerateCaptcha = () => {
    const newQuestionIndex = Math.floor(Math.random() * captchaQuestions.length);
    setCurrentQuestion(newQuestionIndex);
    setSelectedImage(null);
    dispatch({ type: 'SET_FIELD', field: 'captchaCompleted', value: false });
  };

  // 選擇圖片
  const selectImage = (index: number) => {
    setSelectedImage(index);
    
    if (index === question.correctIndex) {
      dispatch({ type: 'SET_FIELD', field: 'captchaCompleted', value: true });
      toast.success('驗證成功！');
    } else {
      dispatch({ type: 'SET_FIELD', field: 'captchaCompleted', value: false });
      toast.error('驗證失敗，請重新選擇');
      
      // 2秒後重新產生題目
      setTimeout(() => {
        regenerateCaptcha();
      }, 2000);
    }
  };

  // 檢查表單完整性
  const isFormComplete = () => {
    // 檢查必填欄位
    const requiredFields = [
      state.isVictim !== null,
      state.fraudType !== '',
      state.description !== '',
      state.name !== '',
      state.gender !== '',
      state.birthDate !== '',
      state.idNumber !== '',
      state.phone !== '',
      state.email !== '',
      state.captchaCompleted
    ];

    return requiredFields.every(field => field);
  };

  // 送出檢舉
  const submitReport = async () => {
    if (!isFormComplete()) {
      toast.error('請完成所有必填欄位');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 模擬送出API呼叫
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 清除草稿
      localStorage.removeItem('fraudFormDraft');
      
      toast.success('檢舉已成功送出！警方將儘速處理您的案件。');
      
      // 可以在這裡導航到成功頁面或重置表單
      
    } catch (error) {
      toast.error('送出失敗，請稍後再試');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-5 space-y-6">
      <h2 className="text-xl font-semibold" style={{ color: '#1C1C1E' }}>
        驗證與送出
      </h2>

      {/* 圖片驗證 */}
      <div className="space-y-4">
        <Label className="text-base font-medium">
          圖片驗證 <span className="text-red-500">*</span>
        </Label>
        
        <div className="p-4 border border-gray-200 rounded-md">
          <div className="text-center mb-4">
            <p className="text-lg font-medium mb-4" style={{ color: '#1C1C1E' }}>
              {question.question}
            </p>
            
            {/* 圖片網格 */}
            <div className="grid grid-cols-2 gap-3 max-w-64 mx-auto">
              {question.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => selectImage(index)}
                  className={`w-24 h-24 border-2 rounded-md flex items-center justify-center text-4xl transition-all ${
                    selectedImage === index
                      ? state.captchaCompleted
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  disabled={state.captchaCompleted}
                >
                  {image}
                </button>
              ))}
            </div>
          </div>
          
          {/* 重新產生按鈕 */}
          <div className="text-center">
            <Button
              variant="outline"
              size="sm"
              onClick={regenerateCaptcha}
            >
              <RotateCcw size={16} className="mr-2" />
              重新產生題目
            </Button>
          </div>
        </div>
        
        {/* 驗證狀態 */}
        {state.captchaCompleted && (
          <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-md">
            <CheckCircle size={20} className="text-green-600 mr-2" />
            <span className="text-green-700">圖片驗證已完成</span>
          </div>
        )}
      </div>

      {/* 表單檢查清單 */}
      <div className="space-y-3">
        <Label className="text-base font-medium">檢舉資料確認</Label>
        
        <div className="space-y-2">
          {[
            { label: '受騙狀態', completed: state.isVictim !== null },
            { label: '詐騙手法', completed: state.fraudType !== '' },
            { label: '案情說明', completed: state.description !== '' },
            { label: '基本資料', completed: state.name !== '' && state.gender !== '' && state.birthDate !== '' && state.idNumber !== '' && state.phone !== '' && state.email !== '' },
            { label: '圖片驗證', completed: state.captchaCompleted }
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                item.completed ? 'bg-green-500' : 'bg-gray-300'
              }`}>
                {item.completed && (
                  <CheckCircle size={12} className="text-white" />
                )}
              </div>
              <span className={`text-sm ${
                item.completed ? 'text-green-700' : 'text-gray-500'
              }`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 選填資料摘要 */}
      <div className="p-4 bg-blue-50 rounded-md border border-blue-200">
        <h4 className="font-medium text-blue-800 mb-2">選填資料摘要</h4>
        <div className="text-sm text-blue-700 space-y-1">
          <p>• 涉案電話：{state.phones.length} 筆</p>
          <p>• 涉案帳戶：{state.accounts.length} 筆</p>
          <p>• 遊戲點數：{state.gameCards.length} 筆</p>
          <p>• 條碼資料：{state.barcodes.length} 筆</p>
          <p>• 上傳檔案：{state.files.length} 個</p>
          <p>• 地址資訊：{state.currentAddress.county ? '已填寫' : '未填寫'}</p>
        </div>
      </div>

      {/* 送出檢舉按鈕 */}
      <div className="space-y-3">
        <Button
          onClick={submitReport}
          disabled={!isFormComplete() || isSubmitting}
          className="w-full py-3 text-lg"
          style={{ backgroundColor: isFormComplete() ? '#003087' : '#ccc' }}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              處理中...
            </>
          ) : (
            <>
              <Send size={20} className="mr-2" />
              送出檢舉
            </>
          )}
        </Button>
        
        {!isFormComplete() && (
          <p className="text-sm text-center text-red-500">
            請完成所有必填欄位後才能送出檢舉
          </p>
        )}
      </div>

      {/* 注意事項 */}
      <div className="p-4 bg-yellow-50 rounded-md border border-yellow-200">
        <h4 className="font-medium text-yellow-800 mb-2">重要提醒</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• 送出後將無法修改，請確認資料正確性</li>
          <li>• 系統將發送檢舉收據至您的Email</li>
          <li>• 警方會在3個工作天內開始調查</li>
          <li>• 如有疑問請撥打165反詐騙專線</li>
        </ul>
      </div>
    </div>
  );
}