export function docToVersionedDoc(document) {
  document.version = document.version + 1;
  const { id, created_at, updated_at, ...versionedDoc } = document.dataValues;
  return {
    documentId: document.id,
    ...versionedDoc,
  };
}
