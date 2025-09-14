import { Header } from '../Header';
import { Breadcrumb } from '../Breadcrumb';
import { useNavigation } from '../../contexts/NavigationContext';

interface PlaceholderPageProps {
  onMenuClick: () => void;
  title: string;
  description?: string;
}

export function PlaceholderPage({ onMenuClick, title, description }: PlaceholderPageProps) {
  const { state } = useNavigation();

  return (
    <div className="w-[393px] h-[852px] mx-auto bg-white overflow-hidden relative flex flex-col">
      {/* 狀態列區域 */}
      <div className="w-full h-[59px] bg-white"></div>
      
      {/* Header */}
      <Header onMenuClick={onMenuClick} />
      
      {/* 麵包屑導航 */}
      <Breadcrumb />
      
      {/* 主要內容區域 */}
      <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white text-sm font-bold">!</span>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#1C1C1E' }}>
            {title}
          </h2>
          
          <p className="text-gray-600 mb-4">
            {description || '此功能正在開發中，敬請期待。'}
          </p>
          
          <div className="p-3 bg-gray-100 rounded-md text-left">
            <p className="text-sm text-gray-500">
              <strong>開發資訊：</strong><br />
              路徑：{state.currentPath}<br />
              狀態：開發中
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}