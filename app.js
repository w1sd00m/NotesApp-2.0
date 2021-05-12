/*
 * Author: Erick Ruh Cardozo (W1SD00M) - <erickruhcardozo1998@gmail.com>
 * Date: May 11, 2021 - 12:50 PM
*/

import { Inspector, ShowType } from './inspector.js';
import NotesList from './noteslist.js';

const AppState = {
  Idle: 0,
  Creating: 1,
  Inspecting: 2,
  Editing: 3
};

export default class App {
  get state() {
    return this._state;
  }
  
  set state(value) {
    this._state = value;
    
    switch (value) {
      case AppState.Idle:
        this.title = 'Your Notes';
        this.inspector.hide().then(() => {
          this.notesList.show();
        });
        break;
      
      case AppState.Creating:
        this.title = 'New Note';
        this.notesList.hide().then(() => {
          this.inspector.show(ShowType.Create);
        });
        break;
        
      case AppState.Inspecting:
        this.title = 'View Note';
        this.notesList.hide().then(() => {
          this.inspector.show(ShowType.Inspect, this.noteToInspect);
        });
        break;
      
      case AppState.Editing:
        this.title = 'Edit Note';
        this.notesList.hide().then(() => {
          this.inspector.show(ShowType.Edit, this.noteToEdit);
        });
        break;
    }
  }
  
  set title(value) {
    $('#topbarTitle').text(value);
  }
  
  constructor() {
    this.notesList = new NotesList(
      (note) => this.inspectNote(note)
    );
    this.inspector = new Inspector(
      (title, contents) => this.onInspectorSave(title, contents),
      () => this.onInspectorCancel(),
      () => this.onInspectorDone()
    );
    $('#toolbar i:contains(add)').click(() => this.createNote());
    $('#toolbar i:contains(edit)').click(() => this.editNote());
    $('#toolbar i:contains(delete)').click(() => this.deleteNote());
    this.state = AppState.Idle;
    setTimeout(() => {
      $('#splash').fadeOut('fast', () => { 
        $('#splash').remove();
      });
    }, 1500);
  }
  
  createNote() {
    this.state = AppState.Creating;
  }
  
  onInspectorSave(title, contents) {
    switch (this.state) {
      case AppState.Creating:
        this.notesList.addNote(title, contents);
        break;
        
      case AppState.Editing:
        this.notesList.editNote(this.noteToEdit, title, contents);
        break;
    }
    
    this.state = AppState.Idle;
  }
  
  inspectNote(note) {
    this.noteToInspect = note;
    this.state = AppState.Inspecting;
  }
  
  onInspectorCancel() {
    this.state = AppState.Idle;
  }
  
  onInspectorDone() {
    this.state = AppState.Idle;
  }
  
  editNote() {
    if (this.notesList.selectedItem) {
      this.noteToEdit = this.notesList.selectedNote;
      this.state = AppState.Editing;
    }
  }
  
  deleteNote() {
    if (this.notesList.selectedItem) {
      let note = this.notesList.selectedNote;
      this.notesList.removeNote(note);
    }
  }
}