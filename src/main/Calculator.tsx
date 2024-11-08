import React from "react";
import {Button, Col, Container, Form, FormControl, FormLabel, Modal, Row} from "react-bootstrap";
import {QuestionLg} from "react-bootstrap-icons";

const usageNotes = <>
    <p>
        Diese App berechnet die nötigen Einheiten Pankreatin für eine Mahlzeit.
        Die Berechnung basiert auf den Enzymeinheiten pro 1g Fett und der verzehrten Menge Fett.
        Der Fettgehalt von Lebensmitteln ist auf ihrer Verpackung abgedruckt
        und die verzehrte Menge Lebensmittel sollte abgewogen werden.
    </p>
    <p>
        Die Verwendung dieser App geschieht auf eigene Verantwortung.
    </p>
    <p>
        Der App Quellcode ist verfügbar unter <a
        href="https://github.com/adalinger/enzyme-calculator">https://github.com/adalinger/enzyme-calculator</a>.
    </p>
</>;

const keyEnzymeUnitsPerGramFat = "enzymeUnitsPerGramFat";

function Calculator() {
    const previousEnzymeUnitsPerGramFat = localStorage.getItem(keyEnzymeUnitsPerGramFat) || ''
    const [enzymeUnitsPerGramFat, setEnzymeUnitsPerGramFat] = React.useState(previousEnzymeUnitsPerGramFat);
    const [foods, setFoods] = React.useState([{fatPer100GramsFood: '', eatenGramsFood: ''}]);
    const [result, setResult] = React.useState({totalFatGrams: '', neededEnzymeUnits: ''});
    const [showInfo, setShowInfo] = React.useState(false)

    const handleAddFood = () => {
        setFoods([...foods, {fatPer100GramsFood: '', eatenGramsFood: ''}])
    }

    const handleRemoveFood = () => {
        if (foods.length > 1) {
            setFoods(foods.slice(0, foods.length - 1))
        }
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
        <>
            <Modal show={showInfo}>
                <Modal.Header>
                    <Modal.Title>Hinweise zur Nutzung</Modal.Title>
                    <Button variant="light" className="btn-close rounded-circle" onClick={() => setShowInfo(false)}/>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        {usageNotes}
                    </Container>
                </Modal.Body>
            </Modal>

            <Form onSubmit={handleSubmit}>
                <Container>
                    <Row>
                        <Col sm={12} className="mt-3">
                            <h3>
                                Pankreatin-Rechner
                                <Button size="sm" className="mx-3 rounded-circle" onClick={() => setShowInfo(true)}>
                                    <QuestionLg/>
                                </Button>
                            </h3>
                        </Col>
                        <Col sm={12} className="mt-3">
                            <Form.Group>
                                <FormLabel>Enzymeinheiten für 1g Fett</FormLabel>
                                <FormControl
                                    id={keyEnzymeUnitsPerGramFat}
                                    type="number"
                                    inputMode="decimal"
                                    value={enzymeUnitsPerGramFat}
                                    onChange={event => setEnzymeUnitsPerGramFat(event.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={6} className="mt-3">
                            <FormLabel>Gramm Fett in 100g Lebensmittel</FormLabel>
                        </Col>
                        <Col xs={6} className="mt-3">
                            <FormLabel htmlFor="eatenGramsFood">Gramm verzehrte Lebensmittel</FormLabel>
                        </Col>
                        {foods.map((value, index) => (
                            <React.Fragment key={index}>
                                <Col xs={6} className="mb-3">
                                    <Form.Group>
                                        <FormControl
                                            id="fatPer100GramsFood"
                                            type="number"
                                            inputMode="decimal"
                                            value={value.fatPer100GramsFood}
                                            onChange={event => handleChangeFood(event, index)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={6} className="mb-3">
                                    <Form.Group>
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
                            <Button variant="secondary" onClick={handleAddFood} className="me-2 mb-2">Lebensmittel
                                hinzufügen</Button>
                            <Button variant="danger" onClick={handleRemoveFood} className="me-2 mb-2">Lebensmittel
                                entfernen</Button>
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
        </>
    );
}

export {Calculator};