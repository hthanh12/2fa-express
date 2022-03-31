const moment = require('moment')
exports.patterns = {
    username: new RegExp(/^[a-zA-Z0-9]{6,12}$/),
    mobileNumber: new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/),
    password: new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    email: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
}
exports.ACTION = {
    CREATE: "create",
    UPDATE: "update",
    DELETE: "delete",
}
exports.renderLogInfo = (action, table_user, extra = {}) => {
    console.log("🚀 ~ file: helper.js ~ line 9 ~ extra", extra)
    let {
        user,
        column,
        old_data,
        new_data,
        type,
        reason_type,
        reason
    } = extra

    let data = {
        action: action,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        table_user: table_user,
        user_type: user ? user.type : 0,
        info_user: {
            id: user ? user.id : 0,
            name: user ? user.name : "",
            email: user ? user.email : "",
            user_name: user ? user.user_name : "",
            by_it: user ? user.by_it : false
        },
    }

    if (action == this.ACTION.UPDATE) {
        data.info_update = {
            column: column || "",
            old_data: old_data || "",
            new_data: new_data || "",
            type: type || ""
        }
    }

    if (reason_type) {
        data.reason_type = reason_type
    }
    if (reason) {
        data.reason = reason
    }
    return data
}