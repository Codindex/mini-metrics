"use server"

import { createFormulaDTO, getFormulaListDTO, getFormulaResultsDTO, type NewFormula } from "@/lib/dto/formula_dto";
import { compute } from "@/lib/routines/compute";

export async function createFormula(formula: NewFormula) {
  const newFormula = createFormulaDTO(formula);
  return newFormula;
}

export async function getFormulaList() {
  const formulaList = getFormulaListDTO();
  return formulaList;
}

export async function getFormulaResults(formulaId: number) {
  let formulaWithResults = await getFormulaResultsDTO(formulaId);
  if (formulaWithResults) {
    let finish = false;
    while (!finish) {
      finish = await compute(formulaWithResults!);
      formulaWithResults = await getFormulaResultsDTO(formulaId);
    }
  }
  return formulaWithResults;
}
