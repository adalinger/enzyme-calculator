package com.example.enzymecalculator.http

data class CalculatorRequest(
        val enzymeUnitsPerGramFat: Double,
        val foods: List<Food>
) {
    data class Food(
            val fatPer100GramsFood: Double,
            val eatenGramsFood: Double
    )
}