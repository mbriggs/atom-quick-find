"use babel";

import Scanner from '../lib/scanner';
import {TextEditor} from 'atom';

let fixture = `
a quick brown fox jumps over the lazy dog;
 a Quick brown fox jumps over the working dog;
`;

describe("Scanner", () => {
  let scanner, editor;

  beforeEach(() => {
    editor = new TextEditor();
    scanner = new Scanner(editor);

    editor.setText(fixture);
  });

  describe("scanning", () => {
    it("finds correct number of results", () => {
      scanner.setExpression('quick');
      let results = scanner.scan();

      expect(results.length).toBe(2);
    });

    it("finds correct range", () => {
      scanner.setExpression('quick');
      let [first, second] = scanner.scan();

      expect(first.start.column).toBe(2);
      expect(first.start.row).toBe(1);
      expect(first.end.column).toBe(7);
      expect(first.end.row).toBe(1);

      expect(second.start.column).toBe(3);
      expect(second.start.row).toBe(2);
      expect(second.end.column).toBe(8);
      expect(second.end.row).toBe(2);
    });

    it("does case sensitive searches", () => {
      scanner.setExpression('Quick', {caseSensitive: true});
      let results = scanner.scan();

      expect(results.length).toBe(1);
    });

    it("does regexp searches", () => {
      scanner.setExpression('the (lazy|working) dog', {regex: true});
      let results = scanner.scan();

      expect(results.length).toBe(2);
    });
  });


  describe("building expressions", () => {
    it("builds a regexp", () => {
      scanner.setExpression('foo');

      expect(scanner.expression).toEqual(/foo/gi);
    });

    it("sets sensitive case", () => {
      scanner.setExpression('foo', {caseSensitive: true});

      expect(scanner.expression).toEqual(/foo/g);
    });
  });
});
