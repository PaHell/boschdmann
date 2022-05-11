const express = require("express")
const app = express()
const router = require("./router")
const cors = require("cors")
const port = 4269

let corsOptions = {
    origin: '*'
}

app.use(cors(corsOptions))

app.use("/api/v1", router)

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})