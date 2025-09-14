import { Header } from '../Header';
import { Breadcrumb } from '../Breadcrumb';
import { useNavigation } from '../../contexts/NavigationContext';

interface QueryPageProps {
  onMenuClick: () => void;
}

export function QueryPage({ onMenuClick }: QueryPageProps) {
  const { navigateTo } = useNavigation();

  const queryServices = [
    {
      id: 'case-inquiry',
      title: '受理案件查詢',
      path: '/query/case-inquiry'
    },
    {
      id: 'missing-person',
      title: '失蹤人口查詢',
      path: '/query/missing-person'
    },
    {
      id: 'wanted-platform',
      title: '通緝犯查詢平臺',
      path: '/query/wanted-platform'
    },
    {
      id: 'stolen-vehicle',
      title: '失竊車輛查詢',
      path: '/query/stolen-vehicle'
    },
    {
      id: 'radio-search',
      title: '警廣協尋失車',
      path: '/query/radio-search'
    },
    {
      id: 'lost-found',
      title: '拾得遺失物',
      path: '/query/lost-found'
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
            查詢服務
          </h2>

          {/* 服務卡片列表 */}
          <div className="space-y-3">
            {queryServices.map((service) => (
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