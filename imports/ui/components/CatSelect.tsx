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
        className='border border-dark-cyan h-12 p-3 rounded-tl-xl rounded-bl-xl  hover:border-light-purple w-32 text-center'
      />
      <div
        className={showCodes ? "border border-dark-cyan rounded-b-xl w-32 overflow-y-auto absolute bg-white" : "hidden"}
      >
        {showCodes && filteredCodes.map((code) => (
          <option 
            key={code}
            value={code}
            onClick={ () => handleClick(code) }
          >{code}</option>
        ))}
      </div>
      <button 
        onClick={() => handleClick(selectedCat)}
        className="border border-dark-cyan rounded-tr-xl rounded-br-xl h-12 p-2 bg-dark-cyan text-white text-center text-sm hover:bg-white hover:text-dark-cyan self-end">{ homepageTranslation[language].getCats }</button>
    </div>
  );
};

export default CatSelect;