import { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const NotFound = lazy(() => import('./pages/NotFound'));
const OwnerInsights = lazy(() => import('./pages/OwnerInsights'));
const JamesFurrington = lazy(() => import('./pages/JamesFurrington'));
const AlternateEnding = lazy(() => import('./pages/AlternateEnding'));
const LphRedirect = lazy(() => import('./pages/LphRedirect'));
const AlternateEndingsIndex = lazy(() => import('./pages/AlternateEndingsIndex'));
const SignedCopy = lazy(() => import('./pages/SignedCopy'));
const SignedCopyStory = lazy(() => import('./pages/SignedCopyStory'));
import { HelmetProvider } from 'react-helmet-async';

const StartHere = lazy(() => import('./pages/StartHere'));
const Books = lazy(() => import('./pages/Books'));
const Wiki = lazy(() => import('./pages/Wiki'));
const Characters = lazy(() => import('./pages/Characters'));
const Reviews = lazy(() => import('./pages/Reviews'));
const World = lazy(() => import('./pages/World'));
const Author = lazy(() => import('./pages/Author'));
const Media = lazy(() => import('./pages/Media'));
const Shop = lazy(() => import('./pages/Shop'));
const OtherBooks = lazy(() => import('./pages/OtherBooks'));
import ScrollToHash from './components/ScrollToHash';
import InstagramExitPopup from './components/InstagramExitPopup';
import WhatsAppChatButton from './components/WhatsAppChatButton';

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToHash />
        <InstagramExitPopup />
        <WhatsAppChatButton />
        <Suspense fallback={<div className="min-h-screen bg-background" aria-busy="true" />}><Routes>
          <Route path="/" element={<Index />} />
          <Route path="/start-here" element={<StartHere />} />
          <Route path="/books" element={<Books />} />
          <Route path="/wiki" element={<Wiki />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/world" element={<World />} />
          <Route path="/author" element={<Author />} />
          <Route path="/media" element={<Media />} />
          <Route path="/other-books" element={<OtherBooks />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/signed-copy" element={<SignedCopy />} />
          <Route path="/signed-copy-story" element={<SignedCopyStory />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/james-furrington" element={<JamesFurrington />} />
          <Route path="/lph" element={<AlternateEndingsIndex />} />
          <Route path="/lph/alternate-endings" element={<AlternateEndingsIndex />} />
          <Route path="/lph/alternate-endings/:storySlug" element={<AlternateEndingsIndex />} />
          <Route path="/lph/alternate-endings/:storySlug/:endingSlug" element={<AlternateEnding />} />
          <Route path="/lph/*" element={<LphRedirect />} />
          <Route path="/owner/insights" element={<OwnerInsights />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes></Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
