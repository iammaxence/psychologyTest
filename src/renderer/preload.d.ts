import { Channels, FileWrite } from 'main/preload';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        writeFile(channel: FileWrite, args: unknown[]): void;
        sendMessage(channel: Channels, args: unknown[]): void;
        on(
          channel: Channels,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: Channels, func: (...args: unknown[]) => void): void;
      };
    };
  }
}

export {};
