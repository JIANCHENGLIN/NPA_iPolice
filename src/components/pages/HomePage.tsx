import { Header } from '../Header';
import { MessageCarousel } from '../MessageCarousel';
import { EmergencyServices } from '../EmergencyServices';
import { MainServices } from '../MainServices';
import { useNavigation } from '../../contexts/NavigationContext';

interface HomePageProps {
  onMenuClick: () => void;
}

export function HomePage({ onMenuClick }: HomePageProps) {
  const { navigateTo } = useNavigation();

  const handleServiceClick = (serviceId: string) => {
    switch (serviceId) {
      case 'emergency':
        navigateTo('/emergency');
        break;
      case 'fraud':
        navigateTo('/anti-fraud');
        break;
      case 'traffic':
        navigateTo('/traffic');
        break;
      case 'query':
        navigateTo('/query');
        break;
      case 'apply':
        navigateTo('/application');
        break;
      case 'info':
        navigateTo('/information');
        break;
      default:
        console.log(`${serviceId} service clicked`);
    }
  };

  return (
    <div className="w-[393px] h-[852px] mx-auto bg-white overflow-hidden relative">
      {/* 狀態列區域 (H: 59pt) */}
      <div className="w-full h-[59px] bg-white"></div>
      
      {/* Header區域 (H: 60pt) */}
      <Header onMenuClick={onMenuClick} />
      
      {/* 推播訊息輪播區域 (H: 160pt) */}
      <MessageCarousel />
      
      {/* 緊急服務區域 (H: 176pt) */}
      <EmergencyServices />
      
      {/* 主要功能區域 (H: 200pt) */}
      <MainServices onServiceClick={handleServiceClick} />
      
      {/* 底部區域填充 */}
      <div className="flex-1" style={{ backgroundColor: '#F8F9FA' }}></div>
    </div>
  );
}