import { useState } from 'react';
import './App.css';

function App() {
  const [result, setResult] = useState()
  const [number, setNumber] = useState("");

  
  const handleUserInput = (e)=>{
    const value = e.target.value;
    console.log(value);
    setNumber(number + value);
  }


  const handlCalculation = (e)=>{
    e.stopPropagation();
    try {
      const ans = calculation(number);
      setResult(Number(ans));
    } catch {
      // console.error(error);
      setResult("Error");
    }
  }

  function calculation(expression){
    // Step 1: Tokenize (e.g., "8+4/2*3" → [8, "+", 4, "/", 2, "*", 3])
    const tokens = expression.match(/(\d+|\+|\-|\*|\/)/g);

    if(['-', '*', '+', '/'].includes(tokens[tokens.length-1])) throw new Error();

    // handle /
    for(let i=0; i<tokens.length; i++){
      if(tokens[i] == '/'){
        const left = Number(tokens[i - 1]);
        const rigth = Number(tokens[i + 1]);
        const result = left / rigth;
        tokens.splice(i-1, 3, result);
        i--;
      }
    }

    // handle *
    for(let i=0; i<tokens.length; i++){
      if(tokens[i] == '*'){
        const left = Number(tokens[i - 1]);
        const rigth = Number(tokens[i + 1]);
        const result = left * rigth;
        tokens.splice(i-1, 3, result);
        i--;
      }
    }    

    // handle +
    for(let i=0; i<tokens.length; i++){
      if(tokens[i] == '+'){
        const left = Number(tokens[i - 1]);
        const rigth = Number(tokens[i + 1]);
        const result = left + rigth;
        tokens.splice(i-1, 3, result);
        i--;
      }
    }
    
    // handle -
    for(let i=0; i<tokens.length; i++){
      if(tokens[i] == '-'){
        const left = Number(tokens[i - 1]);
        const rigth = Number(tokens[i + 1]);
        const result = left - rigth;
        tokens.splice(i-1, 3, result);
        i--;
      }
    }

    return tokens[0];
  }

  const handleClear = (e) => {
    e.stopPropagation();
    setNumber("");
    setResult();
  }

  return (
    <div>
      <input className='input' type="text" value={number}/>
      {/* result */}
      <div className='result'><span>{result}</span></div>
      <div className='container' onClick={handleUserInput}>
        <button type="button" value={7}>7</button>
        <button type="button" value={8}>8</button>
        <button type="button" value={9}>9</button>
        <button id = "add" type="button" value={"+"}>+</button>
        <button type="button" value={4}>4</button>
        <button type="button" value={5}>5</button>
        <button type="button" value={6}>6</button>
        <button id = "sub" type="button" value={"-"}>-</button>
        <button type="button" value={1}>1</button>
        <button type="button" value={2}>2</button>
        <button type="button" value={3}>3</button>
        <button id = "sub" type="button" value={"*"}>*</button>
        <button id='clear' type="button" onClick={handleClear}>C</button>
        <button type="button" value={0}>0</button>
        <button type="button" onClick={handlCalculation} value={"="}>=</button>
        <button id = "div" type="button" value={"/"}>/</button>
      </div>
    </div>
  )
}

export default App
