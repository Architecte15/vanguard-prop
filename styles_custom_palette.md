@tailwind base;
@tailwind components;
@tailwind utilities;

/* Configuration des couleurs et néons personnalisés */
:root {
  --bg-dark: #07090e;
  --bg-card: #0f1420;
  --border-color: rgba(30, 41, 59, 0.8);
  --accent-emerald: #10b981;
  --accent-gold: #f59e0b;
  --accent-rose: #f43f5e;
}

body {
  background-color: var(--bg-dark);
  color: #f8fafc;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Glassmorphism */
.glass-panel {
  background: rgba(15, 20, 32, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-color);
}

.glass-panel-glow {
  background: rgba(15, 20, 32, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(16, 185, 129, 0.3);
  box-shadow: 0 0 30px -10px rgba(16, 185, 129, 0.15);
}

/* Animations de bordure pour les offres */
.border-gradient-gold {
  border: 1px solid rgba(245, 158, 11, 0.4);
  box-shadow: 0 0 25px -5px rgba(245, 158, 11, 0.15);
}