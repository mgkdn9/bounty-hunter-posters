import { useState } from "react"
// const methodOverride = require('method-override')

function Form(props) {

  const [newBounty, setNewBounty] = useState({
    name: props.currentBounty.name,
    wantedFor: props.currentBounty.wantedFor,
    client: props.currentBounty.client,
    reward: props.currentBounty.reward,
    captured: props.currentBounty.captured,
    lastSeen: props.currentBounty.lastSeen
  })

  const handleChange = e => {
    setNewBounty({...newBounty, [e.target.name]:e.target.value})
  }
  const handleCheck = e => {
    setNewBounty({...newBounty, captured:e.target.checked})
  }
  const postBounty = e => {
    e.preventDefault()
    let preJsonBody = {
      name: newBounty.name,
      wantedFor: newBounty.wantedFor,
      client: newBounty.client,
      reward: Number(newBounty.reward),
      captured: Boolean(newBounty.captured),
      lastSeen: newBounty.lastSeen
    }
    const fetchTarget = props.isUpdateForm?`http://localhost:8000/bounties/${props.bountyId}?_method=PUT`:'http://localhost:8000/bounties'
    fetch(fetchTarget, {
      method: 'POST',
      body: JSON.stringify(preJsonBody),
      headers: {'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .then(postedBounty => {
      setNewBounty({
        name: '',
        wantedFor: '',
        client: '',
        reward: 100000,
        captured: false,
        lastSeen: ''
      })
      props.refreshBounties()
    })
    .catch(err => console.log(err))
  }

  return(
    <form onSubmit={postBounty}>
      <div>
        <label htmlFor="name">Name:</label>
        <input value={newBounty.name} onChange={handleChange} type="text" name="name" id="name" />
      </div>
      <div>
        <label htmlFor="wantedFor">Wanted For:</label>
        <input value={newBounty.wantedFor} onChange={handleChange} type="text" name="wantedFor" id="wantedFor" />
      </div>
      <div>
        <label htmlFor="client">Client:</label>
        <input value={newBounty.client} onChange={handleChange} type="text" name="client" id="client" />
      </div>
      <div>
        <label htmlFor="reward">Reward:</label>
        <input value={newBounty.reward} onChange={handleChange} type="number" name="reward" id="reward" />
      </div>
      <div>
        <label htmlFor="captured">Captured:</label>
        <input value={newBounty.captured?"checked":""} onChange={handleCheck} type="checkbox" name="captured" id="captured" />
      </div>
      <div>
        <label htmlFor="lastSeen">Last Seen:</label>
        <input value={newBounty.lastSeen} onChange={handleChange} type="text" name="lastSeen" id="lastSeen" />
      </div>

      <input type="submit" value="Post Bounty" />
    </form>
  )
}

export default Form