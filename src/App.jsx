import { useState,useCallback,useEffect, useRef } from 'react'
import "./App.css"


function App() {
  const [length,setLength] = useState(8);
  const [num,setNum] = useState(false);
  const [char,setChar] = useState(false);
  const [password,setPassword] = useState("")
  const [isClicked, setIsClicked] = useState(false);

  //useRef hook
  const passwordRef = useRef(null);
  // const passwordGenerator = useCallback(fn,[dependencies])
  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(num) str += "0123456789";
    if(char) str += "!@#$%^&*()_+{}[]~";

    for(let i = 1;i<=length;i++){
      let ch = Math.floor(Math.random()*str.length + 1);
      pass += str.charAt(ch);
    }
    setPassword(pass);

  },[length,num,char,setPassword])

  const copyPasswordToClipboard = useCallback(()=>{

    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,6)
    window.navigator.clipboard.writeText(password)
    setIsClicked((prev) => !prev);
  },[password])
// passwordGenerator()
  useEffect(passwordGenerator,[length,num,char,passwordGenerator])
  return (
    <>
      
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-2xl text-center mb-2 text-white'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
          value={password}
          className='outline-none w-full py-1 px-3 '
          placeholder='password'
          readOnly
          ref = {passwordRef}

          />
          <button
            onClick={copyPasswordToClipboard}
            className={`transition-all duration-300 ease-in-out 
              ${isClicked 
                ? 'bg-red-500 text-white text-md px-2 py-2 mx-2' 
                : 'bg-blue-500 text-black text-md px-2 py-2 mx-2'
              } 
              rounded-lg`}
          >
            {isClicked ? 'Copied!' : 'Copy'}

          </button>
        </div>
        <div className='flex text-sm gap-x-3'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range" 
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
             />
             <label>Length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
             type="checkbox"
             defaultChecked = {num}
             id = "numberInput"
             onChange={()=>{
              setNum((prev) => !prev);
             }} />
             <label htmlFor="number_input">Numbers</label>
             <input
              type="checkbox" 
              defaultChecked={char}
              id = "charInput"
              onChange={()=>{
                setChar((prev) => !prev)
              }}
              
             />
             <label htmlFor="char_input">Characters</label>
          </div>
        </div>
      </div>
      
    </>

  )
}

export default App
