"use babel";

export default class Scanner {
  constructor(editor){
    this.editor = editor;
  }

  setExpression(searchExpression, {caseSensitive=false, regex=false}={}){
    let flags = 'g';
    if(!caseSensitive) flags += 'i';
    if(!regex) searchExpression = escapeRegExp(searchExpression);

    this.expression = new RegExp(searchExpression, flags);

    return this.expression;
  }
}

// copypasta from stackoverflow
function escapeRegExp(string){
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
