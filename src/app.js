(function() {

  if (!localStorage.getItem('notes')) {
    localStorage.setItem('notes', JSON.stringify([]));
  }

  var editor = document.getElementById('js-editor');
  var notes = JSON.parse(localStorage.getItem('notes'));

  editor.value = notes.join('\n');

  editor.addEventListener('input', function(e) {
    var lineNumber = this.value.substr(0, this.selectionStart).split('\n').length;
    var lineContent = this.value.split('\n')[lineNumber - 1];

    // push content to array
    notes[lineNumber - 1] = lineContent;

    // update localStorage
    localStorage.setItem('notes', JSON.stringify(notes));
  }, false);

})();
