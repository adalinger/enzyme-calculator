import React from "react";
import {Button, Col, Container, Form, FormControl, FormLabel, Row} from "react-bootstrap";
import {TooltipComponent} from "./TooltipComponent";

const tooltipFatContent = "Der Fettgehalt ist auf der Verpackung des Lebensmittels abgedruckt";
const tooltipEatenFood = "Die verzehrte Menge soll am besten abgewogen und nur im Notfall geschätzt werden";

const keyEnzymeUnitsPerGramFat = "enzymeUnitsPerGramFat";

function Calculator() {
    const previousEnzymeUnitsPerGramFat = localStorage.getItem(keyEnzymeUnitsPerGramFat) || ''

    const [enzymeUnitsPerGramFat, setEnzymeUnitsPerGramFat] = React.useState(previousEnzymeUnitsPerGramFat);
    const [foods, setFoods] = React.useState([{fatPer100GramsFood: '', eatenGramsFood: ''}]);
    const [result, setResult] = React.useState({totalFatGrams: '', neededEnzymeUnits: ''});

    const handleAddFood = () => {
        setFoods([...foods, {fatPer100GramsFood: '', eatenGramsFood: ''}])
    }

    const handleChangeFood = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        let newFoods = [...foods]
        newFoods[index][event.target.id] = event.target.value
        setFoods(newFoods)
    }

    const calculateResult = () => {
        let totalFatGrams = 0
        for (const food of foods) {
            totalFatGrams += parseFloat(food.fatPer100GramsFood) / 100 * parseFloat(food.eatenGramsFood)
        }
        const neededEnzymeUnits = parseFloat(enzymeUnitsPerGramFat) * totalFatGrams

        setResult({
            totalFatGrams: String(totalFatGrams),
            neededEnzymeUnits: String(neededEnzymeUnits)
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        localStorage.setItem(keyEnzymeUnitsPerGramFat, enzymeUnitsPerGramFat)
        calculateResult();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Container>
                <Row>
                    <Col sm={12} className="mt-3">
                        <Form.Group>
                            <FormLabel htmlFor={keyEnzymeUnitsPerGramFat}>Enzymeinheiten pro 1g Fett</FormLabel>
                            <FormControl
                                id={keyEnzymeUnitsPerGramFat}
                                type="number"
                                inputMode="decimal"
                                value={enzymeUnitsPerGramFat}
                                onChange={event => setEnzymeUnitsPerGramFat(event.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    {foods.map((value, index) => (
                        <React.Fragment key={index}>
                            <Col xs={6} className="mt-3">
                                <Form.Group>
                                    <FormLabel htmlFor="fatPer100GramsFood">
                                        Fett pro 100g Lebensmittel
                                        <TooltipComponent>{tooltipFatContent}</TooltipComponent>
                                    </FormLabel>
                                    <FormControl
                                        id="fatPer100GramsFood"
                                        type="number"
                                        inputMode="decimal"
                                        value={value.fatPer100GramsFood}
                                        onChange={event => handleChangeFood(event, index)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={6} className="mt-3">
                                <Form.Group>
                                    <FormLabel htmlFor="eatenGramsFood">
                                        Verzehrte Menge in Gramm
                                        <TooltipComponent>{tooltipEatenFood}</TooltipComponent>
                                    </FormLabel>
                                    <FormControl
                                        id="eatenGramsFood"
                                        type="number"
                                        inputMode="decimal"
                                        value={value.eatenGramsFood}
                                        onChange={event => handleChangeFood(event, index)}
                                    />
                                </Form.Group>
                            </Col>
                        </React.Fragment>
                    ))}
                    <Col md={12} className="mt-3">
                        <Button variant="secondary" onClick={handleAddFood}>Zeile hinzufügen</Button>
                    </Col>
                    <Col md={12} className="mt-3">
                        <Button type="submit">Berechnen</Button>
                    </Col>
                    {result.totalFatGrams !== '' && result.neededEnzymeUnits !== '' &&
                        <Col md={12} className="mt-3">
                            <div>
                                Gesamtmenge Fett: {result.totalFatGrams}g <br/>
                                Dafür benötigte Enzymeinheiten: {result.neededEnzymeUnits}
                            </div>
                        </Col>
                    }
                </Row>
            </Container>
        </Form>
    );
}

export {Calculator};