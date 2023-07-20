// this is my lambda entry point.
const {awsCredentials} = require("./bin/credentials")
const {DescribeInstances} = require("./controller/ec2")
module.exports.handler = async(event) => {
    console.log("getting instances...")
    const instancesInfo = await DescribeInstances(awsCredentials,{});
    console.log("here are all instances:", JSON.stringify(instancesInfo,null,2));
    return "done"
};