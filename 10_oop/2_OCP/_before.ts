class OperatingSystemInfo {
  fileExtensionTable: Record<string, string> = {
    Windows: 'exe',
    Linux: 'deb',
    Macintosh: 'dmg',
  };

  creatorTable: Record<string, string> = {
    Windows: 'Bill Gates',
    Linux: 'Linus Torvalds',
    Macintosh: 'Steve Jobs',
  };

  bornDateTable: Record<string, number> = {
    Windows: 1985,
    Linux: 1991,
    Macintosh: 1984,
  };

  getFilesExtension(os: string): string {
    const fileExtension = this.fileExtensionTable[os];
    if (!fileExtension) return 'unknown!';

    return fileExtension;
  }

  getCreator(os: string): string {
    const creator = this.creatorTable[os];
    if (!creator) return 'unknown!';

    return creator;
  }

  getBornDate(os: string): number {
    const bornDate = this.bornDateTable[os];
    if (!bornDate) return -1;

    return bornDate;
  }
}
