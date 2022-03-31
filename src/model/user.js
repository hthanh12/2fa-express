module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            mobile_number: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
            },
            dob: {
                type: DataTypes.STRING,
            },
            type: {
                type: DataTypes.INTEGER,
            },
            logs: {
                type: DataTypes.JSONB,
                defaultValue: []
            },
            meta: {
                type: DataTypes.JSONB,
                defaultValue: {}
            },
            extra: {
                type: DataTypes.JSONB,
                defaultValue: {}
            },
            token_info: {
                type: DataTypes.JSONB,
                defaultValue: {}
            },
            status: {
                type: DataTypes.INTEGER
            },
            otp_info: {
                type: DataTypes.JSONB,
                defaultValue: {}
            },
            login_info: {
                type: DataTypes.JSONB,
                defaultValue: {}
            }
        }, {
            tableName: 'users',
            updatedAt: 'updated_at',
            createdAt: 'created_at',
            deletedAt: 'deleted_at',
            underscored: true,
            timestamps: true
        }
    )


    User.TYPE_ADMIN = 1
    User.TYPE_MEMBER = 2
    User.TYPES = [{
        value: User.TYPE_ADMIN,
        name: 'Admin',
    }, {
        value: User.TYPE_MEMBER,
        name: 'Member'
    }]


    User.STATUS_ACTIVE = 1
    User.STATUS_TEMPORARILY_LOCKED = -1
    User.STATUS_PERMANENTLY_LOCKED = -2

    User.STATUSES = [{
        value: User.STATUS_ACTIVE,
        name: 'Active',
    }, {
        value: User.STATUS_TEMPORARILY_LOCKED,
        name: 'Temporarily locked'
    }, {
        value: User.STATUS_PERMANENTLY_LOCKED,
        name: 'Permanently locked'
    }]

    User.associate = function (models) {
        // associations can be defined here

    }
    let excludesDefault = ['password', 'otp_info', 'extra', 'meta', 'token_info']
    let arrInclude = () => {
        return []
    }
    User.getOne = async (id, excludes) => {
        let data = await User.findOne({
            where: {
                id
            },
            include: arrInclude(),
            attributes: {
                exclude: excludes || excludesDefault
            }
        })
        return data || null
    }
    return User
}