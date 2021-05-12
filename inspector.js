/*
 * Author: Erick Ruh Cardozo (W1SD00M) - <erickruhcardozo1998@gmail.com>
 * Date: May 11, 2021 - 11:25 AM
*/

const ShowType = {
  Create: 0,
  Inspect: 1,
  Edit: 3
};

class Inspector {
  constructor(onSave, onCancel, onDone) {
    this.card = $('#noteInspector');
    this.noteTitle = $('#noteTitle');
    this.noteContents = $('#noteContents');
    this.cancelCol = $('#cancelCol');
    this.saveCol = $('#saveCol');
    this.doneCol = $('#doneCol');
    this.onSave = onSave;
    this.onCancel = onCancel;
    this.onDone = onDone;
    this.card.find('button:contains(Cancel)').click(() => this.cancel());
    this.card.find('button:contains(Save)').click(() => this.save());
    this.card.find('button:contains(Done)').click(() => this.done());
  }
  
  show(showType, note = null) {
    switch (showType) {
      case ShowType.Create:
      case ShowType.Edit:
        this.doneCol.hide();
        this.cancelCol.show();
        this.saveCol.show();
        this.noteTitle.val(showType === ShowType.Create ? '' : note.title)
                      .removeAttr('readonly');
        this.noteContents.val(showType === ShowType.Create ? '' : note.contents)
                         .removeAttr('readonly');
        break;
      
      case ShowType.Inspect:
        this.cancelCol.hide();
        this.saveCol.hide();
        this.doneCol.show();
        this.noteTitle.val(note.title)
				      .attr('readonly', '');
        this.noteContents.val(note.contents)
				         .attr('readonly', '');
        break;
    }
  
    this.card.fadeIn('fast', () => {
      if (showType === ShowType.Create) {
        this.noteTitle.focus();
      }
    });
  }
  
  hide() {
    return new Promise((resolve) => {
      this.card.fadeOut('fast', () => {
        resolve();
      });
    });
  }
  
  save() {
    this.onSave(this.noteTitle.val(),
                this.noteContents.val());
  }
  
  cancel() {
    this.onCancel();
  }
  
  done() {
    this.onDone();
  }
}

export { Inspector, ShowType };
