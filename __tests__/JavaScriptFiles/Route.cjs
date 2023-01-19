axios = require("axios")

exports.checkRoot = () => {
    axios.get("http://10.0.2.2:3000/")
           .then(res => { console.log(res.data) })
           .catch(err => { console.log(err) })
}
