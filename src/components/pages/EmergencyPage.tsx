import { Header } from '../Header';
import { Breadcrumb } from '../Breadcrumb';
import { Phone, Shield, Heart, AlertTriangle, MapPin, Clock } from 'lucide-react';

interface EmergencyPageProps {
  onMenuClick: () => void;
}

export function EmergencyPage({ onMenuClick }: EmergencyPageProps) {
  const emergencyNumbers = [
    {
      number: '110',
      title: '報案專線',
      description: '遇到犯罪案件立即撥打',
      icon: <Shield size={32} color="#003087" />,
      color: 'bg-red-500',
      available: '24小時'
    },
    {
      number: '119',
      title: '消防救護',
      description: '火災、救護、救助服務',
      icon: <Heart size={32} color="#003087" />,
      color: 'bg-orange-500',
      available: '24小時'
    },
    {
      number: '113',
      title: '婦幼保護專線',
      description: '家暴、性侵、兒少保護',
      icon: <Shield size={32} color="#003087" />,
      color: 'bg-purple-500',
      available: '24小時'
    },
    {
      number: '165',
      title: '反詐騙專線',
      description: '詐騙案件諮詢與通報',
      icon: <AlertTriangle size={32} color="#003087" />,
      color: 'bg-yellow-500',
      available: '24小時'
    }
  ];

  const recentEmergencies = [
    {
      type: '交通事故',
      location: '台北市中山北路與南京東路口',
      time: '13:45',
      status: '處理中',
      units: '中山分局、救護車'
    },
    {
      type: '火災警報',
      location: '新北市板橋區文化路',
      time: '12:30',
      status: '已處理',
      units: '板橋消防隊'
    },
    {
      type: '竊盜案件',
      location: '台北市信義區市府路',
      time: '11:15',
      status: '調查中',
      units: '信義分局'
    }
  ];

  const emergencyTips = [
    {
      title: '保持冷靜',
      description: '遇到緊急狀況時請保持冷靜，清楚說明狀況'
    },
    {
      title: '明確位置',
      description: '提供準確的地址或明顯地標，便於救援人員找到'
    },
    {
      title: '詳細描述',
      description: '簡潔明瞭地描述事件狀況，回答接線員問題'
    },
    {
      title: '不要掛斷',
      description: '在接線員指示前不要掛斷電話，等待進一步指導'
    }
  ];

  const handleEmergencyCall = (number: string) => {
    // 模擬撥打電話功能
    alert(`正在撥打 ${number}...`);
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
            緊急服務
          </h2>

          {/* 緊急電話 */}
          <div className="space-y-3">
            {emergencyNumbers.map((emergency) => (
              <div key={emergency.number} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 ${emergency.color} rounded-full flex items-center justify-center`}>
                    <span className="text-2xl font-bold text-white">{emergency.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{emergency.title}</h3>
                    <p className="text-sm text-gray-600 mb-1">{emergency.description}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock size={12} className="mr-1" />
                      {emergency.available}
                    </div>
                  </div>
                  <button 
                    onClick={() => handleEmergencyCall(emergency.number)}
                    className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600"
                  >
                    <Phone size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 即時狀況 */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <h3 className="font-medium text-gray-900 mb-3">即時案件狀況</h3>
            <div className="space-y-3">
              {recentEmergencies.map((emergency, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-3 py-2 bg-gray-50 rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-sm text-gray-900">{emergency.type}</h4>
                      <div className="flex items-center text-xs text-gray-600 mt-1">
                        <MapPin size={12} className="mr-1" />
                        {emergency.location}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">派遣單位：{emergency.units}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{emergency.time}</p>
                      <span className={`text-xs px-2 py-1 rounded ${
                        emergency.status === '已處理' ? 'bg-green-100 text-green-800' :
                        emergency.status === '處理中' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {emergency.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 報案須知 */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <h3 className="font-medium text-gray-900 mb-3">報案須知</h3>
            <div className="space-y-3">
              {emergencyTips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-900">{tip.title}</h4>
                    <p className="text-xs text-gray-600">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 我的位置 */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-medium text-blue-900 mb-2">我的位置資訊</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <div className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span>台北市中山區南京東路二段123號</span>
              </div>
              <div className="text-xs text-blue-700">
                定位精確度：±5公尺 | 最後更新：14:20
              </div>
              <button className="w-full mt-2 py-2 bg-blue-600 text-white rounded text-sm">
                更新位置
              </button>
            </div>
          </div>

          {/* 重要提醒 */}
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <h3 className="font-medium text-red-900 mb-2">重要提醒</h3>
            <ul className="text-xs text-red-800 space-y-1">
              <li>• 僅在真正緊急情況下撥打緊急電話</li>
              <li>• 惡意報案將依法追究刑事責任</li>
              <li>• 非緊急事件請撥打各單位一般電話</li>
              <li>• 緊急電話免付費，手機無信號也可撥打110、119</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}