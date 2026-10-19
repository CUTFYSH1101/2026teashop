const APP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwtKqGNeSg6frF1LHP_PRrgqH21YmA0w87YrbkxbmwNnMMB-QC5c6i3E1j3YnyD3stuIg/exec';

const menuItems = [
  { category: '珍珠奶茶', name: '珍珠奶茶', cold: [90, 170], hot: [105, 200] },
  { category: 'Shake 發源', name: '頂級烏瓦紅茶凍飲', cold: [75, 140], hot: [90, 170] },
  { category: '特別推薦', name: '翡翠百香綠茶', cold: [110, 210] },
  { category: '特別推薦', name: '百香檸檬蘆薈綠茶', cold: [110, 210] },
  { category: '夏限定', name: '四季春冰茶', cold: [80, 150] },
  { category: '夏限定', name: '四季春紅柚蜜茶', cold: [120, 230] },
  { category: '夏限定', name: '紅心芭樂檸檬綠茶', cold: [125, 240] },
  { category: '鮮奶茶', name: '紅茶拿鐵', cold: [105, 200], hot: [115, 220] },
  { category: '鮮奶茶', name: '鐵觀音拿鐵', cold: [105, 200], hot: [115, 220] },
  { category: '鮮奶茶', name: '黑糖琥珀珍珠拿鐵', cold: [120, 230] },
  { category: '奶茶', name: '香醇奶茶', cold: [85, 160], hot: [100, 190] },
  { category: '奶茶', name: '胚芽奶茶', cold: [90, 170], hot: [105, 200] },
  { category: '奶茶', name: '茉香奶茶', cold: [85, 160], hot: [100, 190] },
  { category: '奶茶', name: '茉奶珍珠', cold: [90, 170], hot: [105, 200] },
  { category: '奶茶', name: '鐵觀音奶茶', cold: [85, 160], hot: [100, 190] },
  { category: '奶茶', name: '觀音珍珠奶茶', cold: [90, 170], hot: [105, 200] },
  { category: '純粹茶', name: '鐵觀音凍飲', cold: [75, 140] },
  { category: '純粹茶', name: '翡翠綠茶凍飲', cold: [80, 150] },
  { category: '調和茶', name: '珍珠紅茶', cold: [80, 150] },
  { category: '調和茶', name: '珍珠翡翠綠茶', cold: [80, 150] },
  { category: '調和茶', name: '冰梅凍飲', cold: [85, 160], hot: [100, 190] },
  { category: '調和茶', name: '蜂蜜翡翠綠茶', cold: [85, 160] },
  { category: '調和茶', name: '翡翠檸檬綠茶', cold: [100, 190] },
  { category: '無茶類', name: '檸檬蜜凍飲', cold: [95, 180] },
  { category: '無茶類', name: '熱蜂蜜檸檬', hot: [110] },
  { category: '無茶類', name: '檸檬蘆薈凍飲', cold: [100, 190] },
  { category: '無茶類', name: '蜂蜜拿鐵', cold: [105, 200], hot: [115, 220] },
  { category: '文人茶', name: '萬壽菊', hot: [210] },
  { category: '文人茶', name: '白毫萬壽菊', hot: [210] },
  { category: '文人茶', name: '金萱萬壽菊', hot: [210] },
  { category: '文人茶', name: '高山金萱', hot: [210] },
  { category: '文人茶', name: '高山焙火烏龍', hot: [210] },
  { category: '文人茶', name: '白毫烏龍', hot: [210] },
  { category: '文人茶', name: '文山包種茶', hot: [210] },
  { category: '手工烘焙', name: '三沾小麻吉', price: 80 },
  { category: '手工烘焙', name: '花生吐司', price: 80 },
  { category: '手工烘焙', name: '奶酥吐司', price: 80 },
  { category: '佐味茶點', name: '雙拼燒賣（珍珠＋蝦仁）', price: 180 },
  { category: '佐味茶點', name: '招牌滷味豆干米血', price: 180 },
  { category: '蒸物', name: '金菇豆皮', price: 95 },
  { category: '蒸物', name: '珍珠燒賣', price: 95 },
  { category: '蒸物', name: '蝦仁燒賣', price: 95 },
  { category: '蒸物', name: '古早味蘿蔔糕（蒸）', price: 100 },
  { category: '炸物', name: '黃金花枝蝦排', price: 165 },
  { category: '炸物', name: '黃金煉乳饅頭', price: 95 },
  { category: '炸物', name: '金沙芋泥丸', price: 95 },
  { category: '炸物', name: '黃金脆皮薯條', price: 95 },
  { category: '炸物', name: '招牌蘿蔔糕（煎）', price: 105 },
  { category: '炸物', name: '黃金香酥雞', price: 110 },
  { category: '炸物', name: '經典炸雞翅', price: 115 },
  { category: '滷・煮物', name: '茶香高麗菜', price: 90 },
  { category: '滷・煮物', name: '古早味地瓜葉', price: 90 },
  { category: '滷・煮物', name: '招牌米血', price: 95 },
  { category: '滷・煮物', name: '烏龍米血', price: 95 },
  { category: '滷・煮物', name: '招牌豆干', price: 95 },
  { category: '滷・煮物', name: '烏龍豆干', price: 95 },
  { category: '滷・煮物', name: '鮮肉紅油抄手', price: 105 },
  { category: '滷・煮物', name: '茶香饗皇鳳爪', price: 105 },
  { category: '滷・煮物', name: '胡麻拌豬五花', price: 125 },
  { category: '滷・煮物', name: '椒麻拌豬五花', price: 125 },
  { category: '精選套餐', name: '東坡紅燒肉套餐', price: 350 },
  { category: '精選套餐', name: '古早味虱目魚套餐', price: 350 },
  {
    category: '私房特餐', name: '私房肉排蓋飯', price: 228,
    bundleDrinks: ['頂級烏瓦紅茶凍飲', '鐵觀音凍飲', '翡翠綠茶凍飲', '熱白毫烏龍蓋杯']
  },
  { category: '傳統飽食', name: '手工麻香麵線', price: 100 },
  { category: '傳統飽食', name: '手工素麵線', price: 100 },
  { category: '傳統飽食', name: '五香素麵', price: 100 },
  { category: '傳統飽食', name: '古早味蜜醬肉圓', price: 105 },
  { category: '傳統飽食', name: '功夫麵', price: 110 },
  { category: '傳統飽食', name: '胡麻豆漿擔擔麵', price: 120 },
  { category: '傳統飽食', name: '椒麻豆漿擔擔麵', price: 120 },
  { category: '傳統飽食', name: '麻油雞絲蒸麵油飯', price: 120 },
  { category: '傳統飽食', name: '經典排骨酥麵', price: 240 },
  { category: '傳統飽食', name: '御品牛肉麵', price: 245 },
  { category: '傳統飽食', name: '半筋半肉番茄牛肉麵', price: 255 },
  { category: '搭配好夥伴', name: '滷蛋', price: 20 },
  { category: '圓盅湯品', name: '當歸藥膳湯', price: 170 },
  { category: '圓盅湯品', name: '金薑剝皮辣椒雞湯', price: 185 }
];

const form = document.querySelector('#order-form');
const drinkSelect = document.querySelector('#drink');
const sizeSelect = document.querySelector('#size');
const tempOptions = document.querySelector('#temperature-options');
const bundleDrinkField = document.querySelector('#bundle-drink-field');
const bundleDrinkSelect = document.querySelector('#bundle-drink');
const temperatureField = document.querySelector('#beverage-temperature');
const adjustmentsField = document.querySelector('#beverage-adjustments');
const addonsField = document.querySelector('#beverage-addons');
const message = document.querySelector('#form-message');
let selectedTemperature = 'cold';

function formatPrice(price) {
  return `$${price.toLocaleString('zh-TW')}`;
}

function selectedItem() {
  return menuItems[Number(drinkSelect.value)] || null;
}

function isBeverage(item) {
  return Boolean(item?.cold || item?.hot);
}

function availableTemperatures(item) {
  return [
    ...(item?.cold ? [{ key: 'cold', label: '冷飲' }] : []),
    ...(item?.hot ? [{ key: 'hot', label: '熱飲' }] : [])
  ];
}

function updateTemperatureOptions() {
  const item = selectedItem();
  const options = availableTemperatures(item);
  temperatureField.hidden = !isBeverage(item);
  adjustmentsField.hidden = !isBeverage(item);
  addonsField.hidden = !isBeverage(item);
  if (!isBeverage(item)) form.querySelectorAll('input[name="addon"]').forEach(input => { input.checked = false; });
  if (!options.some(option => option.key === selectedTemperature)) {
    selectedTemperature = options[0]?.key || 'cold';
  }
  tempOptions.replaceChildren(...options.map(option => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'temperature';
    input.value = option.key;
    input.checked = option.key === selectedTemperature;
    input.addEventListener('change', () => {
      selectedTemperature = input.value;
      updateSizeOptions();
      updatePrice();
    });
    const text = document.createElement('span');
    text.textContent = option.label;
    label.append(input, text);
    return label;
  }));
}

function updateBundleDrinkOptions() {
  const bundleDrinks = selectedItem()?.bundleDrinks || [];
  bundleDrinkField.hidden = bundleDrinks.length === 0;
  bundleDrinkSelect.replaceChildren(...bundleDrinks.map(name => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    return option;
  }));
}

function updateSizeOptions() {
  const item = selectedItem();
  const beverage = isBeverage(item);
  const prices = beverage ? item[selectedTemperature] || [] : [Number(item?.price) || 0];
  sizeSelect.closest('.field').hidden = !beverage;
  sizeSelect.replaceChildren(...prices.map((price, index) => {
    const option = document.createElement('option');
    option.value = String(index);
    option.dataset.price = String(price);
    option.textContent = !beverage ? `單點 ${formatPrice(price)}` : prices.length === 1 ? `單杯 ${formatPrice(price)}` : `${index === 0 ? 'S' : 'M'} 杯 ${formatPrice(price)}`;
    return option;
  }));
  updatePrice();
}

function updatePrice() {
  const item = selectedItem();
  const beverage = isBeverage(item);
  const basePrice = Number(sizeSelect.selectedOptions[0]?.dataset.price || 0);
  const addonPrice = beverage ? [...form.querySelectorAll('input[name="addon"]:checked')]
    .reduce((total, input) => total + Number(input.dataset.price), 0) : 0;
  document.querySelector('#total-price').textContent = (basePrice + addonPrice).toLocaleString('zh-TW');
  document.querySelector('#base-price').textContent = formatPrice(basePrice);
  document.querySelector('#addon-price').textContent = formatPrice(addonPrice);
  document.querySelector('#price-description').textContent = item
    ? `${item.name} · ${beverage ? selectedTemperature === 'cold' ? '冷飲' : '熱飲' : '單點'}`
    : '請先選擇餐點';
}

function initializeDrinks() {
  const categories = [...new Set(menuItems.map(item => item.category))];
  drinkSelect.replaceChildren(...categories.map(category => {
    const group = document.createElement('optgroup');
    group.label = category;
    menuItems.forEach((item, index) => {
      if (item.category !== category) return;
      const option = document.createElement('option');
      option.value = String(index);
      option.textContent = item.name;
      group.append(option);
    });
    return group;
  }));
  drinkSelect.addEventListener('change', () => {
    updateTemperatureOptions();
    updateBundleDrinkOptions();
    updateSizeOptions();
  });
  form.addEventListener('change', updatePrice);
  updateTemperatureOptions();
  updateSizeOptions();
}

function setMessage(text, isError = false) {
  message.textContent = text;
  message.classList.toggle('is-error', isError);
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  if (APP_SCRIPT_URL === 'PASTE_APPS_SCRIPT_WEB_APP_URL') {
    setMessage('尚未設定訂單試算表，請先完成 Apps Script 部署。', true);
    return;
  }

  const item = selectedItem();
  const beverage = isBeverage(item);
  const basePrice = Number(sizeSelect.selectedOptions[0]?.dataset.price || 0);
  const addons = beverage ? [...form.querySelectorAll('input[name="addon"]:checked')]
    .map(input => ({ name: input.value, price: Number(input.dataset.price) })) : [];
  const order = {
    name: form.elements.name.value.trim(),
    item: item.name,
    category: item.category,
    bundleDrink: bundleDrinkSelect.value || '',
    temperature: beverage ? selectedTemperature === 'cold' ? '冷飲' : '熱飲' : '',
    size: beverage ? sizeSelect.options[sizeSelect.selectedIndex]?.textContent.split(' ')[0] || '單杯' : '單點',
    sugar: beverage ? form.elements.sugar.value : '',
    ice: beverage ? form.elements.ice.value : '',
    addons: addons.map(addon => addon.name).join('、') || '無',
    note: form.elements.note.value.trim(),
    price: basePrice + addons.reduce((total, addon) => total + addon.price, 0),
    createdAt: new Date().toISOString()
  };

  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  setMessage('訂單送出中…');
  try {
    await fetch(APP_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: new URLSearchParams({ payload: JSON.stringify(order) })
    });
    setMessage('訂單已送出，已記錄姓名、品項與金額。');
    form.reset();
    selectedTemperature = 'cold';
    updateTemperatureOptions();
    updateBundleDrinkOptions();
    updateSizeOptions();
  } catch {
    setMessage('送出失敗，請確認網路後再試一次。', true);
  } finally {
    button.disabled = false;
  }
});

initializeDrinks();