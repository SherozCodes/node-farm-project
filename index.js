// const { log } = require('console');
const { log } = require('console');


// fs.readFile('./txt/start.txt' , 'utf-8' , (err, data) => {
//     fs.readFile(`./txt/${data}.txt`, 'utf-8', (err , data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3);
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}` , 'utf-8' , (err) => {
//                 console.log('text has been written successfully 👾');
                
                
//             })
//         })
//     })
// })

// console.log('Start⚡');




// console.log('Dastur boshlandi');

// fs.readFile('./data/user.txt' , 'utf-8' , (err, inf) => {
//     fs.readFile('./data/details.txt' , 'utf-8', (err , inf2) => {
//         fs.readFile('./data/template.txt', 'utf-8', (err, inf3) => {
//            const final = inf3.replace('[name]' , inf).replace('[info]' , inf2)
//            fs.writeFile('./data/summary.txt' , final , 'utf-8' , err => {
//             console.log('Text has been written successfully');
//             fs.readFile('./data/summary.txt' , 'utf-8' , (err, data) => {
//                 console.log(data);
                
//             })
            
//            })
//         })
//     })
// })

// const http = require('http')

// const server = http.createServer((req , res) => {
    
//     res.end('Hello from the server! 👾');
    
// });

// server.listen(8000, '127.0.0.1', () => {
//     console.log('Server is running on port 8000');
// });



const http = require('http');
const url = require('url');
const fs = require('fs');
const slugify = require('slugify')






const tempOverview = fs.readFileSync('./templates/template-overview.html', 'utf-8');
const tempProduct = fs.readFileSync('./templates/template-product.html', 'utf-8');
const tempCard = fs.readFileSync('./templates/template-card.html', 'utf-8');

const TemplateReplace = require('./modules/TemplateReplace')

const dataJson = fs.readFileSync('./dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(dataJson);


const slugs = dataObj.map(el => slugify(el.productName , { lower: true }))
console.log(slugs);





const server = http.createServer((req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*'); // Istalgan saytdan murojaat qilishga ruxsat
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); // Ruxsat berilgan metodlar
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Ruxsat berilgan sarlavhalar (Mana shu sening xatongni tuzatadi!)

   
    const { query, pathname } = url.parse(req.url, true);

    

    if(pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html',
            'My-Own-Header': 'hello-world'
        });

        const cardsHtml = dataObj.map(el => TemplateReplace(tempCard, el));
        const output = tempOverview.replace('{%PRODUCT_CARDS%}' , cardsHtml)


        res.end(output);
       
    }else if(pathname === '/api/users'){
        res.writeHead(200, {
            'Content-type': 'application/json',
            'access-control-allow-origin': '*'

        })
        res.end(dataJson);
    }else if(pathname === '/product'){
        res.writeHead(200, {
            'Content-type': 'text/html'
        })
        const product = dataObj[query.id];
        const output = TemplateReplace(tempProduct, product)
        res.end(output);

        
    }else if(pathname === '/about'){
        res.writeHead(200, {
            'Content-type': 'text/html'
        })

        res.end('<h1>Salom bu about page </h1>')
    }else if(pathname === '/contact'){
        res.writeHead(200, {
            'Content-type': 'text/html'
        })
        res.end('<h1>This is the contact page</h1>')
    }else{
        res.writeHead(404, {
            'Content-type': 'text/html'
        })

        res.end('')
    }

})


const PORT = 8000;
const HOST = '127.0.0.1';

server.listen(PORT, HOST, () => {
    console.log(`Server is running on port  ${HOST}:${PORT}`);
    
})

