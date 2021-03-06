"use babel";
import {allowUnsafeNewFunction} from 'loophole';
import _ from 'underscore';
import {View} from 'backbone';


let htmlBuilder;
allowUnsafeNewFunction(() => {
  htmlBuilder = _.template(`
    <div class='block labels'>
      <span class='description'>Quick Find</span>
      <span class='options'></span>
    </div>

    <div class='find-container block'>
      <div class='editor'>
        <atom-text-editor class="quick-find-input editor mini" tabindex="-1" mini
                          placeholder-text="Find in current buffer"
                          data-grammar="text plain null-grammar"
                          data-encoding="utf8"></atom-text-editor>
      </div>

      <div class='btn-group btn-toggle btn-group-options'>
        <button class="btn">.*</button>
        <button class="btn">Aa</button>
      </div>
    </div>
  `);
});

export default View.extend({
  tagName: 'div',
  className: 'quick-find-panel',

  events: {
    'keydown': 'onKeyDown'
  },

  render(){
    this.$el.html(htmlBuilder());
    this.editor = this.$('atom-text-editor').get()[0];
    this.editorModel = this.editor.getModel();
    return this;
  },

  onKeyDown(e){
    if (e.keyCode === 27) atom.commands.dispatch(this.el, 'quick-find:dismiss');
  },

  focus(){
    this.editor.focus();
  },

  hide(){
    this.$el.hide();
  },

  show(){
    this.$el.show();
  }
});
