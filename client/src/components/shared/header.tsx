import { Link, useLocation } from 'wouter';
import { Clover, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Resources', href: '/resources' },
    { name: 'Help', href: '#' },
    { name: 'Français', href: '#' },
  ];

  return (
    <header className="bg-white shadow-sm border-t-4 border-canadian-red sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-canadian-red rounded flex items-center justify-center">
              <Clover className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">HealthBridge</h1>
              <p className="text-xs text-gray-600">Navigate Your Healthcare Coverage</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-8 h-8 bg-canadian-red rounded flex items-center justify-center">
                    <Clover className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">HealthBridge</h2>
                  </div>
                </div>
                <nav className="space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block text-gray-600 hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
