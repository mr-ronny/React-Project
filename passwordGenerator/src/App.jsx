import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [Password, setPassword] = useState("");

  // useref:------***** for window copy window.navigator.clipboard.writeText()
  const passwordRef = useRef(null);
  const copyPasswordClipboard = useCallback(()=>{
    passwordRef.current?.select();  //**** */
    passwordRef.current?.setSelectionRange(0,1000)  //*****(yaha pr range dalna ki 3go text select hoga ya 100 go)***
    window.navigator.clipboard.writeText(Password)
  },[Password])

  //useCallBacke Method ek fnc or ek array leta h const passwordGenerator = useCallback(fnc, [])

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*()_-+=><.~";

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, characterAllowed, passwordGenerator])
  return (
    <div className='w-full  max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>

      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>


        <input
          type='text'
          value={Password}
          className='outline-none w-full py-1 px-3'
          placeholder='password' readOnly
          ref={passwordRef}></input>

        <button onClick={copyPasswordClipboard} className='outline-none bg-blue-800 text-white px-3 py-0.5 shrink-0'>copy</button>
      </div>


      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type='range'
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => { setLength(e.target.value) }}
          ></input>
          <label>length: {length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input type='checkbox'
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          >

          </input>
          <label htmlFor='numberInput'>Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input type='checkbox'
            defaultChecked={characterAllowed}
            id="characterInput"
            onChange={() => {
              setCharacterAllowed((prev) => !prev);
            }}
          >

          </input>
          <label htmlFor='characterInput'>Character</label>
        </div>
      </div>
    </div>

  )
}

export default App
