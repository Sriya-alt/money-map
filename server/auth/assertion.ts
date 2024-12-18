// FILE: src/api/assertion.ts
export function assert(condition: boolean, message: string): void {
    if (!condition) {
      throw new Error(message);
    }
  }