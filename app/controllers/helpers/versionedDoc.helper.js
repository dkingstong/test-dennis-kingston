export function docToVersionedDoc(document) {
  document.version = document.version + 1;
  const { id, ...versionedDoc } = document;
  return {
    documentId: document.id,
    ...versionedDoc,
  };
}
