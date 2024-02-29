import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import toast from "react-hot-toast"


import { useAnalyzer } from '../context/useAnalyzer';
import InputDictionary from './InputDictionary';

import { BsDashCircle } from 'react-icons/bs';

const Dictionary = (props) =>{

  const {state: {tokens}, actions: {removeToken, resetTokens} } = useAnalyzer();

  const removerTokenFunc = (token) => {
    removeToken(token);
    toast.success(token+ ' has been successfully removed!');
  }
  
  return (
    <>
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Dictionary
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{marginRight:10}}>
          <div className="mb-3">
            <InputDictionary/>
          </div>
          <div className="mb-3"style={{height:240,overflow: "auto"}}>
               <ul className="list-group list-group-flush" style={{overflow: "auto"}}>
                {tokens && tokens.map((token)=>(
                  <li key={token} 
                  className="list-group-item d-flex justify-content-between">
                  {token} <BsDashCircle role="button" onClick={()=> removerTokenFunc(token)} size={25}/>
                </li>
                ))}
              </ul>
              {!tokens.length && <p className="text-center">add more tokens</p>}
          </div>
      </div>
      </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={()=>{
            toast.success("Dictionary reset");
            resetTokens()}}>Reset</Button>
        </Modal.Footer>
    </Modal>
  </>
)}

export default Dictionary;