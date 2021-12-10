import Form from './Form'

function Display(props) {
  let display
  let status = props.bounty.captured ? 'In Custody':'At Large'
  if(!props.bounty.name){
    display = (<p>Select a bounty below to see more info</p>)
  } else {
    display = (
      <div className="showBounty">
        <h2>{props.bounty.name}</h2>
        <h3>{status}</h3>
        <h3>Wanted For: {props.bounty.wantedFor}</h3>
        <h3>Client: {props.bounty.client}</h3>
        <h4>Reward: ${props.bounty.reward}</h4>
        <p>Last Seen: {props.bounty.lastSeen?props.bounty.lastSeen:'Unknown'}</p>
        
        <Form currentBounty={props.bounty} refreshBounties={props.getBounties} isUpdateForm={true}/>
      </div>
    )
  }
  return <>{display}</>
}

export default Display