import React, { useContext, useEffect, useState } from 'react';
import { getPostsByChain } from '../api/api';
import { arrangePosts } from '../utils/arrangeNode';
import { PostItem } from './NestedPost';
import { addPost } from '../api/api';
import { AuthContext } from '../context/AuthContext';
import '../css/chainTree.css'

interface Chain {
  _id: string;
  startNumber: number;
  author: {username: string};
  createdAt: Date;
}

interface Post {
  _id: string;
  chain: string;
  author: {username: String};
  operation: string;
  operand: number;
  result: number;
  prevPost?: string;
  createdAt: Date;
}

interface NestedPost extends Post {
  children: NestedPost[];
}

const ChainTree: React.FC<{chain:Chain}> = ({chain}) => {

  const [posts, setPosts] = useState<NestedPost[]>()
  const { isAuthenticated } = useContext(AuthContext)!;

  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'divide'>('add');
  const [operand, setOperand] = useState<number>(0);

  const handleOperationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOperation(event.target.value as 'add' | 'subtract' | 'multiply' | 'divide');
  };

  const handleOperandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOperand(event.target.valueAsNumber);
  };

  const handleReply = async (event: React.MouseEvent<HTMLButtonElement>)=>{
    event.preventDefault();
    const token = localStorage.getItem('token')!;
    console.log(chain._id,null,operation, operand,token)
    console.log(posts)
    await addPost(chain._id,operation, operand,token);
    window.location.reload();
  }

    useEffect(()=> {
    const fetchPosts = async (chainId: string) => {
      const postData = await getPostsByChain(chainId);
      console.log(postData)
      const nestedPost:NestedPost[] = arrangePosts(postData)
      console.log(nestedPost)
      setPosts(nestedPost);
    };

    fetchPosts(chain._id);
  },[chain._id])

  return(
    <>
    <div key={chain._id} className='chainContainer'>
                <div className="user">
                    {chain.author.username}
                </div>
                <div className="chainContent">
                    <p>{new Date(chain.createdAt).toUTCString()}</p>
                    <h2>{chain.startNumber}</h2>
                    {isAuthenticated && <div className='replyContainer'>
                      <label>
                        Select Operation:
                        <select value={operation} onChange={handleOperationChange} style={{ marginLeft: '10px' }}>
                          <option value="add">Add</option>
                          <option value="subtract">Subtract</option>
                          <option value="multiply">Multiply</option>
                          <option value="divide">Divide</option>
                        </select>
                      </label>
                      <label>
                        Operand:
                        <input
                          type="number"
                          value={operand}
                          onChange={handleOperandChange}
                          placeholder="Enter operand"
                          style={{ marginLeft: '10px', width: '50px' }}
                        />
                      </label>
                      <button onClick={handleReply}>Reply</button>
                    </div>}
                </div>
            </div>
            {posts?.length! > 0 && <ul style={{ padding: 0, listStyleType: 'none' }}>
              {posts?.map(post => (<PostItem key={post._id} post={post} depth={1}/>))}
              </ul>}
    </>
  )

}

export default ChainTree;
