const request = require('supertest');
const server = require('../server');

const originalPackageJSON = {
scripts: {
    test: "node_modules/.bin/jest",
    dev: "nodemon start.js",
    start: "node start.js"
},
dependencies: {
    bcrypt: "^5.0.0",
    dotenv: "^8.2.0",
    express: "^4.17.1",
    jsonwebtoken: "^8.5.1",
    morgan: "^1.10.0",
    nodemon: "^2.0.4" 
},
devDependencies: {
    jest: "^26.4.2",
    supertest: "^4.0.2"
}
}

describe('PackageJSON tests', () => {
    afterAll(async () => {
        await server.close();
    })

    test('Verify Package.JSON file has not changed <strong>\!\!\!\!\!\!</strong>', async ()=>{
        const testPackageJSON = require('../package.json')
        for (let i in originalPackageJSON){
            expect(obJize(originalPackageJSON[i])).toBe(obJize(testPackageJSON[i]))
            for (let prop in originalPackageJSON[i]){
                expect(testPackageJSON[i].hasOwnProperty(prop)).toBe(true)
            }
        }
    })
})
function obJize (obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


// fs.readFileSync('../package.json', (err, data)=>{
//     if (err) return console.error(err);;
//     console.log(data)
//     return JSON.parse(data);
// })