import { writeFileSync } from "fs";
import axios from 'axios'
import dotenv from 'dotenv'
import path from 'path'


dotenv.config({ path: path.resolve(process.cwd(), '../.env.local') })
let plants=[]
for(let i=1;i<=37;i++){
    const plant = (await axios.get(`https://trefle.io/api/v1/distributions?page=${i}&token=${process.env.PLANT_TOKEN}`)).data;
plants=plants.concat(plant.data)
console.log(i)
}
writeFileSync("plants.json",JSON.stringify(plants))