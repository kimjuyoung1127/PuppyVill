import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";

// Pages
import Home from "@/pages/Home";
import Programs from "@/pages/Programs";
import Schedule from "@/pages/Schedule";
import Gallery from "@/pages/Gallery";
import Pricing from "@/pages/Pricing";
import Grooming from "@/pages/Grooming";
import Cafe from "@/pages/Cafe";
import Admission from "@/pages/Admission";
import FAQ from "@/pages/FAQ";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";

// Components
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function Router() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F5]">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/programs" component={Programs} />
          <Route path="/schedule" component={Schedule} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/grooming" component={Grooming} />
          <Route path="/cafe" component={Cafe} />
          <Route path="/admission" component={Admission} />
          <Route path="/faq" component={FAQ} />
          <Route path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
