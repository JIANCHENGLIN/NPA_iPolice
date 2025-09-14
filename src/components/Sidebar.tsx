import { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import { sidebarMenuItems } from '../data/menuItems';
import { MenuItem } from '../types/navigation';
import { ChevronDown, ChevronRight, Phone, X } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItemComponentProps {
  item: MenuItem;
  level: number;
  expandedItems: Set<string>;
  onToggle: (id: string) => void;
  onItemClick: (item: MenuItem) => void;
}

function MenuItemComponent({ item, level, expandedItems, onToggle, onItemClick }: MenuItemComponentProps) {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedItems.has(item.id);
  const paddingLeft = level * 16 + 16;

  const handleClick = () => {
    if (hasChildren) {
      onToggle(item.id);
    } else {
      onItemClick(item);
    }
  };

  // 根據層級設定不同的樣式
  const getItemStyle = () => {
    switch (level) {
      case 0: // 父層
        return 'font-semibold text-gray-900 py-3 border-b border-gray-100';
      case 1: // 子層
        return 'font-medium text-gray-800 py-2.5 bg-gray-25';
      case 2: // 底層功能
        return 'text-gray-700 py-2 bg-gray-50';
      default:
        return 'text-gray-700 py-2';
    }
  };

  const getBackgroundStyle = () => {
    if (level === 0) return 'hover:bg-blue-50';
    if (level === 1) return 'hover:bg-gray-100';
    return 'hover:bg-gray-100';
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`w-full text-left px-4 flex items-center justify-between transition-colors ${getItemStyle()} ${getBackgroundStyle()} ${
          level > 0 ? 'border-l-2 border-gray-200' : ''
        }`}
        style={{ paddingLeft: `${paddingLeft}px` }}
      >
        <div className="flex items-center">
          {item.type === 'phone' && (
            <Phone size={16} className="mr-2 text-green-600" />
          )}
          <span className={level === 0 ? 'text-sm' : level === 1 ? 'text-sm' : 'text-sm'}>
            {item.label}
          </span>
        </div>
        
        {hasChildren && (
          <div className="ml-2">
            {isExpanded ? (
              <ChevronDown size={16} className="text-gray-400" />
            ) : (
              <ChevronRight size={16} className="text-gray-400" />
            )}
          </div>
        )}
      </button>

      {hasChildren && isExpanded && (
        <div>
          {item.children!.map((child) => (
            <MenuItemComponent
              key={child.id}
              item={child}
              level={level + 1}
              expandedItems={expandedItems}
              onToggle={onToggle}
              onItemClick={onItemClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { navigateFromSidebar } = useNavigation();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState('');

  const handleToggle = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
      // 也收合所有子項目
      const collapseChildren = (items: MenuItem[]) => {
        items.forEach(item => {
          newExpanded.delete(item.id);
          if (item.children) {
            collapseChildren(item.children);
          }
        });
      };
      const parentItem = findMenuItem(sidebarMenuItems, id);
      if (parentItem?.children) {
        collapseChildren(parentItem.children);
      }
    } else {
      // 收合其他主分類（手風琴效果）
      if (sidebarMenuItems.some(item => item.id === id)) {
        sidebarMenuItems.forEach(item => {
          if (item.id !== id) {
            newExpanded.delete(item.id);
            if (item.children) {
              const collapseChildren = (items: MenuItem[]) => {
                items.forEach(child => {
                  newExpanded.delete(child.id);
                  if (child.children) {
                    collapseChildren(child.children);
                  }
                });
              };
              collapseChildren(item.children);
            }
          }
        });
      }
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.type === 'phone' && item.phone) {
      setSelectedPhone(item.phone);
      setDialogOpen(true);
    } else if (item.type === 'external' && item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
      onClose();
    } else if (item.path) {
      navigateFromSidebar(item.path);
      onClose();
    }
  };

  const handleConfirmCall = () => {
    window.location.href = `tel:${selectedPhone}`;
    setDialogOpen(false);
  };

  const findMenuItem = (items: MenuItem[], id: string): MenuItem | null => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findMenuItem(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 遮罩 */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* 側邊欄 */}
      <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300">
        {/* 側邊欄標題 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold" style={{ color: '#003087' }}>
            服務選單
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-1"
          >
            <X size={20} />
          </Button>
        </div>

        {/* 選單內容 */}
        <ScrollArea className="h-[calc(100%-73px)]">
          <div className="py-2">
            {sidebarMenuItems.map((item) => (
              <MenuItemComponent
                key={item.id}
                item={item}
                level={0}
                expandedItems={expandedItems}
                onToggle={handleToggle}
                onItemClick={handleItemClick}
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* 撥號確認對話框 */}
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent className="w-[320px]">
          <AlertDialogHeader>
            <AlertDialogTitle>撥打緊急電話</AlertDialogTitle>
            <AlertDialogDescription>
              請問要撥打 {selectedPhone} 嗎？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmCall}>確定</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}