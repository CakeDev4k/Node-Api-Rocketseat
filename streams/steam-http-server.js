import {Transform} from "node:stream"
import http from "node:http"

class InverseNumberStreas extends Transform{
    _transform(chunk,encoding,callback){
        const transformed = Number(chunk.toString()) * -1

        console.log(transformed)

        callback(null, Buffer.from(String(transformed)))
    }
}


const server = http.createServer(async(req,res) => {
    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    const fullStreamContext = Buffer.concat(buffers).toString()

    console.log(fullStreamContext)

    return res.end(fullStreamContext)

    return req
            .pipe(new InverseNumberStreas())
            .pipe(res)
})

server.listen(3334)