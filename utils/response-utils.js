const sendResponse = (req, res)=>{

    let {response} = res;
    console.log("Response: ", response);
    if(response?.success)
        return res.status(200).json({response})
    else
        throw res.status(500).json({response});
}

module.exports = {
    sendResponse
}