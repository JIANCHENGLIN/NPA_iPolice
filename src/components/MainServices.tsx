import { Shield, Signpost, Search, FileText, Radio } from 'lucide-react';

const services = [
  { id: 'fraud', name: '打詐防騙', icon: Shield, size: 'large' },
  { id: 'traffic', name: '交通服務', icon: Signpost, size: 'large' },
  { id: 'query', name: '查詢服務', icon: Search, size: 'small' },
  { id: 'apply', name: '申請服務', icon: FileText, size: 'small' },
  { id: 'info', name: '資訊服務', icon: Radio, size: 'medium' }
];

export function MainServices({ onServiceClick }: { onServiceClick: (serviceId: string) => void }) {
  const renderServiceCard = (service: typeof services[0], width: string) => {
    const IconComponent = service.icon;
    
    return (
      <button
        key={service.id}
        className={`${width} h-[92px] bg-white rounded-[12px] shadow-sm flex flex-col items-center justify-center transform active:scale-95 transition-transform duration-200`}
        onClick={() => onServiceClick(service.id)}
      >
        <IconComponent
          size={32}
          color="#003087"
          strokeWidth={2}
          className="mb-2"
        />
        <span className="text-[16px] font-semibold" style={{ color: '#1C1C1E' }}>
          {service.name}
        </span>
      </button>
    );
  };

  return (
    <div className="w-[393px] h-[200px] px-5 py-4" style={{ backgroundColor: '#F8F9FA' }}>
      {/* 第一排 - 2個大卡片 */}
      <div className="flex justify-between mb-4">
        {renderServiceCard(services[0], 'w-[171.5px]')}
        {renderServiceCard(services[1], 'w-[171.5px]')}
      </div>
      
      {/* 第二排 - 3個小卡片 */}
      <div className="flex justify-between">
        {renderServiceCard(services[2], 'w-[109px]')}
        {renderServiceCard(services[3], 'w-[109px]')}
        {renderServiceCard(services[4], 'w-[119px]')}
      </div>
    </div>
  );
}