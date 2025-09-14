import { Menu, Settings, ArrowLeft } from 'lucide-react';
import { useNavigation } from '../contexts/NavigationContext';

interface HeaderProps {
  onMenuClick: () => void;
  onSettingsClick?: () => void;
}

export function Header({ onMenuClick, onSettingsClick }: HeaderProps) {
  const { getCurrentRouteConfig, goBack, canGoBack } = useNavigation();
  
  const routeConfig = getCurrentRouteConfig();
  const headerType = routeConfig?.headerType || 'home';

  const handleBackClick = () => {
    if (canGoBack()) {
      goBack();
    }
  };

  const handleSettingsClick = () => {
    if (onSettingsClick) {
      onSettingsClick();
    } else {
      // 預設設定功能
      console.log('Settings clicked');
    }
  };

  return (
    <div className="w-[393px] h-[60px] bg-white flex items-center justify-between px-5 shadow-sm">
      {/* 左側按鈕 */}
      {headerType === 'home' ? (
        <button 
          className="w-6 h-6 flex items-center justify-center"
          onClick={onMenuClick}
        >
          <Menu size={24} color="#003087" strokeWidth={2} />
        </button>
      ) : (
        <button 
          className="w-6 h-6 flex items-center justify-center"
          onClick={handleBackClick}
          disabled={!canGoBack()}
        >
          <ArrowLeft size={24} color="#003087" strokeWidth={2} />
        </button>
      )}
      
      {/* 中央：Logo文字 */}
      <div className="flex-1 flex justify-center">
        <span className="text-[17px] font-semibold" style={{ color: '#003087' }}>
          中華民國內政部警政署
        </span>
      </div>
      
      {/* 右側按鈕 */}
      {headerType === 'home' ? (
        <button 
          className="w-6 h-6 flex items-center justify-center"
          onClick={handleSettingsClick}
        >
          <Settings size={24} color="#003087" strokeWidth={2} />
        </button>
      ) : (
        <button 
          className="w-6 h-6 flex items-center justify-center"
          onClick={onMenuClick}
        >
          <Menu size={24} color="#003087" strokeWidth={2} />
        </button>
      )}
    </div>
  );
}