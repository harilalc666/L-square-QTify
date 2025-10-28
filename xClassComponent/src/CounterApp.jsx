import React from "react";

// function CounterApp() {
//   const [count, setCount] = useState(0);

//   const increment = () => {
//     setCount(count + 1);
//   };

//   const decrement = () => {
//     setCount(count - 1);
//   };

//   return (
    // <div>
    //   <h1>Counter App</h1>
    //   <p>Count: {count}</p>
    //   <button onClick={increment}>Increment</button>
    //   <button onClick={decrement}>Decrement</button>
    // </div>
//   );
// }

class CounterApp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      count: 0,
    }
  }

  increment = ()=>{
    this.setState({
      count: ++this.state.count
    })
  }

  decrement = ()=>{
    this.setState({
      count: --this.state.count
    })
  }
  
  render(){
    return (
    <div>
      <h1>Counter App</h1>
      <p>Count: {this.state.count}</p>
      <button onClick={this.increment}>Increment</button>
      <button onClick={this.decrement}>Decrement</button>
    </div>
    )
  }
}

export default CounterApp;