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
    if (filtered.length === 0) {
      setShowCodes(false);
    }
  }, [selectedCat]);

  const handleClick = (code: string) => {
    props.onSelect(code);
    setSelectedCat('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder={ homepageTranslation[language].searchByCode }
        onChange={(e) => setSelectedCat(e.target.value)}
        className='text-5xl py-5 px-4 w-72 rounded-tl-xl rounded-bl-xl text-dark-blue hover:border-light-cyan text-center lg:text-sm'
      />
      <button 
        onClick={() => handleClick(selectedCat)}
        className="border border-cyan rounded-tr-xl p-6 rounded-br-xl text-5xl bg-cyan text-dark-blue text-center hover:bg-white hover:text-dark-cyan self-end lg:text-sm lg:p-5"
      >
        { homepageTranslation[language].getCats }
      </button>
      <div
        className={showCodes ? "border text-5xl border-dark-cyan rounded-b-xl w-72 overflow-y-auto absolute bg-white" : "hidden"}
      >
        {showCodes && filteredCodes.map((code) => (
          <option 
            key={code}
            value={code}
            onClick={ () => handleClick(code) }
          >{code}</option>
        ))}
      </div>
    </div>
  );
};

export default CatSelect;