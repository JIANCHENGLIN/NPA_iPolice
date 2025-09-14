import { ArrowLeft } from 'lucide-react';

interface FraudSystemHeaderProps {
  onBack: () => void;
}

export function FraudSystemHeader({ onBack }: FraudSystemHeaderProps) {
  return (
    <div className="w-[393px] h-[60px] bg-white flex items-center px-5 shadow-sm">
      {/* 返回按鈕 */}
      <button 
        onClick={onBack}
        className="w-6 h-6 flex items-center justify-center mr-4"
      >
        <ArrowLeft size={24} color="#003087" strokeWidth={2} />
      </button>
      
      {/* 標題 */}
      <div className="flex-1">
        <span className="text-[17px] font-semibold" style={{ color: '#003087' }}>
          打詐防騙檢舉系統
        </span>
      </div>
    </div>
  );
}