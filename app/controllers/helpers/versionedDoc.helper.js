export function docToVersionedDoc(document) {
  const { id, created_at, updated_at, ...versionedDoc } = document.dataValues;
  return {
    documentId: document.id,
    ...versionedDoc,
  };
}
