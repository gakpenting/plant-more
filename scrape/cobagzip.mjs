import zlib from 'zlib'
import fetch,{Headers} from 'node-fetch';
import dotenv from 'dotenv'
import path from 'path'


dotenv.config({ path: path.resolve(process.cwd(), '../.env.local') })
async function asyncCompressBody(body) {

    const compressedData = await compressBody(body);
    console.log("Data Compressed");

    return compressedData;

}

function compressBody(body) {

    return new Promise( function( resolve, reject ) {

        zlib.deflate(body, (err, buffer) => {
            if(err){
                console.log("Error Zipping");
                reject(err);
            }

            console.log("Zipped");

            resolve(buffer);
        });
    });

}
let compressedBody = JSON.stringify([{"eventType":"Contact","name":"sadsa","email":"","message":"dsada"}]);

let headers = new Headers();
headers.append("Content-Type","application/json");
// headers.append("Content-Encoding","gzip");
headers.append("X-Insert-Key",process.env.KEY);
const response = await fetch(process.env.ENDPOINT,
    {method: 'POST',
    headers:headers,
    body:compressedBody});
    const papa=await response.json()
    console.log(papa)