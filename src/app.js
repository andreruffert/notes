(function() {

  if (!localStorage.getItem('notes')) {
    localStorage.setItem('notes', JSON.stringify([]));
  }

  var editor = document.getElementById('js-editor');
  var notes = JSON.parse(localStorage.getItem('notes'));

  editor.value = notes.join('\n');

  editor.addEventListener('input', function(e) {
    var lines = this.value.split('\n');
    var lineNumber = this.value.substr(0, this.selectionStart).split('\n').length;
    var lineContent = lines[lineNumber - 1];

    // update notes
    if (lineContent === '' && lineNumber === lines.length) {
      notes.splice(lineNumber - 1, 1);
    }
    else {
      notes[lineNumber - 1] = lineContent;
    }

    // update localStorage
    localStorage.setItem('notes', JSON.stringify(notes));
  }, false);

})();
