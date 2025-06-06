import { atom } from "jotai";

export const problemDescription = atom("");
export const generatedCode = atom("");
export const genCodeLangauge = atom("");
export const genCodeFlag = atom(false);
export const testCaseInput = atom([]);
export const testCaseOutput = atom([]);
export const testCaseExpectedOutput = atom([]);
