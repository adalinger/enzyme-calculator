package com.example.enzymecalculator.http

import org.springframework.web.bind.annotation.*

@RestController
class CalculatorController {
    @PostMapping("/enzymes")
    fun getNeededEnzymeUnits(@RequestBody calculatorRequest: CalculatorRequest): CalculatorResponse {
        var totalFatGrams = 0.0
        for (food in calculatorRequest.foods) {
            totalFatGrams += food.fatPer100GramsFood.div(100).times(food.eatenGramsFood)
        }
        val neededEnzymeUnits = calculatorRequest.enzymeUnitsPerGramFat.times(totalFatGrams)
        return CalculatorResponse(totalFatGrams, neededEnzymeUnits)
    }
}