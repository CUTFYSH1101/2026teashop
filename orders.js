const APP_SCRIPT_URL = 'PASTE_APPS_SCRIPT_WEB_APP_URL';

const ordersBody = document.querySelector('#orders-body');
const ordersMessage = document.querySelector('#orders-message');
const orderCount = document.querySelector('#order-count');
const refreshButton = document.querySelector('#refresh-orders');

function addCell(row, value, className = '') {
  const cell = document.createElement('td');
  cell.textContent = value || '—';
  if (className) cell.className = className;
  row.append(cell);
}

function renderOrders(orders) {
  orderCount.textContent = String(orders.length);
  if (!orders.length) {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = 6;
    cell.className = 'empty-state';
    cell.textContent = '目前還沒有訂單';
    row.append(cell);
    ordersBody.replaceChildren(row);
    return;
  }
  ordersBody.replaceChildren(...orders.map(order => {
    const row = document.createElement('tr');
    addCell(row, order.name);
    addCell(row, order.drink);
    addCell(row, `${order.temperature}・${order.size}`);
    addCell(row, `${order.sugar}／${order.ice}`);
    addCell(row, [order.addons !== '無' ? order.addons : '', order.note].filter(Boolean).join(' · '));
    addCell(row, `$${Number(order.price).toLocaleString('zh-TW')}`, 'amount-cell');
    return row;
  }));
}

function loadOrders() {
  if (APP_SCRIPT_URL === 'PASTE_APPS_SCRIPT_WEB_APP_URL') {
    ordersMessage.textContent = 'Apps Script 尚未部署，訂單清單目前無法連線。';
    ordersBody.firstElementChild?.querySelector('.empty-state')?.replaceChildren(document.createTextNode('等待試算表服務設定'));
    return;
  }

  refreshButton.disabled = true;
  ordersMessage.textContent = '更新中…';
  const callback = `ordersCallback_${Date.now()}`;
  const script = document.createElement('script');
  const timeout = window.setTimeout(() => {
    cleanup();
    ordersMessage.textContent = '載入逾時，請稍後重試。';
  }, 12000);
  function cleanup() {
    window.clearTimeout(timeout);
    delete window[callback];
    script.remove();
    refreshButton.disabled = false;
  }
  window[callback] = result => {
    cleanup();
    if (!result?.ok) {
      ordersMessage.textContent = result?.error || '讀取訂單失敗。';
      return;
    }
    renderOrders(result.orders || []);
    ordersMessage.textContent = `最後更新：${new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}`;
  };
  script.onerror = () => {
    cleanup();
    ordersMessage.textContent = '無法連線至試算表，請確認 Apps Script 部署設定。';
  };
  script.src = `${APP_SCRIPT_URL}?action=orders&callback=${callback}&t=${Date.now()}`;
  document.head.append(script);
}

refreshButton.addEventListener('click', loadOrders);
loadOrders();