import { Header } from '../Header';
import { Breadcrumb } from '../Breadcrumb';
import { FraudSystem } from '../fraud-system/FraudSystem';

interface FraudReportPageProps {
  onMenuClick: () => void;
}

export function FraudReportPage({ onMenuClick }: FraudReportPageProps) {
  return (
    <div className="w-[393px] h-[852px] mx-auto bg-white overflow-hidden relative flex flex-col">
      {/* 狀態列區域 */}
      <div className="w-full h-[59px] bg-white"></div>
      
      {/* Header */}
      <Header onMenuClick={onMenuClick} />
      
      {/* 麵包屑導航 */}
      <Breadcrumb />
      
      {/* 165檢舉/報案表單 */}
      <div className="flex-1 overflow-hidden">
        <FraudSystem />
      </div>
    </div>
  );
}