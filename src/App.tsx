import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import OwnerInsights from "./pages/OwnerInsights";
import JamesFurrington from "./pages/JamesFurrington";
import AlternateEnding from "./pages/AlternateEnding";
import AlternateEndingsIndex from "./pages/AlternateEndingsIndex";
import SignedCopy from "./pages/SignedCopy";
import { HelmetProvider } from 'react-helmet-async';

import Books from './pages/Books';
import Wiki from './pages/Wiki';
import Characters from './pages/Characters';
import Reviews from './pages/Reviews';
import World from './pages/World';
import Author from './pages/Author';
import Media from './pages/Media';
import Shop from './pages/Shop';
import ScrollToHash from './components/ScrollToHash';

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/books" element={<Books />} />
          <Route path="/wiki" element={<Wiki />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/world" element={<World />} />
          <Route path="/author" element={<Author />} />
          <Route path="/media" element={<Media />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/signed-copy" element={<SignedCopy />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/james-furrington" element={<JamesFurrington />} />
          <Route path="/lph" element={<AlternateEndingsIndex />} />
          <Route path="/lph/alternate-endings" element={<AlternateEndingsIndex />} />
          <Route path="/lph/alternate-endings/:storySlug" element={<AlternateEndingsIndex />} />
          <Route path="/lph/alternate-endings/:storySlug/:endingSlug" element={<AlternateEnding />} />
          <Route path="/owner/insights" element={<OwnerInsights />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
