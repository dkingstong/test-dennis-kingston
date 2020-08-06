import { db } from '../models';
import _ from 'lodash';
import { Op } from 'sequelize';

const DocumentController = {
    index: async (req, res) => {
        const { Document } = await db.getModels();
        const documents = await Document.findAll();
        return res.status(200).json({ documents });
    },
    create: async (req, res) => {
        const { Document } = await db.getModels();
        const document = new Document(req.body);
        document.documentId = Math.random().toString(36).substr(2, 9);
        document.version = 1;
        document.isLastVersion = true;
        const savedDoc = await Document.findOne({
            where: {
                documentId: document.documentId
            }
        });
        if (savedDoc) {
            return res.status(200).json({message: 'Document with that id already exists'});
        }
        await document.save();
        return res.status(200).json({ document });
    },
    show: async (req, res) => {
        const { documentId } = req.params;
        try {
            const { Document } = await db.getModels();
            const document = await Document.findOne({
                where: {
                    documentId,
                    isLastVersion: true,
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
        const { Document } = await db.getModels();
        try {
            let latestVersionDocument = await Document.findOne({
                where: {
                    documentId,
                    isLastVersion: true,
                },
            });
            if (!latestVersionDocument) {
                return res
                    .status(404)
                    .json({ message: `Document ${documentId} not found` });
            }
            const newValues = _.pick(req.body, [
                'content',
                'category',
                'url',
                'sharedTo',
                'name',
            ]);
            newValues.version = latestVersionDocument.version + 1;
            const { id, ...latestDocument } = latestVersionDocument.dataValues;
            const newLatestVersionDocument = new Document({
                ...latestDocument,
                ...newValues,
            });
            await newLatestVersionDocument.save();
            await latestVersionDocument.update({
                isLastVersion: false,
            });
            return res.status(200).json({ newLatestVersionDocument });
        } catch (error) {
            return res.status(500).json({
                err: error.message,
                message: 'Unexpected error',
            });
        }
    },
    getUserDocuments: async (req, res) => {
        const { userId } = req.params;
        const { Document } = await db.getModels();
        const userDocuments = await Document.findAll({
            where: {
                [Op.or]: [
                    { ownerUserId: userId },
                    { sharedTo: { [Op.overlap]: [userId] } },
                ],
            },
        });
        return res.status(200).json({ userDocuments });
    },
};

export default DocumentController;
