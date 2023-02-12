interface Note {
  id: string;
  text: string;
}

class Notebook {
  public readonly notes: Note[];
  private password: string;
  private theme: 'LIGHT' | 'DARK';
  private fontSize: number;

  constructor() {
    this.notes = [];
    this.password = '';
    this.theme = 'LIGHT';
    this.fontSize = 14;
  }

  public createNewNote(text = ''): void {
    const newNote: Note = { id: new Date().toISOString(), text };

    this.notes.push(newNote);
  }

  public deleteAllNotes(): void {
    this.notes.length = 0;
  }

  public deleteNote(noteId: string): void {
    const targetNote = this.notes.find(({ id }) => id === noteId);
    if (!targetNote) return console.log('노트가 없습니다.');

    const targetNoteIndex = this.notes.indexOf(targetNote);

    this.notes.splice(targetNoteIndex, 1);
  }

  public showNote(noteId: string): void {
    const targetNote = this.notes.find(({ id }) => id === noteId);
    if (!targetNote) return console.log('노트가 없습니다.');

    console.log(targetNote.text);
  }

  public editNote(noteId: string, newText: string): void {
    const targetNote = this.notes.find(({ id }) => id === noteId);
    if (!targetNote) return console.log('노트가 없습니다.');

    const targetNoteIndex = this.notes.indexOf(targetNote);

    this.notes[targetNoteIndex].text = newText;
  }

  public changePassword(newPassword: string): void {
    if (newPassword.length < 8 || newPassword.length > 32) return;

    this.password = newPassword;
  }

  public toggleTheme(): void {
    const currentTheme = this.theme;
    this.theme = currentTheme === 'LIGHT' ? 'DARK' : 'LIGHT';
  }

  public changeFontSize(newFontSize: number): void {
    if (newFontSize < 8) {
      this.fontSize = 8;
      return;
    }

    if (newFontSize > 60) {
      this.fontSize = 60;
      return;
    }

    this.fontSize = Math.floor(newFontSize);
  }
}
