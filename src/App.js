import React, { useState } from 'react';
import Icon from './components/Icon';


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { Card, CardBody, Container, Button, Col, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import './App.css';

const itemArray = new Array(9).fill("empty");

const App = () => {
  const [isCross, setCross] = useState(false);
  const [winMessage, setWinMessage] = useState("");

  const reloadGame = () => {
    setCross(false);
    setWinMessage("");
    itemArray.fill("empty", 0, 9);
  }

  const checkIsWinner = () => {
    if (itemArray[0] === itemArray[1] &&
      itemArray[0] === itemArray[2] &&
      itemArray[0] !== "empty") {
      setWinMessage(`${itemArray[0]} Wins`);
    } else if (
      itemArray[3] !== "empty" &&
      itemArray[3] === itemArray[4] &&
      itemArray[4] === itemArray[5]) {
      setWinMessage(`${itemArray[3]} Won`);
    } else if (
      itemArray[6] !== "empty" &&
      itemArray[6] === itemArray[7] &&
      itemArray[7] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[6]} Won`)
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[3] &&
      itemArray[3] === itemArray[6]
    ) {
      setWinMessage(`${itemArray[3]} Won`);
    } else if (
      itemArray[1] !== "empty" &&
      itemArray[1] === itemArray[4] &&
      itemArray[4] === itemArray[7]
    ) {
      setWinMessage(`${itemArray[1]} Won`);
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[5] &&
      itemArray[5] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[2]} Won`);
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[4] &&
      itemArray[4] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[4]} Won`);
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[4] &&
      itemArray[4] === itemArray[6]
    ) {
      setWinMessage(`${itemArray[4]} Won`);
    }
  }

  const changeItem = (itemNumber) => {
    if (winMessage) {
      return toast(winMessage, { type: "success" })
    }

    if (itemArray[itemNumber] === "empty") {
      itemArray[itemNumber] = isCross ? "cross" : "circle"
      setCross(!isCross)
    } else {
      return toast("already filled", { type: "error" })
    }

    checkIsWinner();
  };

  return (
    <Container className='p-5'>
      <h1 className="text-center">Tick Tak Toe Game</h1>
      <ToastContainer position='bottom-center' />
      <Row>
        <Col md={6} className="offset-md-3">
          {winMessage ? (
            <div className='my-2'>
              <h2 className='text-success text-uppercase text-center'>
                {winMessage}
              </h2>
              <Button color='primary' block onClick={reloadGame}>
                Reload the game</Button>
            </div>
          ) : (
            <h2 className='text-center text-primary mb-2'>
              {isCross ? "Cross" : "Circle"}'s turns
            </h2>
          )}
          <div className="grid mt-4">
            {itemArray.map((item, index) => (
              <Card color="info" onClick={() => changeItem(index)}>
                <CardBody className="box">
                  <Icon name={item} />
                </CardBody>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>

  );
}

export default App;
