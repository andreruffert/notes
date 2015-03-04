(function() {

  var defaults = {
    settings: {
      invertColors: false
    }
  };

  populateStorage('settings', defaults.settings);
  populateStorage('notes', []);


  var editor = document.getElementById('js-editor');
  var settings = JSON.parse(localStorage.getItem('settings'));
  var notes = JSON.parse(localStorage.getItem('notes'));

  // initialize settings
  setSettings(settings);

  // load notes into editor
  editor.value = notes.join('\n');

  editor.addEventListener('input', function(e) {
    updateNotes(this, notes);
  }, false);


  /**
   * updateNotes
   * @param  {Element} editor
   * @param  {Array}   notes
   */
  function updateNotes(editor, notes) {
    var lines = editor.value.split('\n');
    var lineNumber = editor.value.substr(0, editor.selectionStart).split('\n').length;
    var lineContent = lines[lineNumber - 1];

    if (lineContent === '' && lineNumber === lines.length) {
      notes.splice(lineNumber - 1, 1);
    }
    else {
      notes[lineNumber - 1] = lineContent;
    }

    // update localStorage
    localStorage.setItem('notes', JSON.stringify(notes));
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
