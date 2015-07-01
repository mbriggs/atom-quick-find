"use babel";
import {CompositeDisposable} from 'atom';
import SearchBox from './search-box';

export default {
  subscriptions: null,

  activate(){
    let searchBox = this.searchBox = new SearchBox();

    searchBox.render();
    this.searchPanel = atom.workspace.addBottomPanel({item: searchBox.el});
    searchBox.hide();

    this.subscriptions = new CompositeDisposable();
    this.subscribe('quick-find:find', this.show.bind(this));
    this.subscribe('quick-find:dismiss', this.hide.bind(this));
  },

  show(){
    this.searchBox.show();
    this.searchBox.focus();
  },

  hide(){
    this.searchBox.hide();
  },

  serialize(){
    return {};
  },

  deactivate(){
    this.subscriptions.dispose();
    if (this.searchPanel) this.searchPanel.destroy();
  },

  subscribe(topic, handler){
    let disposable = atom.commands.add('atom-workspace', topic, handler);
    this.subscriptions.add(disposable);
  }
};
  // atomSlashFindView: null
  // modalPanel: null
  // subscriptions: null
  //
  // activate: (state) ->
  //   @atomSlashFindView = new AtomSlashFindView(state.atomSlashFindViewState)
  //   @modalPanel = atom.workspace.addModalPanel(item: @atomSlashFindView.getElement(), visible: false)
  //
  //   # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
  //   @subscriptions = new CompositeDisposable
  //
  //   # Register command that toggles this view
  //   @subscriptions.add atom.commands.add 'atom-workspace', 'atom-slash-find:toggle': => @toggle()
  //
  // deactivate: ->
  //   @modalPanel.destroy()
  //   @subscriptions.dispose()
  //   @atomSlashFindView.destroy()
  //
  // serialize: ->
  //   atomSlashFindViewState: @atomSlashFindView.serialize()
  //
  // toggle: ->
  //   console.log 'AtomSlashFind was toggled!'
  //
  //   if @modalPanel.isVisible()
  //     @modalPanel.hide()
  //   else
  //     @modalPanel.show()
