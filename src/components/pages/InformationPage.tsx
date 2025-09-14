import { Header } from '../Header';
import { Breadcrumb } from '../Breadcrumb';
import { useNavigation } from '../../contexts/NavigationContext';

interface InformationPageProps {
  onMenuClick: () => void;
}

export function InformationPage({ onMenuClick }: InformationPageProps) {
  const { navigateTo } = useNavigation();

  const informationServices = [
    {
      id: 'push-notification',
      title: '推播訊息',
      path: '/information/push-notification'
    },
    {
      id: 'police-radio',
      title: '收聽警廣',
      path: '/information/police-radio'
    },
    {
      id: 'dispute-clarification',
      title: '警政爭議訊息澄清',
      path: '/information/dispute-clarification'
    },
    {
      id: 'flight-safety',
      title: '出境飛安須知',
      path: '/information/flight-safety'
    },
    {
      id: 'administrative-info',
      title: '法規與行政資訊',
      path: '/information/administrative-info'
    },
    {
      id: 'police-regulations',
      title: '警察法規',
      path: '/information/police-regulations'
    },
    {
      id: 'drunk-driving-law',
      title: '酒駕法令',
      path: '/information/drunk-driving-law'
    },
    {
      id: 'police-medical',
      title: '警察醫療方案',
      path: '/information/police-medical'
    },
    {
      id: 'law-enforcement',
      title: '執法機關',
      path: '/information/law-enforcement'
    },
    {
      id: 'npa-director-fb',
      title: 'NPA署長室FB',
      path: '/information/npa-director-fb'
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
            資訊服務
          </h2>

          {/* 服務卡片列表 */}
          <div className="space-y-3">
            {informationServices.map((service) => (
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