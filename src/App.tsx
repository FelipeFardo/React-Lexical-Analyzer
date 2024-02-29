import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';
import { Button } from "react-bootstrap";
import { Toaster } from 'react-hot-toast';

import ModalDicionario from './components/ModalDicionario';
import InputAnalyzer from './components/InputAnalyzer';
import Tags from './components/Tags';
import Table from './components/Table';

function App() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Toaster />
      <div className="d-flex justify-content-center mt-2">
        <div className="col-md-11 col-sm-7 col-5">
          <h3 className="m-2 text-center border-bottom pb-3 ">Lexical analyzer</h3>
          <div className="d-flex justify-content-between mt-3">
            <div className="col-4">
              <InputAnalyzer />
            </div>
            <div>
              <ModalDicionario show={modalShow} onHide={() => setModalShow(false)} />
              <Button className="btn btn-dark mt-end h-100" onClick={() => setModalShow(true)}>Dictionary</Button>
            </div>
          </div>
          <Tags />
          <Table />
        </div>
      </div>
      <footer className='border-top pt-3 mt-2 text-center'>
        <p>Developed with ❤️ by <a href="https://github.com/FelipeFardo" target='_blank' rel="noreferrer" className='link-secondary'> Felipe Fardo</a> - Full Stack Developer</p>
      </footer >
    </>
  );
}

export default App;
