import { useState } from 'react';
import { useFraudForm } from '../FraudFormContext';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Trash2, Plus, Camera, Scan } from 'lucide-react';
import { bankCodesData } from '../../../data/bankCodes';
import { gameCompaniesData } from '../../../data/gameCompanies';

export function FraudDataPage() {
  const { state, dispatch } = useFraudForm();
  
  // 新增涉案電話的暫存狀態
  const [newPhone, setNewPhone] = useState({
    suspiciousPhone: '',
    victimPhone: '',
    callDate: ''
  });

  // 新增涉案帳戶的暫存狀態
  const [newAccount, setNewAccount] = useState({
    bankCode: '',
    accountNumber: ''
  });

  // 新增遊戲點數的暫存狀態
  const [newGameCard, setNewGameCard] = useState({
    company: '',
    serialNumber: ''
  });

  // 新增條碼的暫存狀態
  const [newBarcode, setNewBarcode] = useState({
    code1: '',
    code2: '',
    code3: ''
  });

  // 涉案電話相關函數
  const addPhone = () => {
    if (newPhone.suspiciousPhone && newPhone.victimPhone && newPhone.callDate) {
      dispatch({ type: 'ADD_PHONE', phone: newPhone });
      setNewPhone({ suspiciousPhone: '', victimPhone: '', callDate: '' });
    }
  };

  const removePhone = (index: number) => {
    dispatch({ type: 'REMOVE_PHONE', index });
  };

  // 涉案帳戶相關函數
  const addAccount = () => {
    if (newAccount.bankCode && newAccount.accountNumber) {
      dispatch({ type: 'ADD_ACCOUNT', account: newAccount });
      setNewAccount({ bankCode: '', accountNumber: '' });
    }
  };

  const removeAccount = (index: number) => {
    dispatch({ type: 'REMOVE_ACCOUNT', index });
  };

  // 遊戲點數相關函數
  const addGameCard = () => {
    if (newGameCard.company && newGameCard.serialNumber) {
      dispatch({ type: 'ADD_GAME_CARD', gameCard: newGameCard });
      setNewGameCard({ company: '', serialNumber: '' });
    }
  };

  const removeGameCard = (index: number) => {
    dispatch({ type: 'REMOVE_GAME_CARD', index });
  };

  // 條碼相關函數
  const addBarcode = () => {
    if (newBarcode.code1 && newBarcode.code2 && newBarcode.code3) {
      dispatch({ type: 'ADD_BARCODE', barcode: newBarcode });
      setNewBarcode({ code1: '', code2: '', code3: '' });
    }
  };

  const removeBarcode = (index: number) => {
    dispatch({ type: 'REMOVE_BARCODE', index });
  };

  // 模擬掃描條碼功能
  const scanBarcode = () => {
    // 模擬掃描結果
    const mockScanResult = {
      code1: '91234567',
      code2: '89012345', 
      code3: '67890123'
    };
    setNewBarcode(mockScanResult);
  };

  return (
    <div className="p-5 space-y-6">
      <h2 className="text-xl font-semibold" style={{ color: '#1C1C1E' }}>
        詐騙資料（選填，可多筆）
      </h2>

      {/* 涉案電話 */}
      <div className="space-y-3">
        <Label className="text-base font-medium">涉案電話</Label>
        
        {/* 現有電話列表 */}
        {state.phones.map((phone, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-md flex justify-between items-center">
            <div className="flex-1">
              <div className="text-sm">
                <strong>涉詐門號：</strong>{phone.suspiciousPhone}
              </div>
              <div className="text-sm">
                <strong>檢舉人門號：</strong>{phone.victimPhone}
              </div>
              <div className="text-sm">
                <strong>通話日期：</strong>{phone.callDate}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removePhone(index)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ))}

        {/* 新增電話表單 */}
        <div className="space-y-3 p-3 border border-gray-200 rounded-md">
          <Input
            placeholder="涉詐門號"
            value={newPhone.suspiciousPhone}
            onChange={(e) => setNewPhone(prev => ({ ...prev, suspiciousPhone: e.target.value }))}
          />
          <Input
            placeholder="檢舉人或被害人門號"
            value={newPhone.victimPhone}
            onChange={(e) => setNewPhone(prev => ({ ...prev, victimPhone: e.target.value }))}
          />
          <Input
            type="date"
            placeholder="通話日期"
            value={newPhone.callDate}
            onChange={(e) => setNewPhone(prev => ({ ...prev, callDate: e.target.value }))}
          />
          <Button onClick={addPhone} className="w-full">
            <Plus size={16} className="mr-2" />
            新增電話
          </Button>
        </div>
      </div>

      {/* 涉案帳戶 */}
      <div className="space-y-3">
        <Label className="text-base font-medium">涉案帳戶</Label>
        
        {/* 現有帳戶列表 */}
        {state.accounts.map((account, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-md flex justify-between items-center">
            <div className="flex-1">
              <div className="text-sm">
                <strong>銀行：</strong>
                {bankCodesData.banks.find(bank => bank.code === account.bankCode)?.name}
                （{account.bankCode}）
              </div>
              <div className="text-sm">
                <strong>帳戶號碼：</strong>{account.accountNumber}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeAccount(index)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ))}

        {/* 新增帳戶表單 */}
        <div className="space-y-3 p-3 border border-gray-200 rounded-md">
          <Select value={newAccount.bankCode} onValueChange={(value) => setNewAccount(prev => ({ ...prev, bankCode: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="選擇銀行" />
            </SelectTrigger>
            <SelectContent>
              {bankCodesData.banks.map(bank => (
                <SelectItem key={bank.code} value={bank.code}>
                  {bank.name}（{bank.code}）
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="帳戶號碼"
            value={newAccount.accountNumber}
            onChange={(e) => setNewAccount(prev => ({ ...prev, accountNumber: e.target.value }))}
          />
          <Button onClick={addAccount} className="w-full">
            <Plus size={16} className="mr-2" />
            新增帳戶
          </Button>
        </div>
      </div>

      {/* 涉案遊戲點數 */}
      <div className="space-y-3">
        <Label className="text-base font-medium">涉案遊戲點數</Label>
        
        {/* 現有遊戲點數列表 */}
        {state.gameCards.map((card, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-md flex justify-between items-center">
            <div className="flex-1">
              <div className="text-sm">
                <strong>遊戲業者：</strong>{card.company}
              </div>
              <div className="text-sm">
                <strong>序號：</strong>{card.serialNumber}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeGameCard(index)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ))}

        {/* 新增遊戲點數表單 */}
        <div className="space-y-3 p-3 border border-gray-200 rounded-md">
          <Select value={newGameCard.company} onValueChange={(value) => setNewGameCard(prev => ({ ...prev, company: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="選擇遊戲業者" />
            </SelectTrigger>
            <SelectContent>
              {gameCompaniesData.companies.map(company => (
                <SelectItem key={company} value={company}>
                  {company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="序號"
            value={newGameCard.serialNumber}
            onChange={(e) => setNewGameCard(prev => ({ ...prev, serialNumber: e.target.value }))}
          />
          <Button onClick={addGameCard} className="w-full">
            <Plus size={16} className="mr-2" />
            新增遊戲點數
          </Button>
        </div>
      </div>

      {/* 涉案超商繳費條碼 */}
      <div className="space-y-3">
        <Label className="text-base font-medium">涉案超商繳費條碼</Label>
        
        {/* 現有條碼列表 */}
        {state.barcodes.map((barcode, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-md flex justify-between items-center">
            <div className="flex-1">
              <div className="text-sm">
                <strong>條碼：</strong>
                {barcode.code1}-{barcode.code2}-{barcode.code3}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeBarcode(index)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ))}

        {/* 新增條碼表單 */}
        <div className="space-y-3 p-3 border border-gray-200 rounded-md">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={scanBarcode}
              className="flex-1"
            >
              <Scan size={16} className="mr-2" />
              掃描條碼
            </Button>
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm">手動輸入三段式條碼：</Label>
            <div className="flex gap-2">
              <Input
                placeholder="第一段"
                value={newBarcode.code1}
                onChange={(e) => setNewBarcode(prev => ({ ...prev, code1: e.target.value }))}
              />
              <span className="self-center">-</span>
              <Input
                placeholder="第二段"
                value={newBarcode.code2}
                onChange={(e) => setNewBarcode(prev => ({ ...prev, code2: e.target.value }))}
              />
              <span className="self-center">-</span>
              <Input
                placeholder="第三段"
                value={newBarcode.code3}
                onChange={(e) => setNewBarcode(prev => ({ ...prev, code3: e.target.value }))}
              />
            </div>
          </div>
          
          <Button onClick={addBarcode} className="w-full">
            <Plus size={16} className="mr-2" />
            新增條碼
          </Button>
        </div>
      </div>
    </div>
  );
}