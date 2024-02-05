// my-graphql-app\src\components\CountryList.tsx

import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { COUNTRIES_QUERY } from '../graphql/queries';
import 'bootstrap/dist/css/bootstrap.min.css';

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

interface CountryListProps {
  onCountrySelect: (country: Country) => void;
}

const CountryList: React.FC<CountryListProps> = ({ onCountrySelect }) => {
  const { loading, error, data } = useQuery(COUNTRIES_QUERY);
  const [textFilter, setTextFilter] = useState<string>('');
  const [groupFilter, setGroupFilter] = useState<string>('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const countries: Country[] = data.countries;

  const filterAndGroupCountries = (): Country[] => {
    let filteredCountries = countries;

    if (textFilter.trim() !== '') {
      filteredCountries = filteredCountries.filter((country) =>
        country.name.toLowerCase().includes(textFilter.toLowerCase())
      );
    }

    if (groupFilter === 'size') {
      filteredCountries.sort((a, b) => a.languages.length - b.languages.length);
    } else if (groupFilter === 'tt') {
      filteredCountries = filteredCountries.filter((country) =>
        country.name.toLowerCase().includes('tt')
      );
    }

    return filteredCountries;
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="input-group mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search country..."
              value={textFilter}
              onChange={(e) => setTextFilter(e.target.value)}
            />
            <div className="input-group-append">
             
            </div>
          </div>
          <select
            className="form-control mb-2"
            value={groupFilter}
            onChange={(e) => setGroupFilter(e.target.value)}
          >
            <option value="">No Groupp</option>
            <option value="tt">Group by 'tt'</option>
            {/* <option value="size">Group by Size</option> */}
          </select>
          <ul className="list-group">
            {filterAndGroupCountries().map((country: Country) => (
              <li
                key={country.code}
                onClick={() => onCountrySelect(country)}
                className="list-group-item cursor-pointer"
              >
                {country.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CountryList;
