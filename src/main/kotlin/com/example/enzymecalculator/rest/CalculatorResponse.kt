package com.example.enzymecalculator.rest

data class CalculatorResponse(
        val totalFatGrams: Double,
        val neededEnzymeUnits: Double
)