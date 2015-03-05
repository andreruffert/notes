(function() {

  var defaults = {
    settings: {
      theme: {
        background: 'linear-gradient(90deg, #232526 10%, #414345 90%)',
        color: '#fff'
      }
    }
  };

  var documentId = setDocumentId(location.hash.replace(/^#/, ''));
  var editor = document.getElementById('js-editor');

  populateStorage('settings', defaults.settings);
  populateStorage(documentId, []);

  var settings = JSON.parse(localStorage.getItem('settings'));
  var notes = JSON.parse(localStorage.getItem(documentId));

  // initialize settings
  setSettings(settings.theme);

  // load notes into editor
  editor.value = notes.join('\n');

  editor.addEventListener('input', debounce(function(e) {
    updateNotes(editor);
  }, 100), false);

  /**
   * setDocumentId
   * @param {String} name
   * @param {String} prefix
   */
  function setDocumentId(name, prefix) {
    prefix = prefix || 'notes';
    return (name === '') ? prefix : prefix + name.charAt(0).toUpperCase() + name.slice(1);
  }

  function getLineNumber(editor) {
    return editor.value.substr(0, editor.selectionStart).split('\n').length;
  }

  /**
   * updateNotes
   * @param  {Element} editor
   */
  function updateNotes(editor) {
    localStorage.setItem(documentId, JSON.stringify(editor.value.split('\n')));
  }

  /**
   * setSettings
   * @param  {Object} settings
   */
  function setSettings(settings) {
    for (var key in settings) {
      if (settings.hasOwnProperty(key)) {
        document.documentElement.style[key] = settings[key];
      }
    }
  }

  /**
   * populateStorage
   * @param  {String} key
   * @param  {Object} props
   */
  function populateStorage(key, props) {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(props));
    }
  }

  /**
   * Returns a debounced function that will make sure the given
   * function is not triggered too much.
   *
   * @param  {Function} fn Function to debounce.
   * @param  {Number}   debounceDuration OPTIONAL. The amount of time in milliseconds for which we will debounce the function. (defaults to 100ms)
   * @return {Function}
   */
  function debounce(fn, debounceDuration) {
    debounceDuration = debounceDuration || 100;
    return function() {
      if (!fn.debouncing) {
        var args = Array.prototype.slice.apply(arguments);
        fn.lastReturnVal = fn.apply(window, args);
        fn.debouncing = true;
      }
      clearTimeout(fn.debounceTimeout);
      fn.debounceTimeout = setTimeout(function(){
        fn.debouncing = false;
      }, debounceDuration);
      return fn.lastReturnVal;
    };
  }

})();
