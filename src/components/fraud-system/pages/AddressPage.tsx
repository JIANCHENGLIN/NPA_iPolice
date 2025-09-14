import { useState, useEffect } from 'react';
import { useFraudForm } from '../FraudFormContext';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Checkbox } from '../../ui/checkbox';
import { taiwanRegionsData } from '../../../data/taiwanRegions';

export function AddressPage() {
  const { state, dispatch } = useFraudForm();
  
  // 現居地址的選項
  const [currentDistricts, setCurrentDistricts] = useState<any[]>([]);
  const [currentVillages, setCurrentVillages] = useState<string[]>([]);
  
  // 戶籍地址的選項
  const [registeredDistricts, setRegisteredDistricts] = useState<any[]>([]);
  const [registeredVillages, setRegisteredVillages] = useState<string[]>([]);

  // 更新現居地址的區域選項
  useEffect(() => {
    const selectedRegion = taiwanRegionsData.regions.find(
      region => region.id === state.currentAddress.county
    );
    setCurrentDistricts(selectedRegion?.districts || []);
    
    // 清空區域和村里選擇
    if (!selectedRegion) {
      dispatch({ 
        type: 'SET_FIELD', 
        field: 'currentAddress', 
        value: { ...state.currentAddress, district: '', village: '' }
      });
    }
  }, [state.currentAddress.county]);

  // 更新現居地址的村里選項
  useEffect(() => {
    const selectedDistrict = currentDistricts.find(
      district => district.id === state.currentAddress.district
    );
    setCurrentVillages(selectedDistrict?.villages || []);
    
    // 清空村里選擇
    if (!selectedDistrict) {
      dispatch({ 
        type: 'SET_FIELD', 
        field: 'currentAddress', 
        value: { ...state.currentAddress, village: '' }
      });
    }
  }, [state.currentAddress.district, currentDistricts]);

  // 更新戶籍地址的區域選項
  useEffect(() => {
    if (!state.sameAsCurrentAddress) {
      const selectedRegion = taiwanRegionsData.regions.find(
        region => region.id === state.registeredAddress.county
      );
      setRegisteredDistricts(selectedRegion?.districts || []);
      
      // 清空區域和村里選擇
      if (!selectedRegion) {
        dispatch({ 
          type: 'SET_FIELD', 
          field: 'registeredAddress', 
          value: { ...state.registeredAddress, district: '', village: '' }
        });
      }
    }
  }, [state.registeredAddress.county, state.sameAsCurrentAddress]);

  // 更新戶籍地址的村里選項
  useEffect(() => {
    if (!state.sameAsCurrentAddress) {
      const selectedDistrict = registeredDistricts.find(
        district => district.id === state.registeredAddress.district
      );
      setRegisteredVillages(selectedDistrict?.villages || []);
      
      // 清空村里選擇
      if (!selectedDistrict) {
        dispatch({ 
          type: 'SET_FIELD', 
          field: 'registeredAddress', 
          value: { ...state.registeredAddress, village: '' }
        });
      }
    }
  }, [state.registeredAddress.district, registeredDistricts, state.sameAsCurrentAddress]);

  const handleCurrentAddressChange = (field: string, value: string) => {
    const newAddress = { ...state.currentAddress, [field]: value };
    dispatch({ type: 'SET_FIELD', field: 'currentAddress', value: newAddress });
  };

  const handleRegisteredAddressChange = (field: string, value: string) => {
    const newAddress = { ...state.registeredAddress, [field]: value };
    dispatch({ type: 'SET_FIELD', field: 'registeredAddress', value: newAddress });
  };

  const handleSameAddressChange = (checked: boolean) => {
    dispatch({ type: 'SET_FIELD', field: 'sameAsCurrentAddress', value: checked });
    
    if (checked) {
      // 複製現居地址到戶籍地址
      dispatch({ 
        type: 'SET_FIELD', 
        field: 'registeredAddress', 
        value: { ...state.currentAddress }
      });
    } else {
      // 清空戶籍地址
      dispatch({ 
        type: 'SET_FIELD', 
        field: 'registeredAddress', 
        value: { county: '', district: '', village: '', detail: '' }
      });
    }
  };

  return (
    <div className="p-5 space-y-6">
      <h2 className="text-xl font-semibold" style={{ color: '#1C1C1E' }}>
        地址資訊（選填）
      </h2>

      {/* 現居地址 */}
      <div className="space-y-4">
        <Label className="text-base font-medium">現居地址</Label>
        
        {/* 縣市選擇 */}
        <div className="space-y-2">
          <Label className="text-sm">縣市</Label>
          <Select 
            value={state.currentAddress.county} 
            onValueChange={(value) => handleCurrentAddressChange('county', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="請選擇縣市" />
            </SelectTrigger>
            <SelectContent>
              {taiwanRegionsData.regions.map(region => (
                <SelectItem key={region.id} value={region.id}>
                  {region.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 鄉鎮市區選擇 */}
        <div className="space-y-2">
          <Label className="text-sm">鄉鎮市區</Label>
          <Select 
            value={state.currentAddress.district} 
            onValueChange={(value) => handleCurrentAddressChange('district', value)}
            disabled={!state.currentAddress.county}
          >
            <SelectTrigger>
              <SelectValue placeholder="請選擇鄉鎮市區" />
            </SelectTrigger>
            <SelectContent>
              {currentDistricts.map(district => (
                <SelectItem key={district.id} value={district.id}>
                  {district.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 村里選擇 */}
        <div className="space-y-2">
          <Label className="text-sm">村里</Label>
          <Select 
            value={state.currentAddress.village} 
            onValueChange={(value) => handleCurrentAddressChange('village', value)}
            disabled={!state.currentAddress.district}
          >
            <SelectTrigger>
              <SelectValue placeholder="請選擇村里" />
            </SelectTrigger>
            <SelectContent>
              {currentVillages.map(village => (
                <SelectItem key={village} value={village}>
                  {village}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 詳細地址 */}
        <div className="space-y-2">
          <Label className="text-sm">詳細地址</Label>
          <Input
            placeholder="請輸入路名、巷弄、號碼等詳細地址"
            value={state.currentAddress.detail}
            onChange={(e) => handleCurrentAddressChange('detail', e.target.value)}
          />
        </div>
      </div>

      {/* 戶籍地址 */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="sameAddress"
            checked={state.sameAsCurrentAddress}
            onCheckedChange={handleSameAddressChange}
          />
          <Label htmlFor="sameAddress" className="text-base font-medium">
            戶籍地址同現居地址
          </Label>
        </div>

        {!state.sameAsCurrentAddress && (
          <>
            <Label className="text-base font-medium">戶籍地址</Label>
            
            {/* 縣市選擇 */}
            <div className="space-y-2">
              <Label className="text-sm">縣市</Label>
              <Select 
                value={state.registeredAddress.county} 
                onValueChange={(value) => handleRegisteredAddressChange('county', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="請選擇縣市" />
                </SelectTrigger>
                <SelectContent>
                  {taiwanRegionsData.regions.map(region => (
                    <SelectItem key={region.id} value={region.id}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 鄉鎮市區選擇 */}
            <div className="space-y-2">
              <Label className="text-sm">鄉鎮市區</Label>
              <Select 
                value={state.registeredAddress.district} 
                onValueChange={(value) => handleRegisteredAddressChange('district', value)}
                disabled={!state.registeredAddress.county}
              >
                <SelectTrigger>
                  <SelectValue placeholder="請選擇鄉鎮市區" />
                </SelectTrigger>
                <SelectContent>
                  {registeredDistricts.map(district => (
                    <SelectItem key={district.id} value={district.id}>
                      {district.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 村里選擇 */}
            <div className="space-y-2">
              <Label className="text-sm">村里</Label>
              <Select 
                value={state.registeredAddress.village} 
                onValueChange={(value) => handleRegisteredAddressChange('village', value)}
                disabled={!state.registeredAddress.district}
              >
                <SelectTrigger>
                  <SelectValue placeholder="請選擇村里" />
                </SelectTrigger>
                <SelectContent>
                  {registeredVillages.map(village => (
                    <SelectItem key={village} value={village}>
                      {village}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 詳細地址 */}
            <div className="space-y-2">
              <Label className="text-sm">詳細地址</Label>
              <Input
                placeholder="請輸入路名、巷弄、號碼等詳細地址"
                value={state.registeredAddress.detail}
                onChange={(e) => handleRegisteredAddressChange('detail', e.target.value)}
              />
            </div>
          </>
        )}
      </div>

      {/* 填寫說明 */}
      <div className="p-4 bg-gray-50 rounded-md">
        <h4 className="font-medium text-gray-800 mb-2">填寫說明</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• 地址資訊為選填，有助於警方調查</li>
          <li>• 如現居地址與戶籍地址相同，請勾選「戶籍地址同現居地址」</li>
          <li>• 選擇縣市後會自動載入對應的鄉鎮市區選項</li>
          <li>• 詳細地址請填寫完整的路名、巷弄、號碼等資訊</li>
        </ul>
      </div>
    </div>
  );
}