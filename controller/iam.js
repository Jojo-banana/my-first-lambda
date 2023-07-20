const { IAMClient, ListUsersCommand } = require("@aws-sdk/client-iam")

module.exports.ListUsers= (credentials, params) => new Promise(async (resolve) => {
    const client = new IAMClient(credentials);
    const command = new ListUsersCommand(params);
    try {
        const results = await client.send(command);
        resolve(results)
    } catch (err) {
        console.error(err);
        resolve()
    }
});