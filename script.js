lucide.createIcons();

let balance = 200.00;
let openPosition = null;
let currentSymbol = 'BINANCE:BTCUSDT';
let currentTVsymbol = 'BINANCE:BTCUSDT';
let currentPrice = 65000.00;
let isBreached = false;
let activeWs = null;

const markets = [
  { name: 'Bitcoin', symbol: 'BINANCE:BTCUSDT', tv: 'BINANCE:BTCUSDT', price: 65000, type: 'crypto' },
  { name: 'Ethereum', symbol: 'BINANCE:ETHUSDT', tv: 'BINANCE:ETHUSDT', price: 3400, type: 'crypto' },
  { name: 'Or (Gold)', symbol: 'OANDA:XAUUSD', tv: 'OANDA:XAUUSD', price: 2650, type: 'forex' },
  { name: 'EUR / USD', symbol: 'FX:EURUSD', tv: 'FX:EURUSD', price: 1.085, type: 'forex' },
  { name: 'GBP / USD', symbol: 'FX:GBPUSD', tv: 'FX:GBPUSD', price: 1.307, type: 'forex' },
  { name: 'USD / JPY', symbol: 'FX:USDJPY', tv: 'FX:USDJPY', price: 149.9, type: 'forex' }
];

function switchTab(tab) {
  document.getElementById('tab-landing').classList.add('hidden');
  document.getElementById('tab-webtrader').classList.add('hidden');
  document.getElementById('tab-' + tab).classList.remove('hidden');

  if (tab === 'webtrader') {
    renderMarketsList();
    selectMarket('BINANCE:BTCUSDT');
  }
}

function openAdminModal() {
  const pin = prompt("Code PIN Administrateur Vanguard :");
  if (pin === "2026") alert("🔒 Espace Fondateur Déverrouillé.");
  else alert("PIN Invalide.");
}

function renderMarketsList() {
  const container = document.getElementById('markets-list');
  container.innerHTML = markets.map(m => `
    <div onclick="selectMarket('${m.symbol}')" class="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 cursor-pointer border border-slate-800/80 flex justify-between items-center transition">
      <div>
        <div class="font-bold text-white text-xs">${m.name}</div>
        <div class="text-[10px] text-slate-500 font-mono">${m.symbol}</div>
      </div>
      <div id="price-${m.symbol.replace(/[:\/]/g, '_')}" class="font-mono text-emerald-400 font-bold text-xs">${m.price}</div>
    </div>
  `).join('');
}

function selectMarket(symbol) {
  currentSymbol = symbol;
  const m = markets.find(x => x.symbol === symbol);
  if (!m) return;
  currentPrice = m.price;
  currentTVsymbol = m.tv;

  document.getElementById('current-symbol-title').innerText = `${m.name} (${m.symbol})`;
  initTradingView(currentTVsymbol);
  connectRealTimeStream(m);
}

function initTradingView(symbol) {
  document.getElementById('tv_chart_container').innerHTML = '';
  new TradingView.widget({
    "autosize": true,
    "symbol": symbol,
    "interval": "15",
    "timezone": "Etc/UTC",
    "theme": "dark",
    "style": "1",
    "locale": "fr",
    "toolbar_bg": "#0f172a",
    "container_id": "tv_chart_container"
  });
}

function connectRealTimeStream(m) {
  if (activeWs) {
    if (typeof activeWs === 'number') clearInterval(activeWs);
    else activeWs.close();
  }

  if (m.type === 'crypto') {
    const streamName = m.symbol.split(':')[1].toLowerCase() + '@trade';
    activeWs = new WebSocket(`wss://stream.binance.com:9443/ws/${streamName}`);
    activeWs.onmessage = (event) => {
      const data = JSON.parse(event.data);
      currentPrice = parseFloat(data.p);
      updateLiveDisplay(m.symbol);
    };
  } else {
    activeWs = setInterval(() => {
      const diff = (Math.random() - 0.48) * (currentPrice > 1000 ? 1.5 : 0.0002);
      currentPrice = Math.max(0.0001, currentPrice + diff);
      updateLiveDisplay(m.symbol);
    }, 1000);
  }
}

function updateLiveDisplay(symbol) {
  document.getElementById('live-price').innerText = currentPrice.toFixed(currentPrice > 1000 ? 2 : 4);
  const el = document.getElementById(`price-${symbol.replace(/[:\/]/g, '_')}`);
  if (el) el.innerText = currentPrice.toFixed(currentPrice > 1000 ? 2 : 4);
  updatePnL();
}

function setLot(val) {
  document.getElementById('trade-lot').value = val;
}

function executeTrade(type) {
  if (isBreached || openPosition) return;
  const lot = parseFloat(document.getElementById('trade-lot').value) || 0.10;
  openPosition = { type, entryPrice: currentPrice, lot };

  document.getElementById('pos-type').innerText = type + " (" + lot + " lot)";
  document.getElementById('pos-type').className = type === 'BUY' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold';
  document.getElementById('btn-close').disabled = false;
  document.getElementById('btn-close').className = "w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition shadow-lg shadow-emerald-500/20";
}

function updatePnL() {
  if (!openPosition) {
    document.getElementById('wt-equity').innerText = '$' + balance.toFixed(2);
    document.getElementById('wt-pnl').innerText = '$0.00';
    return;
  }

  const mult = openPosition.type === 'BUY' ? 1 : -1;
  const diff = (currentPrice - openPosition.entryPrice) * mult;
  const multiplierFactor = currentPrice > 1000 ? 1 : 10000;
  const pnl = diff * openPosition.lot * multiplierFactor;
  const equity = balance + pnl;

  document.getElementById('wt-equity').innerText = '$' + equity.toFixed(2);
  document.getElementById('wt-pnl').innerText = (pnl >= 0 ? '+$' : '-$') + Math.abs(pnl).toFixed(2);
  document.getElementById('pos-pnl').innerText = (pnl >= 0 ? '+$' : '-$') + Math.abs(pnl).toFixed(2);

  if (equity >= 220.00) {
    showBanner("🎉 Objectif atteint ! Félicitations, vous avez réussi l'évaluation.", "bg-emerald-500/20 border-emerald-500 text-emerald-300");
  } else if (equity <= 184.00) {
    triggerBreach();
  }
}

function closePosition() {
  if (!openPosition) return;
  const pnlText = document.getElementById('pos-pnl').innerText.replace('+$', '').replace('-$', '-');
  balance += parseFloat(pnlText) || 0;
  openPosition = null;

  document.getElementById('wt-balance').innerText = '$' + balance.toFixed(2);
  document.getElementById('wt-target').innerText = '$' + Math.max(0, balance - 200).toFixed(2) + ' / $20';
  document.getElementById('pos-type').innerText = 'AUCUNE';
  document.getElementById('btn-close').disabled = true;
  document.getElementById('btn-close').className = "w-full py-2.5 bg-slate-800 text-slate-500 font-bold text-xs rounded-xl transition cursor-not-allowed";
  updatePnL();
}

function triggerBreach() {
  isBreached = true;
  openPosition = null;
  showBanner("🛑 Compte invalidé. L'équité a atteint le seuil de $184.00.", "bg-rose-500/20 border-rose-500 text-rose-300");
}

function showBanner(text, cssClass) {
  const banner = document.getElementById('status-banner');
  banner.className = `p-4 rounded-xl border font-bold text-sm flex justify-between items-center ${cssClass}`;
  document.getElementById('status-text').innerText = text;
  banner.classList.remove('hidden');
}

function resetAccount() {
  balance = 200.00;
  isBreached = false;
  document.getElementById('status-banner').classList.add('hidden');
  document.getElementById('wt-balance').innerText = '$200.00';
  updatePnL();
}
