const express =  require("express")

const app = express();
const port = process.env.PORT || 3000; //giving a port number to host on.

app.get("/", async(req, res) => {
    res.send("hello from tuni")
})

app.listen(port, () => {
    console.log(`connected ${port}`)
})

