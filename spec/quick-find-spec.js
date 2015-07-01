"use babel";

describe("Quick Find", () => {
  let workspace, activation;

  beforeEach(() => {
    workspace = atom.views.getView(atom.workspace);
    activation = atom.packages.activatePackage('quick-find');
    jasmine.attachToDOM(workspace);
  });

  it('adds a panel', () => {
    atom.commands.dispatch(workspace, 'quick-find:find');

    waitsForPromise(() => activation);

    runs(() => {
      expect(workspace.querySelector('.quick-find-panel')).toExist();
    });
  });

  it('only allows one panel', () => {
    atom.commands.dispatch(workspace, 'quick-find:find');
    atom.commands.dispatch(workspace, 'quick-find:find');

    waitsForPromise(() => activation);

    runs(() => {
      expect(workspace.querySelectorAll('.quick-find-panel').length).toBe(1);
    });
  });

  it('has a visible panel', () => {
    atom.commands.dispatch(workspace, 'quick-find:find');

    waitsForPromise(() => activation);

    runs(() => {
      expect(workspace.querySelector('.quick-find-panel')).toBeVisible();
    });
  });

  it('hides the panel when dismissed', () => {
    atom.commands.dispatch(workspace, 'quick-find:find');

    waitsForPromise(() => activation);

    runs(() => {
      let panel = workspace.querySelector('.quick-find-panel');
      atom.commands.dispatch(panel, 'quick-find:dismiss');
      expect(panel).not.toBeVisible();
    });
  });

  it('can be reshown', () => {
    atom.commands.dispatch(workspace, 'quick-find:find');

    waitsForPromise(() => activation);

    runs(() => {
      let panel = workspace.querySelector('.quick-find-panel');
      atom.commands.dispatch(panel, 'quick-find:dismiss');
      atom.commands.dispatch(workspace, 'quick-find:find');

      expect(panel).toBeVisible();
      expect(workspace.querySelectorAll('.quick-find-panel').length).toBe(1);
    });

  });
});
