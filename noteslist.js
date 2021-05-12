/*
 * Author: Erick Ruh Cardozo (W1SD00M) - <erickruhcardozo1998@gmail.com>
 * Date: May 11, 2021 - 1:05 PM
*/

import Note from './note.js';

export default class NotesList {
  get selectedNote() {
    return this.notes[this.selectedItem.index()];
  }

  constructor(onInspect) {
    this.list = $('#notesList');
    this.itemTemplate = $('#noteItemTemplate').clone();
    this.selectedItem = null;
    this.onInspect = onInspect;
    this.notes = [];
    $('#noteItemTemplate').remove();
  }
  
  show() {
    this.list.fadeIn('fast');
  }
  
  hide() {
    return new Promise((resolve) => {
      this.list.fadeOut('fast', () => {
        resolve();
      });
    });
  }
  
  createItem(note) {
    let item = this.itemTemplate.clone();
    let created = note.created.toDateString();
    item.children('[data-note-title]').text(note.title);
    item.children('[data-note-creation]').text(created);
    item.click(() => {
      if (item.is(this.selectedItem)) {
        this.onInspect(this.notes[item.index()]);
        return;
      }
      
      this.selectedItem?.removeClass('active');
      this.selectedItem = item;
      this.selectedItem.addClass('active');
    });
    
    return item;
  }
  
  addNote(title, contents) {
    let note = new Note(title, contents);
    let item = this.createItem(note);
    this.notes.push(note);
    this.list.append(item);
  }
  
  editNote(note, title, contents) {
    let i = this.notes.indexOf(note);
    let item = this.list.children().eq(i);
    this.notes[i].edit(title, contents);
    item.children('[data-note-title]').text(title);
  }
  
  removeNote(note) {
    let i = this.notes.indexOf(note);
    this.notes.splice(i, 1);
    let item = this.list.children().eq(i);
    item.fadeOut('slow', () => item.remove());
    this.selectedItem = null;
  }
}
