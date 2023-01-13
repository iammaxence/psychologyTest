export default class Statistics {
  static generateFile(fileName: string, columns: string[], rows: string[][]) {
    const csvTable: string[][] = [columns, ...rows];
    const csvContent: string = csvTable.map((e) => e.join(';')).join('\n');

    window.electron.ipcRenderer.writeFile('write-file', [fileName, csvContent]);
  }
}
