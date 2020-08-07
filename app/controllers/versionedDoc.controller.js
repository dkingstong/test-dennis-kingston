import { db } from '../models';
import _ from 'lodash';

const VersionedDocController = {
  index: async (req, res) => {
    const { VersionedDoc } = await db.getModels();
    const versionedDocs = await VersionedDoc.findAll();
    return res.status(200).json({ versionedDocs });
  },
};

export default VersionedDocController;
