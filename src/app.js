(function() {

  var defaults = {
    settings: {
      invertColors: false
    }
  };

  var documentId = setDocumentId(location.hash.replace(/^#/, ''));
  var editor = document.getElementById('js-editor');

  populateStorage('settings', defaults.settings);
  populateStorage(documentId, []);

  var settings = JSON.parse(localStorage.getItem('settings'));
  var notes = JSON.parse(localStorage.getItem(documentId));

  // initialize settings
  setSettings(settings);

  // load notes into editor
  editor.value = notes.join('\n');

  editor.addEventListener('input', function(e) {
    updateNotes(this, notes);
  }, false);

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
   * @param  {Array}   notes
   */
  function updateNotes(editor, notes) {
    var lines = editor.value.split('\n');
    var lineNumber = getLineNumber(editor);
    var lineContent = lines[lineNumber - 1];

    if (lineContent === '' && lineNumber === lines.length) {
      notes.splice(lineNumber - 1, 1);
    }
    else {
      notes[lineNumber - 1] = lineContent;
    }

    // update localStorage
    localStorage.setItem(documentId, JSON.stringify(notes));
  }

  /**
   * setSettings
   * @param  {Object} settings
   */
  function setSettings(settings) {
    var name, value;
    for (var key in settings) {
      if (settings.hasOwnProperty(key)) {
        name = 'data-' + key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        value = settings[key];
        document.documentElement.setAttribute(name, value);
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

})();
