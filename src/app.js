(function() {

  var defaults = {
    documentPrefix: 'notes',
    settings: {
      theme: {
        background: 'linear-gradient(90deg, #614385 10%, #516395 90%)',
        color: 'white'
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

  // intro placeholder
  if (notes.join('') === '') {
    editor.placeholder = "             o \n             | \n           ,'~'. \n          /     \\ \n         |   ____|_ \n         |  '___,,_'     .----------------. \n         |  ||(o |o)|   ( MAKE SOME NOTES! ) \n         |   -------     ,----------------' \n         |  _____|     -' \n         \\  '####, \n          ------- \n        /________\\ \n      (  )        |) \n      '_ ' ,------|\\ \n     /_ /  |      |_\\ \n    /_ /|  |     o| _\\ \n   /_ / |  |      |\\ _\\____/|___ \n  (  (  |  |      | (_,_,_,____/ \n   \\ _\\ |   ------| \n    \\ _\\|_________| \n     \\ _\\ \\__\\\\__\\ \n   ||/__/ |__||__| \n          |__||__| \n          |__||__| \n          /__)/__) \n         /__//__/ \n       /__//__/. \n     .'    '.   '. \n    (________)____) \n   ";
  }

  // load notes into editor
  editor.value = notes.join('\n');

  editor.addEventListener('input', debounce(function(e) {
    updateNotes(editor);
  }, 80), false);

  /**
   * setDocumentId
   * @param {String} name
   * @param {String} prefix
   */
  function setDocumentId(name) {
    return (name === '') ? defaults.documentPrefix : defaults.documentPrefix + name.charAt(0).toUpperCase() + name.slice(1);
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

  /**
   * loadTheme
   * @param  {JSON}   json
   */
  window.loadTheme = function(json) {
    settings.theme = JSON.parse(json);
    localStorage.setItem('settings', JSON.stringify(settings));
    setSettings(settings.theme);
  };

  /**
   * getDocumentNames
   * @return {Array}  Names (`document.hash`) of all existing documents
   */
  window.getDocumentNames = function() {
    var documentNames = [];
    for (i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i) !== defaults.documentPrefix && localStorage.key(i).indexOf(defaults.documentPrefix) === 0) {
        documentNames.push(localStorage.key(i).replace(defaults.documentPrefix, ''));
      }
    }
    return documentNames;
  };

  var banner = '             _ \n            | | \n _ __   ___ | |_ ___  ___ \n| \'_ \\ / _ \\| __/ _ \\/ __| \n| | | | (_) | ||  __/\\__ \\ \n|_| |_|\\___/ \\__\\___||___/\n\n\n';
  console.log('%c' + banner, 'color: rgba(0, 0, 0, .8);');
  console.group('Usage:');
  console.log('Just type in some notes.');
  console.log('Your notes get saved instantly after every key you press.');
  console.groupEnd();

  console.log('\n');

  console.group('Hidden features:');
  console.groupCollapsed('List documents');
  console.log('window.getDocumentNames();');
  console.log(window.getDocumentNames().map(name => `${location.href}#${name}`).join('\n'));
  console.groupEnd();

  console.groupCollapsed('Create new documents');
  console.log('You can create a new document by appending a document name to the url.');
  console.log('e.g: https://andreruffert.github.io/notes/#myDocumentName');
  console.groupEnd();

  console.groupCollapsed('Switch between documents');
  console.log('You can switch to a document by appending the document name to the url.');
  console.log('e.g: https://andreruffert.github.io/notes/#myDocumentName');
  console.groupEnd();

  console.groupCollapsed('Load themes');
  console.log(`window.loadTheme('{ "background": "linear-gradient(90deg, #614385 10%, #516395 90%)", "color": "white" }');`);
  console.groupEnd();
})();
