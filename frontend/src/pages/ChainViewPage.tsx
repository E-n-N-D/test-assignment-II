import React from 'react';
import ChainTree from '../components/ChainTree';
import { useLocation } from 'react-router-dom';

interface Chain {
    _id: string;
    startNumber: number;
    author: {username: string};
    createdAt: Date;
  }
  

const ChainViewPage: React.FC = () => {
    const location = useLocation();
    const {state} = location;
  const chain: Chain  =  state?.chain;
  return (
    <div>
      <h1>Chain: {chain._id}</h1>
      <ChainTree chain={chain}/>
    </div>
  );
};

export default ChainViewPage;
