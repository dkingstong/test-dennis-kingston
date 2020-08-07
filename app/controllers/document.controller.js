import { db } from '../models';
import _ from 'lodash';
import { docToVersionedDoc } from './helpers/versionedDoc.helper';

const DocumentController = {
  index: async (req, res) => {
    const { Document } = await db.getModels();
    const documents = await Document.findAll();
    return res.status(200).json({ documents });
  },

  create: async (req, res) => {
    const { Document, User, UserDocument } = await db.getModels();
    const { userId } = req.params;
    if (!req.body.name) {
      return res.status(400).json({ message: 'Document must have a name' });
    }

    // in order to create a doc a user must exist in the DB
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const document = new Document(req.body);
    document.version = 1;
    await document.save();
    // save the relation in the relation table
    await new UserDocument({
      userId,
      documentId: document.id,
      //  isOwner: true
    }).save();
    return res.status(200).json({ document });
  },

  show: async (req, res) => {
    const { documentId } = req.params;

    try {
      const { Document } = await db.getModels();

      const document = await Document.findOne({
        where: {
          id: documentId,
        },
      });
      if (!document) {
        return res
          .status(404)
          .json({ message: `Document ${documentId} not found` });
      }

      return res.status(200).json({ document });
    } catch (error) {
      return res.status(500).json({
        err: error.message,
        message: 'Unexpected error',
      });
    }
  },

  update: async (req, res) => {
    const { documentId } = req.params;

    try {
      const { Document, VersionedDoc } = await db.getModels();
      const document = await Document.findOne({
        where: {
          id: documentId,
        },
      });

      if (!document) {
        return res
          .status(404)
          .json({ message: `Document ${documentId} not found` });
      }
      //convert from document to versionedDocument
      const versionedDocument = docToVersionedDoc(document);

      await new VersionedDoc(versionedDocument).save();

      await document.update({
        version: document.version + 1,
        ...req.body,
      });

      return res.status(200).json({ document });
    } catch (error) {
      return res.status(500).json({
        err: error.message,
        message: 'Unexpected error',
      });
    }
  },

  share: async (req, res) => {
    try {
      const { documentId } = req.params;
      const { userIds } = req.body;
      const { UserDocument, User } = await db.getModels();

      // check if user exists to add it to the doc
      for (let userId of userIds) {
        const user = User.findOne({
          where: {
            id: userId,
          },
        });
        if (user) {
          await new UserDocument({
            documentId,
            userId,
          }).save();
        }
      }

      return res.status(200).json({ message: 'Shared successfully' });
    } catch (error) {
      return res.status(500).json({
        err: error.message,
        message: 'Unexpected error',
      });
    }
  },
};

export default DocumentController;
