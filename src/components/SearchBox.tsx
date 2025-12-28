import { Search } from 'lucide-react';
import { useState } from 'react';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchBox = ({ onSearch, isLoading }: SearchBoxProps) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 13);
    setQuery(value);
  };

  const handleSearch = () => {
    if (query.length >= 10) {
      onSearch(query);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="mb-10">
      <h2 className="text-center text-2xl font-bold mb-8 text-foreground">
        Search Information
      </h2>
      
      <div className="relative mb-8">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-accent z-10" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter Pakistani mobile number (e.g., 3359736848) or CNIC (e.g., 2150952917167)"
          maxLength={13}
          className="input-glass py-5 px-6 pl-16 text-lg"
        />
      </div>
      
      <button
        onClick={handleSearch}
        disabled={isLoading || query.length < 10}
        className="btn-search py-5 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        <span className="flex items-center justify-center gap-3">
          <Search className="w-5 h-5" />
          Search Information
        </span>
      </button>
    </div>
  );
};

export default SearchBox;
