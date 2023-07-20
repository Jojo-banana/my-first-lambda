const { EC2Client,DescribeInstancesCommand } = require("@aws-sdk/client-ec2")

module.exports.DescribeInstances= (credentials, params) => new Promise(async (resolve) => {
    var Instances = []
    const client = new EC2Client(credentials);
    const command = new DescribeInstancesCommand(params);
    try {
        const results = await client.send(command);
        results.Reservations.forEach(reservation => {
            reservation.Instances.forEach(Instance => {
                var myData = {
                    instanceId:Instance.InstanceId,
                    state:Instance.State.Name,
                    launchTime:Instance.LaunchTime,
                    instanceType:Instance.InstanceType,
                    privateIP:Instance.PrivateIpAddress,
                }
                if (Instance.Tags && Instance.Tags.length > 0){
                    Instance.Tags.forEach(Tag => {
                        if (Tag.Key == "LaunchedBy"){
                            myData.LaunchedBy = Tag.Value
                        }
                    });
                }
                Instances.push(myData)
            });
        });
        resolve(Instances)
    } catch (err) {
        console.error(err);
        resolve()
    }
});


// instance type, private ip, who created it