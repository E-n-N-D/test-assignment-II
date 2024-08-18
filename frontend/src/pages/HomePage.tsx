import React, { useContext, useState } from 'react';
import Chains from '../components/ChainDiscussion';
import {createChain} from '../api/api';
import { AuthContext } from '../context/AuthContext';

const HomePage: React.FC = () => {

  const { isAuthenticated } = useContext(AuthContext)!;

  const [startNumber, setNumber] = useState<number>(0)

  const handleAddDiscussion = async (event: React.MouseEvent<HTMLButtonElement>)=>{
    event.preventDefault();
    const token = localStorage.getItem('token')!;
    await createChain(startNumber, token);
    window.location.reload();
}

  const handleNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.valueAsNumber);
};

  return (
    <div>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between' ,padding: '0px 10px'}}>
        <h1>Discussion Chains</h1>
        {isAuthenticated && <div>
          <input value={startNumber} onChange={handleNumber} type="number" placeholder='Start Number' />
          <button onClick={handleAddDiscussion}>Add Discussion</button>
        </div>}
      </div>
      <Chains  />
    </div>
  );
};

export default HomePage;
