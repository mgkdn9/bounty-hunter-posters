import './App.css';
import Poster from './Poster'
import Display from './Display'
import Form from './Form'
import { useEffect, useState } from 'react'

function App() {

  const [bounties, setBounties] = useState([])
  const [current, setCurrent] = useState({})

  useEffect(() => {
    getBounties()
  }, [])

  const getBounties = () => {
    fetch('http://localhost:8000/bounties')
    .then(res => res.json())
    .then(foundBounties => {
      console.log(foundBounties)
      setBounties(foundBounties)
    })
    .catch(err=>console.log(err))
  }

  const changeCurrent = bounty => {
    setCurrent(bounty)
  }

  const posters = bounties.map( b => {
    return <Poster changeCurrent={changeCurrent} bounty={b} key={b.name}/>
  })

  return (
    <div className="App">
      <header className="App-header">
        <Display bounty={current} getBounties={getBounties}/>
      </header>
      <section className='poster-board'>
        {posters}
      </section>
      <section className='App-header'>
        <Form currentBounty={current} refreshBounties={getBounties} isUpdateForm={false}/>
      </section>
    </div>
  );
}

export default App;
