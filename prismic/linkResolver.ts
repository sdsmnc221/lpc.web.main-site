export default (doc: any) => {
  if (doc.type === "page") {
    return `/${doc.uid}`;
  }
};
