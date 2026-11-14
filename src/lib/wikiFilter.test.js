import { expect, test } from 'bun:test';
import { filterWiki, groupWiki } from './wikiFilter';
const terms = [{term:'Élan',blurb:'A Himalayan school',url:'a'},{term:'Dharma',blurb:'Duty and ethics',url:'b'},{term:'Ashoka',blurb:'An emperor',url:'c'}];
test('search ignores case and accents', () => expect(filterWiki(terms,'ELAN')).toEqual([terms[0]]));
test('search includes blurbs', () => expect(filterWiki(terms,'HIMALAYAN')).toEqual([terms[0]]));
test('empty search returns every term', () => expect(filterWiki(terms,' ')).toEqual(terms));
test('unmatched search is empty', () => expect(filterWiki(terms,'not-present')).toEqual([]));
test('alphabetic groups sort terms and normalize initials', () => expect(groupWiki(terms).map(g=>[g.letter,g.terms.map(t=>t.term)])).toEqual([['A',['Ashoka']],['D',['Dharma']],['E',['Élan']]]));
