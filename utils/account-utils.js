const extractUserIdandAccountInfo = (accountInfo) => {
    let {userId} = accountInfo;
    delete accountInfo.userId

    return userId;
}

const convertAccountKeysfromCamelToSnake = (object) => {
    if(object.firstName)
    {
        object.first_name = object.firstName;
        delete object.firstName;
    }
    if(object.lastName)
    {
        object.last_name = object.firstName;
        delete object.lastName;
    }
    if(object.createdAt)
    {
        object.created_at = object.createdAt;
        delete object.createdAt;
    }
    if(object.modifiedAt)
    {
        object.modified_at = object.modifiedAt;
        delete object.modifiedAt;
    }
}

module.exports = {
    extractUserIdandAccountInfo,
    convertAccountKeysfromCamelToSnake
}