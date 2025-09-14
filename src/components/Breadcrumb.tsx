import { useNavigation } from '../contexts/NavigationContext';
import { ChevronRight } from 'lucide-react';

export function Breadcrumb() {
  const { state, navigateTo } = useNavigation();

  if (state.breadcrumbs.length === 0) {
    return null;
  }

  return (
    <div className="w-[393px] bg-white px-5 py-2 border-b border-gray-100">
      <div className="flex items-center space-x-2 text-sm">
        {state.breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight size={14} className="text-gray-400 mx-1" />
            )}
            {crumb.path ? (
              <button
                onClick={() => navigateTo(crumb.path!)}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                {crumb.label}
              </button>
            ) : (
              <span className="text-gray-600">{crumb.label}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}