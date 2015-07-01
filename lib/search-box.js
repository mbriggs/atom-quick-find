import {template} from 'lodash';
import {View} from 'backbone';

let htmlBuilder = template(`
  <div class='block labels'>
    <span class='description'>Quick Search</span>
    <span class='options'></span>
  </div>

  <div class='find-container block'>
    <div class='editor'>
      <atom-text-editor class="editor mini" tabindex="-1" mini
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

export default class SearchBox extends View {
  tagName = 'div';
  className = 'quick-search tool-panel panel-bottom padded';

  render(){
    this.html(htmlBuilder());
    return this;
  }
}
