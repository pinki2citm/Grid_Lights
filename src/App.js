import { useState } from 'react';
import './App.css'
function Grid({filled, onClick, isDisabled, label}){
  return <button type="button"
   onClick={onClick} 
   aria-label={label}
  className={filled? "cell cell-active ": "cell"} 
  disabled= {isDisabled}
  />
}

function App() {
  const [order,SetOrder]=useState([])
  const [isDeactivating, SetIsDeactivating]=useState(false);
  const config =[
    [1,1,1],
    [1,0,1],
    [1,1,1]
  ];

const DeActiveCells= ()=>{
 SetIsDeactivating(true);
const timer= setInterval(()=>{
  SetOrder((orgOrder)=>{
    const newOrder = orgOrder.slice();
    newOrder.pop();

    if(newOrder.length===0)
    {
      SetIsDeactivating(false);
      clearInterval(timer);
    }
    return newOrder;
  })
},300)

};
  const activeCells= (index)=>{
    const newOrder =[...order, index];
    SetOrder(newOrder);
    console.log(newOrder);
    if(newOrder.length == config.flat(1).filter(Boolean).length)
      DeActiveCells();

  }
  return (
    <div className="wrapper">
      <div className="grid"
      style={{
        gridTemplateColumns: `repeat(${config[0].length}, 1fr)`
      }}
      >
      {config.flat(1).map((value,index)=>{
       return  value ? <Grid key={index}
        filled={order.includes(index)}
        label ={`cell ${index}`}
        onClick={()=>{activeCells(index)}}
        isDisabled={order.includes(index) || isDeactivating} 
        /> : <span> </span>;
      })}
      </div>
    </div>
  );
}

export default App;
