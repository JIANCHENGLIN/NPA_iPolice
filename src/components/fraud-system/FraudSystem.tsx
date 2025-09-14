import { useEffect } from 'react';
import { FraudFormProvider, useFraudForm } from './FraudFormContext';
import { ProgressIndicator } from './ProgressIndicator';
import { NavigationButtons } from './NavigationButtons';
import { CaseSummaryPage } from './pages/CaseSummaryPage';
import { FraudDataPage } from './pages/FraudDataPage';
import { FileUploadPage } from './pages/FileUploadPage';
import { CaseDescriptionPage } from './pages/CaseDescriptionPage';
import { PersonalInfoPage } from './pages/PersonalInfoPage';
import { AddressPage } from './pages/AddressPage';
import { VerificationPage } from './pages/VerificationPage';

function FraudSystemContent() {
  const { currentPage, loadDraft } = useFraudForm();

  // 載入草稿
  useEffect(() => {
    loadDraft();
  }, []);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 1:
        return <CaseSummaryPage />;
      case 2:
        return <FraudDataPage />;
      case 3:
        return <FileUploadPage />;
      case 4:
        return <CaseDescriptionPage />;
      case 5:
        return <PersonalInfoPage />;
      case 6:
        return <AddressPage />;
      case 7:
        return <VerificationPage />;
      default:
        return <CaseSummaryPage />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* 進度指示器 */}
      <ProgressIndicator />
      
      {/* 主要內容區域 */}
      <div className="flex-1 overflow-y-auto scrollbar-hide" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="bg-white min-h-full">
          {renderCurrentPage()}
        </div>
      </div>
      
      {/* 導航按鈕 */}
      <NavigationButtons />
    </div>
  );
}

export function FraudSystem() {
  return (
    <FraudFormProvider>
      <FraudSystemContent />
    </FraudFormProvider>
  );
}