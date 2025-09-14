import { Header } from '../Header';
import { Breadcrumb } from '../Breadcrumb';
import { useNavigation } from '../../contexts/NavigationContext';

interface TrafficPageProps {
  onMenuClick: () => void;
}

export function TrafficPage({ onMenuClick }: TrafficPageProps) {
  const { navigateTo } = useNavigation();

  const trafficServices = [
    {
      id: 'road-inquiry',
      title: '查詢路況',
      path: '/traffic/road-inquiry'
    },
    {
      id: 'road-report',
      title: '通報路況',
      path: '/traffic/road-report'
    },
    {
      id: 'speed-camera',
      title: '測速點查詢',
      path: '/traffic/speed-camera'
    },
    {
      id: 'car-damage',
      title: '車損事故處理',
      path: '/traffic/car-damage'
    },
    {
      id: 'accident-application',
      title: '交通事故資料申請',
      path: '/traffic/accident-application'
    },
    {
      id: 'towing-inquiry',
      title: '違規拖吊查詢',
      path: '/traffic/towing-inquiry'
    },
    {
      id: 'call-taxi',
      title: '呼叫計程車',
      path: '/traffic/call-taxi'
    }
  ];

  const handleServiceClick = (path: string) => {
    navigateTo(path);
  };

  return (
    <div className="w-[393px] h-[852px] mx-auto bg-white overflow-hidden relative flex flex-col">
      {/* 狀態列區域 */}
      <div className="w-full h-[59px] bg-white"></div>
      
      {/* Header */}
      <Header onMenuClick={onMenuClick} />
      
      {/* 麵包屑導航 */}
      <Breadcrumb />
      
      {/* 主要內容區域 */}
      <div className="flex-1 overflow-y-auto" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="p-4 space-y-4">
          {/* 標題 */}
          <h2 className="text-xl font-semibold text-center mb-4" style={{ color: '#003087' }}>
            交通服務
          </h2>

          {/* 服務卡片列表 */}
          <div className="space-y-3">
            {trafficServices.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceClick(service.path)}
                className="w-full bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 text-left">
                    {service.title}
                  </span>
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg 
                      width="12" 
                      height="12" 
                      viewBox="0 0 12 12" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-400"
                    >
                      <path 
                        d="M4.5 2.25L8.25 6L4.5 9.75" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}