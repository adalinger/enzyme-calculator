package com.example.enzymecalculator.rest

import org.springframework.web.bind.annotation.*

@RestController
class CalculatorController {
    @PostMapping("/enzymes")
    fun getNeededEnzymeUnits(@RequestBody calculatorRequest: CalculatorRequest): Double {
        var eatenGramsFat = 0.0
        for (food in calculatorRequest.foods) {
            eatenGramsFat += food.fatPer100GramsFood.div(100).times(food.eatenGramsFood)
        }
        return calculatorRequest.enzymeUnitsPerGramFat.times(eatenGramsFat)
    }
}