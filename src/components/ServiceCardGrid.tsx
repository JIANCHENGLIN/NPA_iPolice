import { useNavigation } from '../contexts/NavigationContext';
import { ServiceCard } from '../types/navigation';

interface ServiceCardGridProps {
  services: ServiceCard[];
  title: string;
}

export function ServiceCardGrid({ services, title }: ServiceCardGridProps) {
  const { navigateTo } = useNavigation();

  const handleServiceClick = (service: ServiceCard) => {
    if (service.type === 'phone' && service.phone) {
      // 顯示撥號確認對話框
      const confirmed = window.confirm(`確定要撥打 ${service.phone} 嗎？`);
      if (confirmed) {
        window.location.href = `tel:${service.phone}`;
      }
    } else if (service.path) {
      navigateTo(service.path);
    }
  };

  return (
    <div className="p-5 space-y-5" style={{ backgroundColor: '#F8F9FA' }}>
      <h1 className="text-2xl font-semibold" style={{ color: '#1C1C1E' }}>
        {title}
      </h1>
      
      <div className="space-y-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => handleServiceClick(service)}
            className="w-full bg-white rounded-[12px] p-5 shadow-sm flex flex-col items-start text-left transform active:scale-95 transition-transform duration-200"
          >
            <div className="flex items-center justify-between w-full mb-2">
              <h3 className="text-[18px] font-semibold" style={{ color: '#1C1C1E' }}>
                {service.label}
              </h3>
              {service.type === 'phone' && (
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
              )}
            </div>
            {service.description && (
              <p className="text-[14px] text-gray-600 leading-relaxed">
                {service.description}
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}