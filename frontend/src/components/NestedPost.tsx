import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { addPost } from '../api/api';

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

export const PostItem: React.FC<{ post: NestedPost; depth: number }> = ({ post, depth }) => {
    const padding = depth * 20;

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
        await addPost(post.chain,operation, operand,token, post._id);
        window.location.reload();
    }

    return (
      <li style={{paddingLeft: `${padding}px`, width:"100%"}}>
        <div key={post._id} className='chainContainer'>
                <div className="user">
                    {post.author.username}
                </div>
                <div className="chainContent">
                    <p>{new Date(post.createdAt).toUTCString()}</p>
                    <h5>Operation: {post.operation} Operand: {post.operand} Result: {post.result}</h5>
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
        {post.children.length > 0 && (
          <ul style={{ paddingLeft: '0', listStyleType: 'none' }}>
            {post.children.map(child => (
              <PostItem key={child._id} post={child} depth={depth + 1} />
            ))}
          </ul>
        )}
      </li>
    );
  };