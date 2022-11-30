import React from 'react'
import { useContext } from "react";
import { UnoContext } from "../UnoContext";
import { animated, useSpring } from 'react-spring'
import './WaitingRoom.css'

const WaitingRoom = () => {

const { userDataList} = useContext(UnoContext);
const styles = useSpring({
  from: { marginTop: -500 },
  to: { marginTop: 0 }
});

  return (
    
      <main className="main">  
      <section className="waiting--container">
      <animated.div style={styles}>
        <div className='waiting--info'>
          <h2>Waiting for all players...</h2>
          <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        <div className="waiting__players--container">
          {userDataList?.map((users, index) => <h3 key={users.id} className='players__title'>Player {index+1}: {users.player}</h3>)}
        </div>
        </div>
      </animated.div>
      </section>
      </main> 
  )
}

export default WaitingRoom;