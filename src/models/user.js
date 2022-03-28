"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) { }
    }

    User.STATUS_ACTIVE = 1;
    User.STATUS_INACTIVE = -1;
    User.STATUSES = [User.STATUS_ACTIVE, User.STATUS_INACTIVE];

    User.GENDER_MALE = 1;
    User.GENDER_FEMALE = 2;
    User.GENDER_UNKNOWN = 3;
    User.GENDERS = [User.GENDER_MALE, User.GENDER_FEMALE, User.GENDER_UNKNOWN];

    User.TYPE_PERSONAL = 1;
    User.TYPE_ORGANIZATION = 2;
    User.TYPE_BENEFACTOR = 3;
    User.TYPE_ADMIN = 4;
    User.TYPES = [
        User.TYPE_PERSONAL,
        User.TYPE_ORGANIZATION,
        User.TYPE_BENEFACTOR,
        User.TYPE_ADMIN,
    ];

    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            roleId: {
                field: "role_id",
                type: DataTypes.INTEGER,
            },
            areaId: {
                field: "area_id",
                type: DataTypes.INTEGER,
            },
            parentId: {
                field: "parent_id",
                type: DataTypes.INTEGER,
            },
            name: {
                type: DataTypes.STRING,
                defaultValue: "",
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
            },
            phone: {
                type: DataTypes.STRING,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                defaultValue: "",
            },
            address: {
                type: DataTypes.STRING,
                defaultValue: "",
            },
            description: {
                type: DataTypes.STRING,
                defaultValue: "",
            },
            totalMembers: {
                field: "total_members",
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            representName: {
                field: "represent_name",
                type: DataTypes.STRING,
                defaultValue: "",
            },
            type: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: User.TYPE_PERSONAL,
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: User.STATUS_ACTIVE,
            },
            gender: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: User.GENDER_UNKNOWN,
            },
            websites: {
                type: DataTypes.JSONB,
                defaultValue: {
                    facebook: "#",
                },
            },
            images: {
                type: DataTypes.JSONB,
                defaultValue: {
                    image: "",
                    alt_text: "",
                },
            },
            loginInfo: {
                field: "login_info",
                type: DataTypes.JSONB,
                defaultValue: {
                    crm: "",
                    web: "",
                    app: "",
                    login_at: null
                },
            },
            otp: {
                type: DataTypes.JSONB,
                defaultValue: {},
            },
            logs: {
                type: DataTypes.JSONB,
                defaultValue: {
                    list: [],
                },
            },
            meta: {
                type: DataTypes.JSONB,
                defaultValue: {},
            },
            extra: {
                type: DataTypes.JSONB,
                defaultValue: {},
            },
            birthday: {
                type: DataTypes.DATE,
                defaultValue: Date.parse("01 Jan 1990"),
            },
            deletedAt: {
                field: "deleted_at",
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            tableName: "users",
            modelName: "User",
            updated_at: "updatedAt",
            created_at: "createdAt",
            underscored: true,
            timestamps: true,
        }
    );

    return User;
};