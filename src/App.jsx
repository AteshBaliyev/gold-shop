import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AccountsTab from './components/AccountsTab';
import DiamondTab from './components/DiamondTab';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import AccountModal from './components/AccountModal';
import CheckoutModal from './components/CheckoutModal';
import SellAccountModal from './components/SellAccountModal';
import Footer from './components/Footer';
import { INITIAL_ACCOUNTS } from './data/mockData';
import { 
  subscribeAccounts, 
  saveAccountToFirebase, 
  deleteAccountFromFirebase 
} from './services/firebaseService';

export default function App() {
  // Navigation / Routing State: Detects /admin or /
  const [currentPath, setCurrentPath] = useState(() => {
    return window.location.pathname || '/';
  });

  // Admin authentication (password: admin2008)
  const [isAdminAuth, setIsAdminAuth] = useState(() => {
    return sessionStorage.getItem('gold_admin_auth') === 'true' || sessionStorage.getItem('alit_admin_auth') === 'true';
  });

  // Active Tab for Store ('accounts' | 'diamonds')
  const [activeTab, setActiveTab] = useState('accounts');

  // Firebase Real-time Connection State
  const [isFirebaseLive, setIsFirebaseLive] = useState(false);

  // Persistent Accounts in LocalStorage & Firestore
  const [accounts, setAccounts] = useState(() => {
    const saved = localStorage.getItem('gold_shop_accounts') || localStorage.getItem('alit_shop_accounts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error('LocalStorage parsing error:', e);
      }
    }
    return INITIAL_ACCOUNTS;
  });

  const [selectedAccountForModal, setSelectedAccountForModal] = useState(null);
  const [checkoutOrder, setCheckoutOrder] = useState(null);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  // Real-time Firebase Firestore Sync on Mount
  useEffect(() => {
    const unsubscribe = subscribeAccounts(
      (firebaseAccounts, isLive) => {
        if (firebaseAccounts && firebaseAccounts.length > 0) {
          setAccounts(firebaseAccounts);
          setIsFirebaseLive(isLive);
        }
      },
      (error) => {
        console.warn('Firebase bağlantısı gözlənilir və ya offline rejimdədir:', error);
        setIsFirebaseLive(false);
      }
    );

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  // Sync accounts to localStorage whenever accounts change (Cache / Offline Fallback)
  useEffect(() => {
    localStorage.setItem('gold_shop_accounts', JSON.stringify(accounts));
  }, [accounts]);

  // Listen for browser URL changes (e.g. back/forward button or URL changes)
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Programmatic navigation helper
  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle adding new account from Admin (Syncs to Firebase Cloud & Local State)
  const handleAddAccount = async (newAccount) => {
    setAccounts((prev) => [newAccount, ...prev]);
    try {
      await saveAccountToFirebase(newAccount);
    } catch (err) {
      console.warn('Firebase-ə yazılarkən xəta (lokal saxlanıldı):', err);
    }
  };

  // Handle deleting account from Admin (Syncs to Firebase Cloud & Local State)
  const handleDeleteAccount = async (id) => {
    setAccounts((prev) => prev.filter((acc) => acc.id !== id));
    try {
      await deleteAccountFromFirebase(id);
    } catch (err) {
      console.warn('Firebase-dən silinərkən xəta (lokal silindi):', err);
    }
  };

  // Handle updating account from Admin (Syncs to Firebase Cloud & Local State)
  const handleUpdateAccount = async (updatedAccount) => {
    setAccounts((prev) =>
      prev.map((acc) => (acc.id === updatedAccount.id ? updatedAccount : acc))
    );
    try {
      await saveAccountToFirebase(updatedAccount);
    } catch (err) {
      console.warn('Firebase-də yenilənərkən xəta (lokal yeniləndi):', err);
    }
  };

  // Handle buying account (WhatsApp redirect is primary, but keeps modal ready if needed)
  const handleBuyAccount = (account) => {
    setCheckoutOrder({
      type: 'account',
      account
    });
  };

  // Handle diamond top-up order
  const handleDiamondOrder = (orderPayload) => {
    setCheckoutOrder({
      type: 'diamond',
      ...orderPayload
    });
  };

  // Check if current route is /admin
  const isAdminRoute = currentPath.startsWith('/admin');

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black">
      
      {/* If on /admin URL */}
      {isAdminRoute ? (
        <div className="min-h-screen flex flex-col bg-[#0B0F17]">
          {/* Admin Header Minimal Banner */}
          <div className="border-b border-slate-800 bg-slate-950/80 px-6 py-3.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <span className="font-bold text-white tracking-tight text-sm">Gold Shop</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400 font-mono text-[11px]">/admin sistemi</span>
            </div>
            <button
              onClick={() => navigate('/')}
              className="text-amber-500 hover:text-white font-semibold transition-colors cursor-pointer"
            >
              ← Sayta Qayıt (Mağaza)
            </button>
          </div>

          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {!isAdminAuth ? (
              <AdminLogin
                onLoginSuccess={() => {
                  sessionStorage.setItem('gold_admin_auth', 'true');
                  setIsAdminAuth(true);
                }}
                onReturnToSite={() => navigate('/')}
              />
            ) : (
              <AdminPanel
                accounts={accounts}
                onAddAccount={handleAddAccount}
                onUpdateAccount={handleUpdateAccount}
                onDeleteAccount={handleDeleteAccount}
                onReturnToSite={() => navigate('/')}
                onLogout={() => {
                  sessionStorage.removeItem('gold_admin_auth');
                  sessionStorage.removeItem('alit_admin_auth');
                  setIsAdminAuth(false);
                  navigate('/');
                }}
                isFirebaseLive={isFirebaseLive}
              />
            )}
          </main>
        </div>
      ) : (
        /* Regular Storefront (/) */
        <>
          {/* Navigation Header (Admin düyməsi yoxdur, yalnız Hesablar və Elmas Yüklə) */}
          <Header 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            accountsCount={accounts.length} 
          />

          {/* Main Content Area - SPA Tab Switching without Page Reload */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-16">
            {activeTab === 'accounts' && (
              <AccountsTab
                accounts={accounts}
                onSelectAccount={(account) => setSelectedAccountForModal(account)}
                onBuyAccount={handleBuyAccount}
                onOpenSellModal={() => setIsSellModalOpen(true)}
              />
            )}

            {activeTab === 'diamonds' && (
              <DiamondTab
                onCompleteDiamondOrder={handleDiamondOrder}
              />
            )}
          </main>

          {/* Account Details Modal */}
          {selectedAccountForModal && (
            <AccountModal
              account={selectedAccountForModal}
              onClose={() => setSelectedAccountForModal(null)}
              onBuy={handleBuyAccount}
            />
          )}

          {/* Checkout / Order Confirmation Modal */}
          {checkoutOrder && (
            <CheckoutModal
              orderData={checkoutOrder}
              onClose={() => setCheckoutOrder(null)}
            />
          )}

          {/* Sell Your Account Modal */}
          {isSellModalOpen && (
            <SellAccountModal
              isOpen={isSellModalOpen}
              onClose={() => setIsSellModalOpen(false)}
            />
          )}

          {/* Footer */}
          <Footer setActiveTab={setActiveTab} />
        </>
      )}

    </div>
  );
}
