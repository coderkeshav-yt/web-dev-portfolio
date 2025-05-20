import React, { Suspense } from 'react'
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from 'sonner'
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import Index from "./pages/Index"
import GuestBook from "./pages/GuestBook"
import BucketList from "./pages/BucketList"
import Links from "./pages/Links"
import NotFound from "./pages/NotFound"
import PageTransition from "./components/PageTransition"
import LoadingSpinner from "./components/LoadingSpinner"
import PageLoadingIndicator from "./components/PageLoadingIndicator"
import Navbar from "./components/Navbar"
import { usePageLoading } from "./hooks/use-page-loading"
import ScrollToTop from "./components/ScrollToTop"
import { useNavigationShortcuts } from "./hooks/use-navigation-shortcuts"

const queryClient = new QueryClient()

const AppRoutes = () => {
  const location = useLocation();
  const isLoading = usePageLoading();
  
  // Initialize navigation shortcuts
  useNavigationShortcuts();
  
  return (
    <>
      <ScrollToTop />
      <AnimatePresence>
        {isLoading && <PageLoadingIndicator />}
      </AnimatePresence>
      
      <Navbar />
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Index />} />
            <Route path="/guest-book" element={<GuestBook />} />
            <Route path="/bucket-list" element={<BucketList />} />
            <Route path="/links" element={<Links />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </AnimatePresence>
    </>
  );
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <TooltipProvider>
            <Suspense fallback={<LoadingSpinner />}>
              <Sonner
                position="top-right"
                richColors
                theme="dark"
                toastOptions={{
                  unstyled: true,
                  classNames: {
                    toast: "group transform-gpu relative flex w-full bg-slate-800/95 text-slate-200 rounded-lg p-4 shadow-lg shadow-black/50 border border-slate-700/50 backdrop-blur-sm transition-all duration-300 ease-out data-[swipe=move]:transition-none data-[swipe=cancel]:transition-none hover:shadow-violet-500/10",
                    title: "text-base font-semibold mb-1",
                    description: "text-sm text-slate-400 line-clamp-2",
                    loader: "hidden",
                    closeButton: "absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-md p-1 text-slate-400 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-800",
                    actionButton: "ml-auto pl-4",
                  },
                  style: {
                    scale: 1,
                    y: 0,
                    filter: 'none'
                  } as React.CSSProperties,
                }}
              />
              <AppRoutes />
            </Suspense>
          </TooltipProvider>
        </Router>
      </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App
