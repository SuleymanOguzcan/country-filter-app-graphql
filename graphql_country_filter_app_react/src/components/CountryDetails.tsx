import React from 'react';

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

interface CountryDetailsProps {
  country: Country | null;
}

const CountryDetails: React.FC<CountryDetailsProps> = ({ country }) => {
  if (!country) return null;

  return (
    <div>
      <h2>{country.name}</h2>
      <p>Native: {country.native}</p>
      <p>Capital: {country.capital}</p>
      <p>Emoji: {country.emoji}</p>
      <p>Currency: {country.currency}</p>
      <p>Languages: {country.languages.map((lang) => lang.name).join(', ')}</p>
    </div>
  );
};

export default CountryDetails;
