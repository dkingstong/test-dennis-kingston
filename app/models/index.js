import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../config/database';
import humps from 'humps';

const Op = Sequelize.Op;
const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col,
};
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'test';
class Db {
    static config = config;
    constructor() {
        this.sequelize;
        this.Sequelize;
        this.dbStore = this.initDb();
    }
    initDb = () => {
        const db = {};
        const dbConfig = Db.config[env];
        if (dbConfig) {
            this.sequelize = new Sequelize(
                dbConfig.database,
                dbConfig.username,
                dbConfig.password,
                {
                    ...dbConfig,
                    operatorsAliases,
                }
            );
        } else {
            this.sequelize = new Sequelize(
                Db.config.database,
                Db.config.username,
                Db.config.password,
                {
                    ...Db.config,
                    operatorsAliases,
                }
            );
        }
        fs.readdirSync(__dirname)
            .filter((file) => {
                return (
                    file.indexOf('.') !== 0 &&
                    file !== basename &&
                    file.slice(-3) === '.js'
                );
            })
            .forEach((file) => {
                const model = require(path.join(__dirname, file))(
                    this.sequelize,
                    Sequelize.DataTypes
                );
                db[humps.pascalize(model.name)] = model;
            });

        Object.keys(db).forEach((modelName) => {
            if (db[modelName].associate) {
                db[modelName].associate(db);
            }
        });
        this.Sequelize = Sequelize;
        return db;
    };
    getModels = async () => {
        if (!this.sequelize) {
            this.dbStore = this.initDb();
        }
        return this.dbStore;
    };

    truncateDb = async () => {
        if (!this.sequelize) {
            throw new Error('Connection is already closed');
        }
        await this.sequelize.truncate({
            cascade: true,
            restartIdentity: true,
            force: true,
        });
    };

    closeConnection = async () => {
        await this.sequelize.close();
        this.sequelize = undefined;
        this.dbStore = {};
    };
}

export const db = new Db();
