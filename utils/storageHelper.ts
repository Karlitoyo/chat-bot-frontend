import LZString from "lz-string";

export const storageHelper = {
  saveToStorage: (key: string, data: any) => {
    try {
      const serializedData = JSON.stringify(data);
      const compressedData = LZString.compress(serializedData); // Compress data
      sessionStorage.setItem(key, compressedData);
    } catch (error) {
      console.error("Failed to save to sessionStorage:", error);
    }
  },

  loadFromStorage: (key: string) => {
    try {
      const compressedData = sessionStorage.getItem(key);
      if (!compressedData) return null;

      const decompressedData = LZString.decompress(compressedData); // Decompress data
      return JSON.parse(decompressedData || "null");
    } catch (error) {
      console.error("Failed to load from sessionStorage:", error);
      return null;
    }
  },

  clearStorage: (key: string) => {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error("Failed to clear sessionStorage:", error);
    }
  },
};
