const mongoose = require('mongoose');
const Account = mongoose.model('account');

module.exports = app =>{

app.get('/account' , async(req ,res) => {

    const { rusername , rpassword } = req.query;
    if(rusername == null || rpassword == null)
    {
        res.send("Invalid Credentials")
        return;
    }

    var userAccount = await Account.findOne({username:rusername});
    
    if(userAccount == null)
    {
        console.log("create new account");

        var newAccount = new Account({
            username : rusername,
            password : rpassword,

            lastAuthentication : Date.now()

        });
        await newAccount.save();

        res.send(newAccount);
        return;
    }
    else{
        if(rpassword == userAccount.password)
        {
            userAccount.lastAuthentication = Date.now();
            await userAccount.save();

            console.log("Retriving account....")

            res.send(userAccount);
            return;
        }
    }

    res.send("Invalid Credential");
    return;
   
});

}