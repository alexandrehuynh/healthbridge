import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/hooks/use-language";
import ErrorBoundary from "@/components/error-boundary";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Wizard from "@/pages/wizard";
import Results from "@/pages/results";
import Resources from "@/pages/resources";
import Help from "@/pages/help";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";

function Router() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <ErrorBoundary>
          <Switch>
            <Route path="/" component={Landing} />
            <Route path="/wizard">
              <ErrorBoundary>
                <Wizard />
              </ErrorBoundary>
            </Route>
            <Route path="/assessment">
              <ErrorBoundary>
                <Wizard />
              </ErrorBoundary>
            </Route>
            <Route path="/results">
              <ErrorBoundary>
                <Results />
              </ErrorBoundary>
            </Route>
            <Route path="/resources" component={Resources} />
            <Route path="/help" component={Help} />
            <Route component={NotFound} />
          </Switch>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Router />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
