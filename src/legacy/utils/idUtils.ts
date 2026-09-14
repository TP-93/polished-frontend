// @ts-nocheck
export const extractId = (base64EncodedString: string) =>
  window.atob(base64EncodedString).split(':')[1];

export const makeId = (type: string, id: any) => window.btoa(`${type}:${id}`);
