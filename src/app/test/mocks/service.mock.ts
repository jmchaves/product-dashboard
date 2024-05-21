export class ServiceMock {
  getAll() {
    return {
      subscribe: (callback: any) => {
        callback([]);
      },
    };
  }

  sort() {
    return [];
  }
}
