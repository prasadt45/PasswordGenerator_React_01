import { useState, useCallback , useEffect , useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setlength] = useState(8) // for range 
  const [numberallowed, setnumber] = useState(false) // for number
  const [charcter, setchar] = useState(false)  // for character
  const [pass, setpass] = useState("")  // for password

  const passwordgen = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"// data from where password generatted 
    if (numberallowed) str += "0123456789"
    if (charcter) str += "!@#$%^&*()-=+*/[]{}"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char) // char will give us index so at that particular index to get that value we use charAt

    }
    setpass(pass)
  }, [length, numberallowed, charcter, setpass])

  useEffect(()=>{
   passwordgen()
  } , [length , numberallowed , charcter , passwordgen])

// to copy passwrod
const copyPasswordtosystem = useCallback(()=>{
  passwordref.current?.select() ;
  // passwordref.current?.setSelectionRange(0,3)
  window.navigator.clipboard.writeText(pass)
} , [pass])
// useRef hook
const passwordref = useRef(null) 
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg my-8 px-4 py-3 bg-gray-800">
        <h1 className='text-4xl text-white'>Password Generator</h1>
        <br />
        <div className="flex shadow rounded-lg overflow-hidden mb-4 gap-2">
          <input
           type="text" value={pass} 
           name="" id=""
            placeholder='Password' 
            className='outline-none w-full py-1 px-3 text-center' 
            readOnly
            ref={passwordref}
            />
          <button 
          onClick={copyPasswordtosystem}
          className='pl-5 text-white bg-blue-400 text-left'>Copy </button>
        </div>
        <div className="flex text-sm gap-2">
          <input
            type="range" min={6} max={10} value={length} className='cursor-pointer'
            onChange={(e) => {
              setlength(e.target.value)
            }}
          />
          <label className='text-white'>Length : {length}</label>
        
        <div className='flex items-center gap-x-1'>
          <input

            type="checkbox"
            defaultChecked={numberallowed}
            id='numberInput'
            onChange={() => {
              setnumber((prev) => !prev) // fliiping prev like if true then false and vice versa 
            }}



          />
            <label className='text-white'>Number</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input

            type="checkbox"
            defaultChecked={charcter}
            id='numberInput'
            onChange={() => {
              setchar((prev) => !prev) // fliiping prev like if true then false and vice versa 
            }}



          />
            <label className='text-white'>SpecialChar</label>
        </div>
        
        </div>
      </div>
    </>
  )
}

export default App
