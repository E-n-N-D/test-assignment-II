import React, { useEffect, useState } from 'react';
import '../css/chainTree.css'
import { getChains } from '../api/api';
import { useNavigate } from 'react-router-dom';

interface Chain {
  _id: string;
  startNumber: number;
  author: {username: string};
  createdAt: Date;
}

const Chains: React.FC = () => {
  const [chains, setChains] = useState<Chain[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChains = async () => {
      const chainData = await getChains();
      setChains(chainData);
    };

    fetchChains();
  }, []);


const handleViewChain = (chainId: string, chain: Chain) => {
    navigate(`/chain/${chainId}`, { state: { chain } });
  };

  return (
      <div className='discussionContainer'>
        {chains.map((chain) => (
            <div key={chain._id} className='chainContainer'>
                <div className="user">
                    {chain.author.username}
                </div>
                <div className="chainContent">
                    <p>{new Date(chain.createdAt).toUTCString()}</p>
                    <h2>{chain.startNumber}</h2>
                    <button onClick={() => handleViewChain(chain._id, chain)}>View Chain</button>
                </div>
            </div>
      ))}
    </div>
  );
};

export default Chains;
