"use babel";

import Scanner from '../lib/scanner';
import {TextEditor} from 'atom';

let fixture = `
a quick brown fox jumps over the lazy dog;
a quick brown fox jumps over the lazy dog;
`;

describe("Scanner", () => {
  let scanner, editor;

  beforeEach(() => {
    editor = new TextEditor();
    scanner = new Scanner(editor);

    editor.setText(fixture);
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
