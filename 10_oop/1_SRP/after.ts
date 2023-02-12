class Note {
  public readonly id: string;
  private text = '';

  constructor(text: string) {
    this.id = new Date().toISOString();
    this.text = text;
  }

  public show(): void {
    console.log(this.text);
  }

  public edit(newText: string): void {
    this.text = newText;
  }
}

class Setting {
  private password: string | null = null;
  private theme: 'LIGHT' | 'DARK';
  private fontSize: number;

  constructor() {
    this.password = null;
    this.theme = 'LIGHT';
    this.fontSize = 14;
  }

  private validatePassword(password: string): boolean {
    return !(password.length < 8 || password.length > 32);
  }

  public changePassword(newPassword: string): void {
    if (!this.validatePassword(newPassword)) return;

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

class Notebook {
  public readonly notes: Note[];
  public readonly setting: Setting;

  constructor() {
    this.notes = [];
    this.setting = new Setting();
  }

  public getNoteById(noteId: string): Note | undefined {
    return this.notes.find(({ id }) => id === noteId);
  }

  public createNewNote(newNote: Note): void {
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
}
