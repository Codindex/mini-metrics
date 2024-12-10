import "server-only";
import { getUser } from "../dal";
import prisma from "../db/client";
import type { Formula } from "@prisma/client";

type NewFormula = {
	formula: string;
	id: number;
	authorId: number;
	createdAt: undefined;
	beginAt: string | null;
	endAt: string | null;
	period: string | null;
}

export async function getFormulaListDTO() {
	const currentUser = await getUser();
	if (!currentUser) return null;

  const formulaList = await prisma.formula.findMany({
		where: {
			authorId: currentUser.id,
		},
	});

	return formulaList;
}

export async function getFormulaDTO(formulaId: number) {
	const currentUser = await getUser();
	if (!currentUser) return null;

	const formula = await prisma.formula.findUnique({
		where: {
			id: formulaId,
			authorId: currentUser.id,
		},
	});

	return formula;
}

export async function createFormulaDTO(formula: NewFormula) {
	const currentUser = await getUser();
	if (!currentUser) return null;

	const newFormula = await prisma.formula.create({
		data: formula,
	});

	return newFormula;
}

export async function updateFormulaDTO(formula: Formula) {
	const currentUser = await getUser();
	if (!currentUser) return null;
	
	const updatedFormula = await prisma.formula.update({
		data: formula,
		where: {
			id: formula.id,
			authorId: currentUser.id,
		},
	});

	return updatedFormula;
}

export async function deleteFormulaDTO(formulaId: number) {
	const currentUser = await getUser();
	if (!currentUser) return null;

	const deletedFormula = await prisma.formula.delete({
		where: {
			id: formulaId,
			authorId: currentUser.id,
		},
	});

	return deletedFormula;
}
