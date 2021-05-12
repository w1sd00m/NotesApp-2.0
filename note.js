/*
 * Author: Erick Ruh Cardozo (W1SD00M) - <erickruhcardozo1998@gmail.com>
 * Date: May 11, 2021 - 1:55 PM
*/

export default class Note {
  constructor(title, contents) {
    this.edit(title, contents);
    this.created = new Date();
  }
  
  edit(title, contents) {
    this.title = title;
    this.contents = contents;
  }
}