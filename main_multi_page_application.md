import React, { useState } from 'react';
import { 
  Shield, TrendingUp, Award, DollarSign, Wallet, ArrowRight, CheckCircle2, 
  HelpCircle, ChevronDown, Activity, User, BarChart3, Lock, Zap, PieChart, 
  Globe, Menu, X, RefreshCw, AlertTriangle
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAccountSize, setSelectedAccountSize] = useState('10k');
  const [challengeType, setChallengeType] = useState('2step');

  const navLinks = [
    { id: 'home', label: 'Accueil' },
    { id: 'challenges', label: 'Programmes & Tarifs' },
    { id: 'dashboard', label: 'Espace Client (Demo)' },
    { id: 'rules', label: 'Règles & FAQ' },
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* NAVBAR INSTITUTIONNELLE */}
      <header className="sticky top-0 z-50 bg-[#07090e]/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* LOGO */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-700 flex items-center justify-center shadow-glow">
                <Shield className="h-6 w-6 text-black font-bold" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent">
                  VANGUARD
                </span>
                <span className="text-[10px] tracking-widest text-emerald-400 font-semibold -mt-1">
                  PROP CAPITAL
                </span>
              </div>
            </div>

            {/* NAV NAVIGATION (DESKTOP) */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`text-sm font-medium transition-all duration-200 ${
                    activeTab === link.id
                      ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400 py-1'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* ACTIONS CTA */}
            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={() => setActiveTab('dashboard')} 
                className="text-xs font-semibold px-4 py-2.5 rounded-lg border border-slate-700 hover:border-slate-500 transition-all text-slate-300"
              >
                Connexion
              </button>
              <button 
                onClick={() => setActiveTab('challenges')} 
                className="text-xs font-bold px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black shadow-glow transition-all flex items-center gap-2"
              >
                Commencer le Challenge <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* MOBILE MENU TOGGLE */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-400 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0c1017] border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => { setActiveTab(link.id); setMobileMenuOpen(false); }}
                className="block w-full text-left py-2 text-sm text-slate-300 font-medium border-b border-slate-800/50"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <button 
                onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }} 
                className="w-full text-center py-2.5 rounded-lg border border-slate-700 text-sm font-semibold"
              >
                Connexion
              </button>
              <button 
                onClick={() => { setActiveTab('challenges'); setMobileMenuOpen(false); }} 
                className="w-full text-center py-2.5 rounded-lg bg-emerald-500 text-black font-bold text-sm shadow-glow"
              >
                Commencer le Challenge
              </button>
            </div>
          </div>
        )}
      </header>

      {/* RENDER DYNAMIC PAGE CONTENT */}
      <main>
        {activeTab === 'home' && <HomePage setActiveTab={setActiveTab} setSelectedAccountSize={setSelectedAccountSize} />}
        {activeTab === 'challenges' && <ChallengesPage accountSize={selectedAccountSize} setAccountSize={setSelectedAccountSize} challengeType={challengeType} setChallengeType={setChallengeType} />}
        {activeTab === 'dashboard' && <DashboardPage />}
        {activeTab === 'rules' && <RulesPage />}
      </main>

      {/* FOOTER INSTITUTIONNEL */}
      <footer className="bg-[#040609] border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/60">
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-black font-bold" />
                </div>
                <span className="text-lg font-bold text-white tracking-wider">VANGUARD</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Plateforme d'évaluation et de financement pour traders indépendants. Obtenez jusqu'à 200,000$ de capital géré avec un partage de profit jusqu'à 90%.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Programmes</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#" onClick={(e)=>{e.preventDefault(); setActiveTab('challenges');}} className="hover:text-emerald-400 transition-colors">Challenge Micro (200$)</a></li>
                <li><a href="#" onClick={(e)=>{e.preventDefault(); setActiveTab('challenges');}} className="hover:text-emerald-400 transition-colors">Évaluation 2-Steps</a></li>
                <li><a href="#" onClick={(e)=>{e.preventDefault(); setActiveTab('challenges');}} className="hover:text-emerald-400 transition-colors">Financement Instantané</a></li>
                <li><a href="#" onClick={(e)=>{e.preventDefault(); setActiveTab('rules');}} className="hover:text-emerald-400 transition-colors">Plan de Scaling</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Paiements & Crypto</h4>
              <p className="text-xs text-slate-400 mb-3">Méthodes instantanées supportées :</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 bg-slate-800 rounded border border-slate-700 text-[11px] text-emerald-400 font-mono">USDT (TRC20/ERC20)</span>
                <span className="px-2.5 py-1 bg-slate-800 rounded border border-slate-700 text-[11px] text-amber-400 font-mono">BTC</span>
                <span className="px-2.5 py-1 bg-slate-800 rounded border border-slate-700 text-[11px] text-blue-400 font-mono">Mobile Money</span>
                <span className="px-2.5 py-1 bg-slate-800 rounded border border-slate-700 text-[11px] text-slate-300 font-mono">Carte Visa/Mastercard</span>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Légal & Risque</h4>
              <p className="text-[11px] leading-relaxed text-slate-500">
                Avertissement sur les risques : Les services proposés incluent des comptes de démonstration pour évaluer les compétences de trading. Aucun dépôt de fonds réels de la part des utilisateurs n'est requis sur le marché réel avant qualification.
              </p>
            </div>

          </div>

          <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
            <p>© 2026 Vanguard Prop Capital Ltd. Tous droits réservés.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-300">Conditions Générales</a>
              <a href="#" className="hover:text-slate-300">Politique de Confidentialité</a>
              <a href="#" className="hover:text-slate-300">Règles d'Exécution</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

{/* ========================================== */}
{/* PAGE 1: HOME PAGE                          */}
{/* ========================================== */}
function HomePage({ setActiveTab, setSelectedAccountSize }) {
  return (
    <div className="space-y-24 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 md:pt-28 md:pb-32 overflow-hidden border-b border-slate-800/40">
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-8 animate-pulse">
            <Zap className="w-3.5 h-3.5" />
            <span>Nouveau : Challenge Starter accessible dès $200 de Capital</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-5xl mx-auto">
            Montrez Vos Compétences.<br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
              Tradez Jusqu'à $200,000.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Rejoignez l'élite des traders indépendants. Évaluez votre discipline sur nos comptes démo et conservez jusqu'à **90% des profits réels**.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button 
              onClick={() => setActiveTab('challenges')} 
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-base shadow-glow transition-all flex items-center justify-center gap-2"
            >
              Obtenir un Compte Foncier <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActiveTab('rules')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 font-bold text-base transition-all"
            >
              Voir le Règlement
            </button>
          </div>

          {/* METRIQUES CLÉS */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: "Partage de Profits", value: "Jusqu'à 90%" },
              { label: "Paiements Traités", value: "< 24 Heures" },
              { label: "Effet de Levier", value: "Jusqu'à 1:100" },
              { label: "Seuil de Drawdown", value: "10% Max" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-[#0e131f]/60 backdrop-blur border border-slate-800/80 p-5 rounded-2xl text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{stat.value}</div>
                <div className="text-xs text-slate-400 font-medium mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* POURQUOI VANGUARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-extrabold tracking-widest text-emerald-400 uppercase">La Différence Vanguard</h2>
          <p className="mt-2 text-3xl font-extrabold text-white">Une Prop Firm Conçue Par Et Pour Des Traders</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Wallet className="w-8 h-8 text-emerald-400" />,
              title: "Retraits Instantanés",
              desc: "Recevez vos gains par USDT, Mobile Money ou Virement en moins de 24h une fois la période de validation franchie."
            },
            {
              icon: <BarChart3 className="w-8 h-8 text-amber-400" />,
              title: "Pas de Limite de Temps",
              desc: "Prenez tout votre temps pour réussir vos phases d'évaluation sans aucun stress d'expiration."
            },
            {
              icon: <Shield className="w-8 h-8 text-blue-400" />,
              title: "Slippage Réduit & Spreads Fins",
              desc: "Bénéficiez des conditions d'exécution de niveau institutionnel sur l'Or (XAUUSD), les devises et les indices."
            }
          ].map((item, i) => (
            <div key={i} className="bg-[#0d121d] border border-slate-800 p-8 rounded-2xl hover:border-slate-700 transition-all">
              <div className="p-3 bg-slate-900/80 rounded-xl w-fit border border-slate-800 mb-6">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FAST SELECTOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-950/40 via-[#0d1320] to-slate-900 border border-emerald-500/30 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">Prêt à Passer à l'Étape Supérieure ?</h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8">
            Choisissez la taille de capital qui vous convient et débloquez vos accès immédiatement.
          </p>
          <button 
            onClick={() => setActiveTab('challenges')} 
            className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold rounded-xl shadow-glow transition-all"
          >
            Consulter la Grille des Tarifs
          </button>
        </div>
      </section>

    </div>
  );
}

{/* ========================================== */}
{/* PAGE 2: CHALLENGES & PRICING               */}
{/* ========================================== */}
function ChallengesPage({ accountSize, setAccountSize, challengeType, setChallengeType }) {
  
  const accounts = {
    '200': { price: '$15', profitTarget: '$16 (8%)', dailyLoss: '$10 (5%)', maxLoss: '$20 (10%)', leverage: '1:100' },
    '5k': { price: '$49', profitTarget: '$400 (8%)', dailyLoss: '$250 (5%)', maxLoss: '$500 (10%)', leverage: '1:100' },
    '10k': { price: '$89', profitTarget: '$800 (8%)', dailyLoss: '$500 (5%)', maxLoss: '$1,000 (10%)', leverage: '1:100' },
    '25k': { price: '$199', profitTarget: '$2,000 (8%)', dailyLoss: '$1,250 (5%)', maxLoss: '$2,500 (10%)', leverage: '1:100' },
    '50k': { price: '$329', profitTarget: '$4,000 (8%)', dailyLoss: '$2,500 (5%)', maxLoss: '$5,000 (10%)', leverage: '1:100' },
    '100k': { price: '$549', profitTarget: '$8,000 (8%)', dailyLoss: '$5,000 (5%)', maxLoss: '$10,000 (10%)', leverage: '1:100' },
  };

  const selected = accounts[accountSize] || accounts['10k'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">Choisissez Votre Capital</h1>
        <p className="mt-4 text-slate-400 text-sm sm:text-base">
          Des frais d'évaluation 100% remboursables lors de votre premier retrait de profit.
        </p>
      </div>

      {/* SELECTEUR DU TAILLE DE COMPTE */}
      <div className="flex flex-wrap justify-center gap-3">
        {[
          { key: '200', label: '$200 (Starter)' },
          { key: '5k', label: '$5,000' },
          { key: '10k', label: '$10,000' },
          { key: '25k', label: '$25,000' },
          { key: '50k', label: '$50,000' },
          { key: '100k', label: '$100,000' },
        ].map((acc) => (
          <button
            key={acc.key}
            onClick={() => setAccountSize(acc.key)}
            className={`px-5 py-3 rounded-xl text-sm font-bold transition-all border ${
              accountSize === acc.key
                ? 'bg-emerald-500 text-black border-emerald-400 shadow-glow'
                : 'bg-[#0d121d] text-slate-300 border-slate-800 hover:border-slate-600'
            }`}
          >
            {acc.label}
          </button>
        ))}
      </div>

      {/* CARTE DE DETAIL DU CHALLENGE */}
      <div className="max-w-4xl mx-auto bg-[#0c1017] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-8 border-b border-slate-800 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase text-emerald-400 tracking-wider">Évaluation Standard 2-Phase</span>
            <h3 className="text-3xl font-extrabold text-white mt-1">Compte {accountSize === '200' ? '$200 Starter' : `$${accountSize.toUpperCase()}`}</h3>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-400 block">Frais d'inscription unique</span>
            <span className="text-3xl font-extrabold text-emerald-400 font-mono">{selected.price}</span>
          </div>
        </div>

        {/* RECAPITULATIF DES REGLES COMPTE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8 border-b border-slate-800">
          <div className="bg-[#121824] p-4 rounded-xl border border-slate-800/80">
            <span className="text-xs text-slate-400 block mb-1">Objectif de Gain (Phase 1)</span>
            <span className="text-lg font-bold text-white font-mono">{selected.profitTarget}</span>
          </div>
          <div className="bg-[#121824] p-4 rounded-xl border border-slate-800/80">
            <span className="text-xs text-slate-400 block mb-1">Perte Max Quotidienne</span>
            <span className="text-lg font-bold text-rose-400 font-mono">{selected.dailyLoss}</span>
          </div>
          <div className="bg-[#121824] p-4 rounded-xl border border-slate-800/80">
            <span className="text-xs text-slate-400 block mb-1">Perte Max Totale</span>
            <span className="text-lg font-bold text-rose-500 font-mono">{selected.maxLoss}</span>
          </div>
          <div className="bg-[#121824] p-4 rounded-xl border border-slate-800/80">
            <span className="text-xs text-slate-400 block mb-1">Levier Autorisé</span>
            <span className="text-lg font-bold text-emerald-400 font-mono">{selected.leverage}</span>
          </div>
        </div>

        {/* ENGAGEMENTS */}
        <div className="py-6 space-y-3">
          {[
            "Jours de trading minimum : 0 Jour (Passez dès aujourd'hui)",
            "Trading du week-end et des news économiques autorisés",
            "Expert Advisors (EA) et Robots autorisés",
            "Remboursement à 100% des frais au 1er paiement"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* ACHAT CTAS */}
        <div className="pt-6">
          <button className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-base shadow-glow transition-all flex items-center justify-center gap-2">
            Payer {selected.price} via Crypto / Mobile Money <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>

    </div>
  );
}

{/* ========================================== */}
{/* PAGE 3: DASHBOARD DEMO                     */}
{/* ========================================== */}
function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* COMPTE BANNER */}
      <div className="bg-[#0c1017] border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-white">Compte #VG-884920</h1>
            <span className="px-3 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
              PHASE 1 EN COURS
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">MT5 Server: VanguardCapital-Live • Modèle: $10,000 Evaluation</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg text-slate-200 flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5" /> Mettre à jour
          </button>
          <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-xs font-bold rounded-lg text-black">
            Demander un Retrait
          </button>
        </div>
      </div>

      {/* METRIQUES DE SOLDE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0c1017] border border-slate-800 p-6 rounded-2xl">
          <span className="text-xs text-slate-400 font-semibold block mb-2">Solde Actuel</span>
          <div className="text-3xl font-extrabold text-white font-mono">$10,480.50</div>
          <span className="text-xs text-emerald-400 font-semibold mt-2 inline-block">+ $480.50 (+4.8%)</span>
        </div>

        <div className="bg-[#0c1017] border border-slate-800 p-6 rounded-2xl">
          <span className="text-xs text-slate-400 font-semibold block mb-2">Objectif de Profit ($800)</span>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">60.1%</div>
          <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-400 h-full w-[60%]"></div>
          </div>
        </div>

        <div className="bg-[#0c1017] border border-slate-800 p-6 rounded-2xl">
          <span className="text-xs text-slate-400 font-semibold block mb-2">Limite Drawdown Quotidien</span>
          <div className="text-3xl font-extrabold text-slate-200 font-mono">$210 / $500</div>
          <span className="text-xs text-slate-400 mt-2 inline-block">Marge restante : $290.00</span>
        </div>
      </div>

      {/* HISTORIQUE DE TRADES SIMULÉ */}
      <div className="bg-[#0c1017] border border-slate-800 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Dernières Positions Validées</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#121824] text-slate-400 uppercase font-mono border-b border-slate-800">
              <tr>
                <th className="p-3">Actif</th>
                <th className="p-3">Type</th>
                <th className="p-3">Taille</th>
                <th className="p-3">Prix Entrée</th>
                <th className="p-3">Prix Sortie</th>
                <th className="p-3 text-right">Profit / Perte</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              <tr>
                <td className="p-3 font-bold text-white">XAUUSD.s</td>
                <td className="p-3 text-emerald-400 font-bold">BUY</td>
                <td className="p-3">0.50 Lot</td>
                <td className="p-3">2,650.10</td>
                <td className="p-3">2,658.40</td>
                <td className="p-3 text-right font-bold text-emerald-400">+$415.00</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">EURUSD</td>
                <td className="p-3 text-rose-400 font-bold">SELL</td>
                <td className="p-3">1.00 Lot</td>
                <td className="p-3">1.0850</td>
                <td className="p-3">1.0835</td>
                <td className="p-3 text-right font-bold text-emerald-400">+$150.00</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">BTCUSD</td>
                <td className="p-3 text-emerald-400 font-bold">BUY</td>
                <td className="p-3">0.10 Lot</td>
                <td className="p-3">67,200.00</td>
                <td className="p-3">66,350.00</td>
                <td className="p-3 text-right font-bold text-rose-400">-$85.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

{/* ========================================== */}
{/* PAGE 4: FAQ & RULES                        */}
{/* ========================================== */}
function RulesPage() {
  const faqs = [
    {
      q: "Comment fonctionne le challenge à $200 (Starter) ?",
      a: "C'est un format spécialement conçu pour permettre aux traders à petit budget d'accéder au monde des prop firms. Pour seulement $15 de frais, vous gérez un compte de $200 avec les mêmes règles strictes que les grands comptes."
    },
    {
      q: "Quelles sont les méthodes de paiement acceptées ?",
      a: "Nous acceptons les cryptomonnaies (USDT TRC20/ERC20, Bitcoin) ainsi que les solutions Mobile Money locales et cartes bancaires."
    },
    {
      q: "Y a-t-il une limite de temps pour réussir l'évaluation ?",
      a: "Non. Aucune limite de temps. Vous pouvez prendre des jours ou des mois pour atteindre l'objectif de 8% sans aucune pression."
    },
    {
      q: "Quels sont les instruments négociables ?",
      a: "Vous pouvez trader toutes les paires Forex, le Gold (XAUUSD), le pétrole, les indices boursiers (US30, NAS100) et les principales cryptomonnaies."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">Règles & Questions Fréquentes</h1>
        <p className="mt-3 text-slate-400 text-sm">Transparence totale. Pas de frais cachés, pas de règles piégées.</p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-[#0c1017] border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              {faq.q}
            </h3>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed pl-8">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}