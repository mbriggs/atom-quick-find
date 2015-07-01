"use babel";

describe("Quick Find", () => {
  let workspace;

  beforeEach(done => {
    workspace = atom.views.getView(atom.workspace);
    atom.packages.activatePackage('quick-find').then(done, done);
  });

  it('adds a panel', () => {
    atom.commands.dispatch(workspace, 'quick-find:find');

    expect(workspace.querySelector('.quick-find-panel')).toExist();
  });
});
