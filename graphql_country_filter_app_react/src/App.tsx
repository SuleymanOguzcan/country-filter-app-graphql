import React, { useState } from 'react';
import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails';

interface Language {
  code: string;
  name: string;
}

interface Country {
  code: string;
  name: string;
  native: string;
  capital: string;
  emoji: string;
  currency: string;
  languages: Language[];
}

const App: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <CountryList onCountrySelect={handleCountrySelect} />
      <CountryDetails country={selectedCountry} />
    </div>
  );
};

export default App;
