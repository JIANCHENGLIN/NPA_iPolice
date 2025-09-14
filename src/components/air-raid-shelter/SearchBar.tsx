import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Search, X } from 'lucide-react';
import { useAirRaidShelter } from '../../contexts/AirRaidShelterContext';

export function SearchBar() {
  const { state, searchShelters, clearSearch } = useAirRaidShelter();
  const [localQuery, setLocalQuery] = useState('');

  const handleSearch = () => {
    searchShelters(localQuery);
  };

  const handleClear = () => {
    setLocalQuery('');
    clearSearch();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="p-4 space-y-3" style={{ backgroundColor: '#F8F9FA' }}>
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="搜尋其他區域的避難場所"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 bg-white"
          />
          {localQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              onClick={handleClear}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
        <Button 
          onClick={handleSearch}
          style={{ backgroundColor: '#003087' }}
          className="text-white hover:opacity-90"
        >
          搜尋
        </Button>
      </div>

      {/* 搜尋結果 */}
      {state.searchResults.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 max-h-60 overflow-y-auto">
          {state.searchResults.map((shelter) => (
            <button
              key={shelter.id}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
              onClick={() => {
                // 這裡可以觸發選擇避難場所的邏輯
                setLocalQuery(shelter.name);
                clearSearch();
              }}
            >
              <div className="font-medium">{shelter.name}</div>
              <div className="text-sm text-gray-600">{shelter.address}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}