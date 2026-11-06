import { expect, test } from 'bun:test';
import { INDUS_QUIZ } from './indusQuiz';

test('the quiz contains exactly four questions', () => {
  expect(INDUS_QUIZ.length).toBe(4);
});

test('Q1 accepts only the undeciphered answer', () => {
  expect(INDUS_QUIZ[0].correctAnswer).toBe('No, it is still undeciphered');
  expect(INDUS_QUIZ[0].options.filter((option) => option === INDUS_QUIZ[0].correctAnswer)).toHaveLength(1);
});

test('Q2 accepts the mature Harappan period', () => {
  expect(INDUS_QUIZ[1].correctAnswer).toBe('About 2600 to 1900 BCE');
  expect(INDUS_QUIZ[1].options.filter((option) => option === INDUS_QUIZ[1].correctAnswer)).toHaveLength(1);
});

test('Q3 accepts very short inscriptions', () => {
  expect(INDUS_QUIZ[2].correctAnswer).toBe('Very short, often only a handful of signs');
  expect(INDUS_QUIZ[2].options.filter((option) => option === INDUS_QUIZ[2].correctAnswer)).toHaveLength(1);
});

test('Q4 accepts Mohenjo-daro', () => {
  expect(INDUS_QUIZ[3].correctAnswer).toBe('Mohenjo-daro');
  expect(INDUS_QUIZ[3].options.filter((option) => option === INDUS_QUIZ[3].correctAnswer)).toHaveLength(1);
});