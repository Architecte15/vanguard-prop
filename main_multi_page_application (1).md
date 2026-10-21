import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_MARKETS } from './markets';
import {
Lock,
Sparkles,
CheckCircle2,
Calendar,
Play,
RotateCcw,
TrendingUp,
AlertTriangle
} from 'lucide-react';

export default function App() {
const \[activeTab, setActiveTab\] = useState('landing');
const \[pricingPeriod, setPricingPeriod\] = useState('one-time');

// Trading Engine States
const \[balance, setBalance\] = useState(200.00);
const \[openPosition, setOpenPosition\] = useState(null);
const \[markets, setMarkets\] = useState(INITIAL_MARKETS);
const \[currentSymbol, setCurrentSymbol\] = useState(INITIAL_MARKETS\[0\]);
const \[currentPrice, setCurrentPrice\] = useState(65000.00);
const \[isBreached, setIsBreached\] = useState(false);
const \[tradeLot, setTradeLot\] = useState(0.10);
const \[statusBanner, setStatusBanner\] = useState(null);

const activeWsRef = useRef(null);
const tvWidgetRef = useRef(null);

// Initialize TradingView Chart Widget
useEffect(() => {
if (activeTab === 'webtrader' && window.TradingView) {
document.getElementById('tv_chart_container').innerHTML = '';
tvWidgetRef.current = new window.TradingView.widget({
"autosize": true,
"symbol": currentSymbol.tv,
"interval": "15",
"timezone": "Etc/UTC",
"theme": "dark",
"style": "1",
"locale": "fr",
"toolbar_bg": "#0f172a",
"container_id": "tv_chart_container"
});
}
}, \[currentSymbol, activeTab\]);

// Handle Real-Time Stream (Crypto & Forex Simulation)
useEffect(() => {
if (activeTab !== 'webtrader') return;

```
if (activeWsRef.current) {
  if (typeof activeWsRef.current === 'number') clearInterval(activeWsRef.current);
  else if (activeWsRef.current.close) activeWsRef.current.close();
}

if (currentSymbol.type === 'crypto') {
  const streamName = currentSymbol.symbol.split(':')[1].toLowerCase() + '@trade';
  const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${streamName}`);
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const price = parseFloat(data.p);
    setCurrentPrice(price);
    updateMarketPrice(currentSymbol.symbol, price);
  };
  activeWsRef.current = ws;
} else {
  const interval = setInterval(() => {
    const diff = (Math.random() - 0.48) * (currentSymbol.price > 1000 ? 1.5 : 0.0002);
    setCurrentPrice(prev => {
      const next = Math.max(0.0001, prev + diff);
      updateMarketPrice(currentSymbol.symbol, next);
      return next;
    });
  }, 1000);
  activeWsRef.current = interval;
}

return () => {
  if (activeWsRef.current) {
    if (typeof activeWsRef.current === 'number') clearInterval(activeWsRef.current);
    else if (activeWsRef.current.close) activeWsRef.current.close();
  }
};

```

}, \[currentSymbol, activeTab\]);

const updateMarketPrice = (symbol, price) => {
setMarkets(prev => prev.map(m => m.symbol === symbol ? { ...m, price } : m));
};

// PnL & Equity Calculations
const getPnL = () => {
if (!openPosition) return 0;
const mult = openPosition.type === 'BUY' ? 1 : -1;
const diff = (currentPrice - openPosition.entryPrice) \* mult;
const multiplierFactor = currentPrice > 1000 ? 1 : 10000;
return diff \* openPosition.lot \* multiplierFactor;
};

const currentPnL = getPnL();
const currentEquity = balance + currentPnL;

// Objective and Safety Checks
useEffect(() => {
if (activeTab !== 'webtrader' || isBreached) return;

```
if (currentEquity >= 220.00 && balance < 220) {
  setStatusBanner({
    text: "🎉 Objectif atteint ! Félicitations, vous avez réussi l'évaluation Vanguard.",
    style: "bg-emerald-500/20 border-emerald-500 text-emerald-300"
  });
} else if (currentEquity <= 184.00) {
  setIsBreached(true);
  setOpenPosition(null);
  setStatusBanner({
    text: "🛑 Compte invalidé. L'équité a atteint le seuil critique de $184.00.",
    style: "bg-rose-500/20 border-rose-500 text-rose-300"
  });
}

```

}, \[currentEquity, activeTab, isBreached\]);

const executeTrade = (type) => {
if (isBreached || openPosition) return;
setOpenPosition({
type,
entryPrice: currentPrice,
lot: tradeLot
});
};

const closePosition = () => {
if (!openPosition) return;
setBalance(prev => prev + currentPnL);
setOpenPosition(null);
};

const resetAccount = () => {
setBalance(200.00);
setIsBreached(false);
setOpenPosition(null);
setStatusBanner(null);
};

const openAdminModal = () => {
const pin = prompt("Code PIN Administrateur Vanguard :");
if (pin === "2026") {
alert("🔒 Espace Fondateur Déverrouillé.");
} else {
alert("Code PIN invalide.");
}
};

return (

{/\* NAVBAR \*/}


<div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('landing')}>

V


VANGUARD PROP


```
      <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800">
        <button 
          onClick={() => setActiveTab('landing')}
          className={`px-5 py-2 rounded-xl font-semibold text-xs transition ${activeTab === 'landing' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'}`}>
          Accueil
        </button>
        <button 
          onClick={() => setActiveTab('challenges')}
          className={`px-5 py-2 rounded-xl font-semibold text-xs transition ${activeTab === 'challenges' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'}`}>
          Challenges & Pass Hebdo
        </button>
        <button 
          onClick={() => setActiveTab('webtrader')}
          className={`px-5 py-2 rounded-xl font-semibold text-xs transition ${activeTab === 'webtrader' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'}`}>
          WebTrader Live
        </button>
      </nav>

      <div className="flex items-center gap-3">
        <button 
          onClick={openAdminModal}
          className="px-3 py-2 text-xs font-bold text-slate-400 hover:text-white bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-amber-400" /> Espace Admin
        </button>
        <button 
          onClick={() => setActiveTab('webtrader')}
          className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs rounded-xl hover:opacity-90 transition shadow-lg shadow-emerald-500/20">
          Lancer le WebTrader
        </button>
      </div>
    </div>
  </header>

  <main className="max-w-7xl mx-auto px-4 py-8">
    {/* LANDING PAGE */}
    {activeTab === 'landing' && (
      <div className="space-y-16">
        <section className="text-center py-12 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-6">
            <Sparkles className="w-4 h-4" /> COMPACT & PUISSANT : CHALLENGES DISPONIBLES
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
            Accédez à un Capital de Trading <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">Financé</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-sm md:text-base mb-8">
            Réussissez l'évaluation en respectant les limites de risque. Recevez jusqu'à 80% de vos profits en USDT ou Mobile Money.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => setActiveTab('challenges')}
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm rounded-2xl transition shadow-xl shadow-emerald-500/25">
              Voir les Offres (Dès $15 / 15 000 FCFA)
            </button>
          </div>
        </section>
      </div>
    )}

    {/* PRICING & PASS HEBDOMADAIRE */}
    {activeTab === 'challenges' && (
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-black text-white">Formules & Pass Hebdomadaires</h2>
          <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-2xl">
            <button 
              onClick={() => setPricingPeriod('one-time')}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition ${pricingPeriod === 'one-time' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'}`}>
              Accès Unique
            </button>
            <button 
              onClick={() => setPricingPeriod('weekly')}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${pricingPeriod === 'weekly' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'}`}>
              <Calendar className="w-3.5 h-3.5" /> Pass Hebdomadaire
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl glass-panel-glow relative">
            <div className="absolute -top-3 right-6 px-3 py-1 bg-emerald-500 text-slate-950 text-[10px] font-black rounded-full uppercase">
              Best-Seller
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Challenge Starter $200</h3>
            <p className="text-xs text-slate-400 mb-6">Idéal pour démarrer sans risque.</p>
            <div className="text-3xl font-black text-emerald-400 mb-6">
              {pricingPeriod === 'one-time' ? '15 000 FCFA ($15)' : '5 000 FCFA / sem ($5)'}
            </div>
            <ul className="space-y-3 text-xs text-slate-300 mb-8">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Capital : $200.00</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Objectif (+10%) : +$20.00</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Perte Max (8%) : $184.00</li>
            </ul>
            <button 
              onClick={() => setActiveTab('webtrader')}
              className="w-full py-3 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-emerald-400 transition">
              Commencer l'évaluation
            </button>
          </div>

          <div className="p-6 rounded-3xl glass-panel">
            <h3 className="text-xl font-bold text-white mb-2">Compte Financement $5,000</h3>
            <div className="text-3xl font-black text-amber-400 mb-6">
              {pricingPeriod === 'one-time' ? '$49' : '$15 / semaine'}
            </div>
            <ul className="space-y-3 text-xs text-slate-300 mb-8">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Capital : $5,000</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Objectif (+10%) : +$500</li>
            </ul>
            <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition">
              Sélectionner
            </button>
          </div>

          <div className="p-6 rounded-3xl glass-panel">
            <h3 className="text-xl font-bold text-white mb-2">Compte Elite $25,000</h3>
            <div className="text-3xl font-black text-teal-400 mb-6">
              {pricingPeriod === 'one-time' ? '$199' : '$45 / semaine'}
            </div>
            <ul className="space-y-3 text-xs text-slate-300 mb-8">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-400" /> Capital : $25,000</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-400" /> Objectif (+10%) : +$2,500</li>
            </ul>
            <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition">
              Sélectionner
            </button>
          </div>
        </div>
      </div>
    )}

    {/* WEBTRADER TERMINAL */}
    {activeTab === 'webtrader' && (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="p-4 rounded-2xl glass-panel">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Solde</span>
            <div className="text-lg font-black text-white font-mono">${balance.toFixed(2)}</div>
          </div>
          <div className="p-4 rounded-2xl glass-panel">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Équité Live</span>
            <div className={`text-lg font-black font-mono ${currentEquity >= balance ? 'text-emerald-400' : 'text-rose-400'}`}>
              ${currentEquity.toFixed(2)}
            </div>
          </div>
          <div className="p-4 rounded-2xl glass-panel">
            <span className="text-[10px] text-slate-500 uppercase font-bold">PnL Flottant</span>
            <div className={`text-lg font-black font-mono ${currentPnL >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {currentPnL >= 0 ? '+$' : '-$'}{Math.abs(currentPnL).toFixed(2)}
            </div>
          </div>
          <div className="p-4 rounded-2xl glass-panel">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Objectif ($220)</span>
            <div className="text-lg font-black text-amber-400 font-mono">
              ${Math.max(0, balance - 200).toFixed(2)} / $20.00
            </div>
          </div>
          <div className="p-4 rounded-2xl glass-panel">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Limite Absolue ($184)</span>
            <div className="text-lg font-black text-rose-400 font-mono">
              {isBreached ? "ÉLIMINÉ" : "Actif"}
            </div>
          </div>
        </div>

        {statusBanner && (
          <div className={`p-4 rounded-2xl border font-bold text-xs flex justify-between items-center ${statusBanner.style}`}>
            <span>{statusBanner.text}</span>
            <button onClick={resetAccount} className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-white font-bold text-[10px] flex items-center gap-1">
              <RotateCcw className="w-3 h-3" /> Réinitialiser
            </button>
          </div>
        )}

        <div className="grid md:grid-cols-4 gap-4">
          {/* MARKETS LIST */}
          <div className="p-4 rounded-2xl glass-panel space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Marchés</h3>
            {markets.map(m => (
              <div 
                key={m.symbol}
                onClick={() => setCurrentSymbol(m)}
                className={`p-3 rounded-xl cursor-pointer border flex justify-between items-center transition ${currentSymbol.symbol === m.symbol ? 'bg-slate-800 border-emerald-500/50' : 'bg-slate-950/60 border-slate-900 hover:bg-slate-800/50'}`}>
                <div>
                  <div className="font-bold text-white text-xs">{m.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{m.symbol}</div>
                </div>
                <div className="font-mono text-emerald-400 font-bold text-xs">
                  {m.price.toFixed(m.price > 1000 ? 2 : 4)}
                </div>
              </div>
            ))}
          </div>

          {/* TRADINGVIEW CHART */}
          <div className="md:col-span-2 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col min-h-[450px]">
            <div className="p-3 bg-slate-900/80 border-b border-slate-800 flex justify-between items-center">
              <span className="text-xs font-bold text-white">{currentSymbol.name} ({currentSymbol.symbol})</span>
              <span className="text-xs font-mono font-bold text-emerald-400">
                Prix Live: ${currentPrice.toFixed(currentPrice > 1000 ? 2 : 4)}
              </span>
            </div>
            <div id="tv_chart_container" className="flex-1 w-full h-full"></div>
          </div>

          {/* ORDER PANEL */}
          <div className="p-4 rounded-2xl glass-panel space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Passer un Ordre</h3>

            <div className="space-y-2">
              <label className="text-[10px] text-slate-400 font-bold uppercase">Volume (Lots)</label>
              <input 
                type="number" 
                step="0.01" 
                value={tradeLot} 
                onChange={(e) => setTradeLot(parseFloat(e.target.value) || 0.01)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500" 
              />
              <div className="flex gap-1">
                {[0.01, 0.05, 0.10, 0.50].map(l => (
                  <button key={l} onClick={() => setTradeLot(l)} className="flex-1 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] font-mono text-slate-300 rounded-lg">
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button 
                onClick={() => executeTrade('BUY')}
                disabled={isBreached || openPosition !== null}
                className="py-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 text-slate-950 font-black text-xs rounded-xl transition">
                ACHETER (BUY)
              </button>
              <button 
                onClick={() => executeTrade('SELL')}
                disabled={isBreached || openPosition !== null}
                className="py-3 bg-rose-500 hover:bg-rose-400 disabled:opacity-30 text-slate-950 font-black text-xs rounded-xl transition">
                VENDRE (SELL)
              </button>
            </div>

            <div className="pt-4 border-t border-slate-800/80 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Position Active :</span>
                <span className={`font-bold ${openPosition ? (openPosition.type === 'BUY' ? 'text-emerald-400' : 'text-rose-400') : 'text-slate-400'}`}>
                  {openPosition ? `${openPosition.type} (${openPosition.lot} lot)` : 'AUCUNE'}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">PnL Flottant :</span>
                <span className={`font-mono font-bold ${currentPnL >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {currentPnL >= 0 ? '+$' : '-$'}{Math.abs(currentPnL).toFixed(2)}
                </span>
              </div>
              <button 
                onClick={closePosition}
                disabled={!openPosition}
                className={`w-full py-2.5 font-bold text-xs rounded-xl transition ${openPosition ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}>
                Clôturer la Position
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </main>

  <footer className="max-w-7xl mx-auto px-4 py-8 border-t border-slate-900 text-center text-slate-600 text-xs">
    © 2026 Vanguard Prop Firm. Plateforme institutionnelle de simulation d'évaluation.
  </footer>
</div>

```

);
}