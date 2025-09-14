import { Shield, Car } from 'lucide-react';
import { useNavigation } from '../contexts/NavigationContext';

export function EmergencyServices() {
  const { navigateTo } = useNavigation();
  
  const emergencyButtons = [
    { number: '110', label: '報案專線', phone: '110' },
    { number: '113', label: '婦幼保護', phone: '113' },
    { number: '165', label: '防詐專線', phone: '165' }
  ];

  const secondaryButtons = [
    { text: '防空避難', icon: Shield, action: () => navigateTo('/emergency/air-raid') },
    { text: '守護出行', icon: Car, action: () => navigateTo('/emergency/travel-safety') }
  ];

  const handleEmergencyClick = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="w-[393px] h-[176px] px-5 py-4" style={{ backgroundColor: '#F8F9FA' }}>
      {/* 第一層 - 緊急電話按鈕 */}
      <div className="flex justify-between mb-4">
        {emergencyButtons.map((button, index) => (
          <button
            key={index}
            onClick={() => handleEmergencyClick(button.phone)}
            className="w-[111px] h-[72px] rounded-[12px] flex flex-col items-center justify-center shadow-md transform active:scale-95 transition-transform duration-150"
            style={{
              background: 'linear-gradient(135deg, #FF4444 0%, #CC0000 100%)'
            }}
          >
            <span className="text-[24px] font-bold text-white">
              {button.number}
            </span>
          </button>
        ))}
      </div>
      
      {/* 第二層 - 功能按鈕 */}
      <div className="flex justify-between">
        {secondaryButtons.map((button, index) => {
          const IconComponent = button.icon;
          return (
            <button
              key={index}
              onClick={button.action}
              className="w-[171.5px] h-[72px] rounded-[12px] flex items-center justify-center shadow-md transform active:scale-95 transition-transform duration-150"
              style={{ backgroundColor: '#1565C0' }}
            >
              <div className="flex items-center">
                <IconComponent size={24} color="white" strokeWidth={2} className="mr-2" />
                <span className="text-[17px] font-semibold text-white">
                  {button.text}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}