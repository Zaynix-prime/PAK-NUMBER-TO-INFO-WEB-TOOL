import { useState, useEffect, useCallback, useRef } from 'react';
import FloatingBackground from '@/components/FloatingBackground';
import Header from '@/components/Header';
import SearchBox from '@/components/SearchBox';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import MessageAlert from '@/components/MessageAlert';
import ResultsDisplay from '@/components/ResultsDisplay';
import SearchHistory from '@/components/SearchHistory';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';

interface Result {
  mobile?: string;
  name?: string;
  cnic?: string;
  address?: string;
}

interface HistoryItem {
  value: string;
  type: 'sim' | 'cnic';
  timestamp: number;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [searchType, setSearchType] = useState<'sim' | 'cnic'>('sim');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Client-side cache
  const cacheRef = useRef<Map<string, { data: Result[]; timestamp: number }>>(new Map());
  const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const addToHistory = useCallback((value: string, type: 'sim' | 'cnic') => {
    setHistory(prev => {
      const filtered = prev.filter(item => !(item.value === value && item.type === type));
      const newHistory = [{ value, type, timestamp: Date.now() }, ...filtered].slice(0, 20);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      return newHistory;
    });
  }, []);

  const clearHistory = useCallback(() => {
    localStorage.removeItem('searchHistory');
    setHistory([]);
  }, []);

  const handleSearch = async (query: string) => {
    if (query.length < 10) {
      setMessage({ text: 'Please enter a valid 10-digit mobile number or 13-digit CNIC number', type: 'error' });
      return;
    }

    const type = query.length === 10 ? 'sim' : 'cnic';
    setSearchType(type);
    setSearchQuery(query);
    addToHistory(query, type);

    // Prepend 92 if it's a 10-digit number to match API format
    const formattedQuery = query.length === 10 ? `92${query}` : query;

    // Check client-side cache first
    const cached = cacheRef.current.get(formattedQuery);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      setResults(cached.data);
      setMessage({ text: `Found ${cached.data.length} result(s) (cached)`, type: 'success' });
      return;
    }

    setIsLoading(true);
    setMessage(null);
    setResults([]);

    try {
      // Call our edge function proxy
      const response = await fetch(
        `https://jxiodnstzwvgatylzhqi.supabase.co/functions/v1/lookup?query=${formattedQuery}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const responseData = await response.json();
      console.log('API Response:', responseData);

      // Handle the actual API response structure
      if (responseData.results && responseData.results.length > 0) {
        console.log('First result:', responseData.results[0]);
        
        // Use the API response directly - keep original field names
        const mappedResults = responseData.results.map((item: any) => ({
          mobile: item.mobile,
          name: item.name,
          cnic: item.cnic,
          address: item.address
        }));
        
        console.log('Mapped results:', mappedResults);
        
        // Cache the results
        cacheRef.current.set(formattedQuery, { data: mappedResults, timestamp: Date.now() });
        
        setResults(mappedResults);
        setMessage({ text: `Found ${responseData.results_count || responseData.results.length} result(s)`, type: 'success' });
      } else if (responseData.error) {
        setMessage({ text: responseData.error, type: 'error' });
      } else {
        setMessage({ text: 'No records found for the provided information', type: 'error' });
      }
    } catch (error) {
      console.error('Search error:', error);
      setMessage({ text: 'Network error. Please check your connection and try again.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistorySelect = (value: string) => {
    handleSearch(value);
  };

  return (
    <div className="min-h-screen relative">
      <FloatingBackground />
      
      <Header />
      
      <main className="max-w-5xl mx-auto px-5 pb-12 relative z-10">
        <div className="glass-card p-6 sm:p-10 relative overflow-hidden">
          {/* Shimmer bar at top */}
          <div className="absolute top-0 left-0 right-0 h-1 shimmer-bar" />
          
          <SearchBox onSearch={handleSearch} isLoading={isLoading} />
          
          {isLoading && <LoadingSkeleton />}
          
          {message && <MessageAlert message={message.text} type={message.type} />}
          
          {results.length > 0 && (
            <ResultsDisplay results={results} searchType={searchType} />
          )}
        </div>
        
        <SearchHistory 
          history={history} 
          onSelect={handleHistorySelect} 
          onClear={clearHistory} 
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
