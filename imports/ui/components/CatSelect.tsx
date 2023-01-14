import React, { useState, useEffect, useContext } from 'react';
import Context from '../context/Context';
import { ContextInterface } from '../interfaces/ContextInterface';
import statusCodes from '../utils/httpCat';
import homepageTranslation from '../utils/homepageTranslation';

interface props {
  onSelect: (id: string) => void;
}

function CatSelect(props: props) {
  const { language } = useContext(Context) as ContextInterface;
  const [selectedCat, setSelectedCat] = useState('');
  const [filteredCodes, setFilteredCodes] = useState(statusCodes);
  const [showCodes, setShowCodes] = useState(false);

  useEffect(() => { // mecanismo de procura de gatos que existem no array de statusCodes
    selectedCat.length > 0 ? setShowCodes(true) : setShowCodes(false);
    const filtered = statusCodes.filter((code) => code.includes(selectedCat));
    setFilteredCodes(filtered);
  }, [selectedCat]);

  return (
    <div>
      <input
        type="text"
        placeholder={ homepageTranslation[language].searchByCode }
        onChange={(e) => setSelectedCat(e.target.value)}
      />
      {showCodes && filteredCodes.map((code) => (
        <option key={code} value={code} onClick={() => props.onSelect(code)}>{code}</option>
      ))}
      <button onClick={() => props.onSelect(selectedCat)}>{ homepageTranslation[language].getCats }</button>
    </div>
  );
};

export default CatSelect;