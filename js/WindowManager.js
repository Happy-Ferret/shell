/**
 * Window Manager.
 *
 * Manages app windows.
 */

var WindowManager = {

  /**
   * The collection of App Windows.
   */
  windows: [],

  /**
   * The collection of App Window Buttons used to select an App Window.
   */
  windowSelectors: [],

  /**
   * The number of windows opened in this session.
   */
  windowCount: 0,

  /**
   * The ID of the currently displayed window.
   */
  currentWindow: null,

  /**
   * Start the Window Manager.
   *
   * @return {Object} The WindowManager object.
   */
  start: function() {
    window.addEventListener('_windowrequested',
      this.handleWindowRequest.bind(this));
    return this;
  },

  /**
   * Handle _windowrequested event.
   *
   * @param {Event} e _windowrequested event.
   */
  handleWindowRequest: function(e) {
    if (e.detail && e.detail.id != null) {
      this.switchWindow(e.detail.id);
    } else {
      this.createWindow();
    }
  },

  /**
   * Create a new window.
   */
  createWindow: function() {
    var id = this.windowCount;

    var newWindow = new BrowserWindow(id);
    this.windows[id] = newWindow;

    var newWindowSelector = new WindowSelector(id);
    this.windowSelectors[id] = newWindowSelector;

    this.switchWindow(id);
    this.windowCount++;
  },

  /**
   * Switch to a window.
   *
   * @param {Integer} id The ID of the BrowserWindow to switch to.
   */
  switchWindow: function(id) {
    if (this.currentWindow != null) {
      this.windows[this.currentWindow].hide();
      this.windowSelectors[this.currentWindow].deselect();
    }
    this.currentWindow = id;
    this.windows[id].show();
    this.windowSelectors[id].select();
  }
};
