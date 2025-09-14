import { useState } from 'react';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './components/pages/HomePage';
import { EmergencyPage } from './components/pages/EmergencyPage';
import { AntiFraudPage } from './components/pages/AntiFraudPage';
import { TrafficPage } from './components/pages/TrafficPage';
import { QueryPage } from './components/pages/QueryPage';
import { ApplicationPage } from './components/pages/ApplicationPage';
import { InformationPage } from './components/pages/InformationPage';
import { FraudReportPage } from './components/pages/FraudReportPage';
import { AirRaidShelterPage } from './components/pages/AirRaidShelterPage';
import { PlaceholderPage } from './components/pages/PlaceholderPage';
import { Toaster } from './components/ui/sonner';

function AppContent() {
  const { state } = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const renderCurrentPage = () => {
    switch (state.currentPath) {
      case '/':
        return <HomePage onMenuClick={handleMenuClick} />;
      case '/emergency':
        return <EmergencyPage onMenuClick={handleMenuClick} />;
      case '/anti-fraud':
        return <AntiFraudPage onMenuClick={handleMenuClick} />;
      case '/anti-fraud/report-165':
        return <FraudReportPage onMenuClick={handleMenuClick} />;
      case '/traffic':
        return <TrafficPage onMenuClick={handleMenuClick} />;
      case '/query':
        return <QueryPage onMenuClick={handleMenuClick} />;
      case '/application':
        return <ApplicationPage onMenuClick={handleMenuClick} />;
      case '/information':
        return <InformationPage onMenuClick={handleMenuClick} />;
      
      // 交通服務子頁面路由
      case '/traffic/road-inquiry':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="查詢路況" description="查詢路況功能正在開發中，敬請期待。" />;
      case '/traffic/road-report':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="通報路況" description="通報路況功能正在開發中，敬請期待。" />;
      case '/traffic/speed-camera':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="測速點查詢" description="測速點查詢功能正在開發中，敬請期待。" />;
      case '/traffic/car-damage':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="車損事故處理" description="車損事故處理功能正在開發中，敬請期待。" />;
      case '/traffic/accident-application':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="交通事故資料申請" description="交通事故資料申請功能正在開發中，敬請期待。" />;
      case '/traffic/towing-inquiry':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="違規拖吊查詢" description="違規拖吊查詢功能正在開發中，敬請期待。" />;
      case '/traffic/call-taxi':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="呼叫計程車" description="呼叫計程車功能正在開發中，敬請期待。" />;
      
      // 打詐防騙子頁面路由
      case '/anti-fraud/suspicious-analysis':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="可疑訊息分析" description="可疑訊息分析功能正在開發中，敬請期待。" />;
      case '/anti-fraud/dashboard':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="打詐儀錶板" description="打詐儀錶板功能正在開發中，敬請期待。" />;
      case '/anti-fraud/prevention/news':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="新聞快訊" description="新聞快訊功能正在開發中，敬請期待。" />;
      case '/anti-fraud/prevention/qa':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="反詐騙QA" description="反詐騙QA功能正在開發中，敬請期待。" />;
      case '/anti-fraud/prevention/high-risk-companies':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="高風險業者" description="高風險業者功能正在開發中，敬請期待。" />;
      case '/anti-fraud/prevention/fake-investment':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="假投資網站" description="假投資網站功能正在開發中，敬請期待。" />;
      
      // 查詢服務子頁面路由
      case '/query/case-inquiry':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="受理案件查詢" description="受理案件查詢功能正在開發中，敬請期待。" />;
      case '/query/missing-person':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="失蹤人口查詢" description="失蹤人口查詢功能正在開發中，敬請期待。" />;
      case '/query/wanted-platform':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="通緝犯查詢平臺" description="通緝犯查詢平臺功能正在開發中，敬請期待。" />;
      case '/query/stolen-vehicle':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="失竊車輛查詢" description="失竊車輛查詢功能正在開發中，敬請期待。" />;
      case '/query/radio-search':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="警廣協尋失車" description="警廣協尋失車功能正在開發中，敬請期待。" />;
      case '/query/lost-found':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="拾得遺失物" description="拾得遺失物功能正在開發中，敬請期待。" />;
      
      // 申請服務子頁面路由
      case '/application/police-record':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="警察刑事紀錄證明書" description="警察刑事紀錄證明書功能正在開發中，敬請期待。" />;
      case '/application/mountain-permit':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="入山申請" description="入山申請功能正在開發中，敬請期待。" />;
      case '/application/missing-person-radio':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="警廣協尋失蹤人口" description="警廣協尋失蹤人口功能正在開發中，敬請期待。" />;
      
      // 資訊服務子頁面路由
      case '/information/push-notification':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="推播訊息" description="推播訊息功能正在開發中，敬請期待。" />;
      case '/information/police-radio':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="收��警廣" description="收聽警廣功能正在開發中，敬請期待。" />;
      case '/information/dispute-clarification':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="警政爭議訊息澄清" description="警政爭議訊息澄清功能正在開發中，敬請期待。" />;
      case '/information/flight-safety':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="出境飛安須知" description="出境飛安須知功能正在開發中，敬請期待。" />;
      case '/information/administrative-info':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="法規與行政資訊" description="法規與行政資訊功能正在開發中，敬請期待。" />;
      case '/information/police-regulations':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="警察法規" description="警察法規功能正在開發中，敬請期待。" />;
      case '/information/drunk-driving-law':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="酒駕法令" description="酒駕法令功能正在開發中，敬請期待。" />;
      case '/information/police-medical':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="警察醫療方案" description="警察醫療方案功能正在開發中，敬請期待。" />;
      case '/information/law-enforcement':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="執法機關" description="執法機關功能正在開發中，敬請期待。" />;
      case '/information/npa-director-fb':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="NPA署長室FB" description="NPA署長室FB功能正在開發中，敬請期待。" />;
      
      // 緊急服務子頁面路由
      case '/emergency/air-raid':
        return <AirRaidShelterPage onMenuClick={handleMenuClick} />;
      case '/emergency/travel-safety':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="守護出行" description="守護出行功能正在開發中，敬請期待。" />;
      
      // 使用攻略子頁面路由
      case '/user-guide/privacy-policy':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="隱私權政策" description="隱私權政策功能正在開發中，敬請期待。" />;
      case '/user-guide/push-settings':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="推播設定" description="推播設定功能正在開發中，敬請期待。" />;
      case '/user-guide/user-authentication':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="使用者認證" description="使用者認證功能正在開發中，敬請期待。" />;
      case '/user-guide/operation-guide':
        return <PlaceholderPage onMenuClick={handleMenuClick} title="操作指南" description="操作指南功能正在開發中，敬請期待。" />;
      
      default:
        // 對於未定義的路徑，顯示開發中頁面
        return (
          <div className="w-[393px] h-[852px] mx-auto bg-white overflow-hidden relative flex flex-col">
            <div className="w-full h-[59px] bg-white"></div>
            <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: '#F8F9FA' }}>
              <div className="text-center p-8">
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#1C1C1E' }}>
                  功能開發中
                </h2>
                <p className="text-gray-600 mb-4">
                  此功能正在開發中，敬請期待。
                </p>
                <p className="text-sm text-gray-500">
                  路徑：{state.currentPath}
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {renderCurrentPage()}
      <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
      <Toaster />
    </>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}