import { db } from '../models';
import _ from 'lodash';
import { Op } from 'sequelize';

const UserController = {
  index: async (req, res) => {
    const { User } = await db.getModels();
    const users = await User.findAll();
    return res.status(200).json({ users });
  },

  create: async (req, res) => {
    const { User } = await db.getModels();

    if (!req.body.firstName || !req.body.email) {
      return res.status(400).json({ message: 'User must have name and email' });
    }

    const user = new User(req.body);
    await user.save();
    return res.status(200).json({ user });
  },

  show: async (req, res) => {
    const { userId } = req.params;

    try {
      const { User } = await db.getModels();
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return res
          .status(404)
          .json({ message: `Document ${documentId} not found` });
      }

      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({
        err: error.message,
        message: 'Unexpected error',
      });
    }
  },

  update: async (req, res) => {
    const { userId } = req.params;

    try {
      const { User } = await db.getModels();
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return res.status(404).json({ message: `user ${userId} not found` });
      }
      await user.update(_.pick(req.body, ['firstName', 'lastName']));

      return res.status(200).json({
        user,
      });
    } catch (error) {
      return res.status(500).json({
        err: error.message,
        message: 'Unexpected error',
      });
    }
  },

  getUserDocuments: async (req, res) => {
    const { userId } = req.params;
    const { Document, User } = await db.getModels();

    const userDocuments = await Document.findAll({
      include: [
        {
          model: User,
          as: 'user',
          where: {
            id: userId,
          },
          attributes: ['firstName'],
        },
      ],
    });

    return res.status(200).json({ userDocuments });
  },
};

export default UserController;
