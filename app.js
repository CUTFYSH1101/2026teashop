const APP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwtKqGNeSg6frF1LHP_PRrgqH21YmA0w87YrbkxbmwNnMMB-QC5c6i3E1j3YnyD3stuIg/exec';

const drinks = [
  { category: '珍珠奶茶', name: '珍珠奶茶', cold: [90, 170], hot: [105, 200] },
  { category: 'Shake 發源', name: '頂級烏龍紅茶凍飲', cold: [75, 140], hot: [90, 170] },
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
  { category: '調和茶', name: '冰梅凍飲', cold: [85, 160] },
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
  { category: '文人茶', name: '文山包種茶', hot: [210] }
];

const form = document.querySelector('#order-form');
const drinkSelect = document.querySelector('#drink');
const sizeSelect = document.querySelector('#size');
const tempOptions = document.querySelector('#temperature-options');
const message = document.querySelector('#form-message');
let selectedTemperature = 'cold';

function formatPrice(price) {
  return `$${price.toLocaleString('zh-TW')}`;
}

function selectedDrink() {
  return drinks[Number(drinkSelect.value)] || null;
}

function availableTemperatures(drink) {
  return [
    ...(drink?.cold ? [{ key: 'cold', label: '冷飲' }] : []),
    ...(drink?.hot ? [{ key: 'hot', label: '熱飲' }] : [])
  ];
}

function updateTemperatureOptions() {
  const drink = selectedDrink();
  const options = availableTemperatures(drink);
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

function updateSizeOptions() {
  const drink = selectedDrink();
  const prices = drink?.[selectedTemperature] || [];
  sizeSelect.replaceChildren(...prices.map((price, index) => {
    const option = document.createElement('option');
    option.value = String(index);
    option.dataset.price = String(price);
    option.textContent = prices.length === 1 ? `單杯 ${formatPrice(price)}` : `${index === 0 ? 'S' : 'M'} 杯 ${formatPrice(price)}`;
    return option;
  }));
  updatePrice();
}

function updatePrice() {
  const drink = selectedDrink();
  const basePrice = Number(sizeSelect.selectedOptions[0]?.dataset.price || 0);
  const addonPrice = [...form.querySelectorAll('input[name="addon"]:checked')]
    .reduce((total, input) => total + Number(input.dataset.price), 0);
  document.querySelector('#total-price').textContent = (basePrice + addonPrice).toLocaleString('zh-TW');
  document.querySelector('#base-price').textContent = formatPrice(basePrice);
  document.querySelector('#addon-price').textContent = formatPrice(addonPrice);
  document.querySelector('#price-description').textContent = drink ? `${drink.name} · ${selectedTemperature === 'cold' ? '冷飲' : '熱飲'}` : '請先選擇飲品';
}

function initializeDrinks() {
  const categories = [...new Set(drinks.map(drink => drink.category))];
  drinkSelect.replaceChildren(...categories.map(category => {
    const group = document.createElement('optgroup');
    group.label = category;
    drinks.forEach((drink, index) => {
      if (drink.category !== category) return;
      const option = document.createElement('option');
      option.value = String(index);
      option.textContent = drink.name;
      group.append(option);
    });
    return group;
  }));
  drinkSelect.addEventListener('change', () => {
    updateTemperatureOptions();
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

  const drink = selectedDrink();
  const basePrice = Number(sizeSelect.selectedOptions[0]?.dataset.price || 0);
  const addons = [...form.querySelectorAll('input[name="addon"]:checked')]
    .map(input => ({ name: input.value, price: Number(input.dataset.price) }));
  const order = {
    name: form.elements.name.value.trim(),
    drink: drink.name,
    category: drink.category,
    temperature: selectedTemperature === 'cold' ? '冷飲' : '熱飲',
    size: sizeSelect.options[sizeSelect.selectedIndex]?.textContent.split(' ')[0] || '單杯',
    sugar: form.elements.sugar.value,
    ice: form.elements.ice.value,
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
    updateSizeOptions();
  } catch {
    setMessage('送出失敗，請確認網路後再試一次。', true);
  } finally {
    button.disabled = false;
  }
});

initializeDrinks();