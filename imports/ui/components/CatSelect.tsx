import React, { useState, useEffect } from 'react';
import statusCodes from '../utils/httpCat';

interface props {
  onSelect: (id: string) => void;
}

function CatSelect(props: props) {
  const [selectedCat, setSelectedCat] = useState('');
  const [filteredCodes, setFilteredCodes] = useState(statusCodes);
  const [showCodes, setShowCodes] = useState(false);

  useEffect(() => {
    selectedCat.length > 0 ? setShowCodes(true) : setShowCodes(false);
    const filtered = statusCodes.filter((code) => code.includes(selectedCat));
    setFilteredCodes(filtered);
  }, [selectedCat]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by status code"
        onChange={(e) => setSelectedCat(e.target.value)}
      />
      {showCodes && filteredCodes.map((code) => (
        <option key={code} value={code} onClick={() => props.onSelect(code)}>{code}</option>
      ))}
      <button onClick={() => props.onSelect(selectedCat)}>Select</button>
    </div>
  );
};

export default CatSelect;