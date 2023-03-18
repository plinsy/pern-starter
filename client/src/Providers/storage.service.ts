class StorageService {
  get(key: string): string {
    return localStorage.getItem(key) ?? "";
  }

  set(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}

export default new StorageService();
