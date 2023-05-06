import React from "react";
import axios from 'axios';
import {Button, Col, Container, Form, FormControl, FormLabel, Row} from "react-bootstrap";

interface Request {
    enzymeUnitsPerGramFat: string,
    foods: {
        fatPer100GramsFood: string,
        eatenGramsFood: string
    }[]
}

function EnzymeCalculator() {
    const [enzymeUnitsPerGramFat, setEnzymeUnitsPerGramFat] = React.useState('');
    const [foods, setFoods] = React.useState([{fatPer100GramsFood: '', eatenGramsFood: ''}]);
    const [result, setResult] = React.useState('');

    const handleAddFood = () => {
        let emptyFood = {fatPer100GramsFood: '', eatenGramsFood: ''}
        setFoods([...foods, emptyFood])
    }

    const handleChangeFood = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        let newFoods = [...foods]
        newFoods[index][event.target.id] = event.target.value
        setFoods(newFoods)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const request: Request = {
            enzymeUnitsPerGramFat: enzymeUnitsPerGramFat,
            foods: foods
        }
        axios.post(`/enzymes`, request)
            .then(response => setResult(response.data))
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Container>
                <Row>
                    <Col sm={12} className="mt-3">
                        <Form.Group>
                            <FormLabel htmlFor="enzymeUnitsPerGramFat">Enzymeinheiten pro g Fett</FormLabel>
                            <FormControl
                                id="enzymeUnitsPerGramFat"
                                type="number"
                                value={enzymeUnitsPerGramFat}
                                onChange={event => setEnzymeUnitsPerGramFat(event.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    {foods.map((value, index) => (
                        <>
                            <Col xs={6} className="mt-3">
                                <Form.Group>
                                    <FormLabel htmlFor="fatPer100GramsFood">Fett pro 100g Essen</FormLabel>
                                    <FormControl
                                        id="fatPer100GramsFood"
                                        type="number"
                                        value={value.fatPer100GramsFood}
                                        onChange={event => handleChangeFood(event, index)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={6} className="mt-3">
                                <Form.Group>
                                    <FormLabel htmlFor="eatenGramsFood">Essen in g</FormLabel>
                                    <FormControl
                                        id="eatenGramsFood"
                                        type="number"
                                        value={value.eatenGramsFood}
                                        onChange={event => handleChangeFood(event, index)}
                                    />
                                </Form.Group>
                            </Col>
                        </>
                    ))}
                    <Col md={12} className="mt-3">
                        <Button variant="secondary" onClick={handleAddFood}>Zeile hinzufügen</Button>
                    </Col>
                    <Col md={12} className="mt-3">
                        <Button type="submit">Berechnen</Button>
                    </Col>
                    {result !== '' &&
                        <Col md={12} className="mt-3">
                            <div>
                                Benötigte Enzymeinheiten: {result}
                            </div>
                        </Col>
                    }
                </Row>
            </Container>
        </Form>
    );
}

export {EnzymeCalculator};