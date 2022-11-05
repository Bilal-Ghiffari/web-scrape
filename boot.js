const pptr = require('puppeteer');
const fs = require('fs');

// const Bot = {
//     const init = async () => {

//     } 
// }

class Bot {
    browser = null;
    page = null;



    async init() {
        // meluncurkan browser
        this.browser = await pptr.launch({headless: false});
        this.page = await this.browser.newPage();
        this.page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
        );
    }

    async start() {
        // start to web
        const urlWeb = "https://www.solopos.com/soloraya/solo";
        // const urlWeb = "https://www.kompas.com/";
        await this.page.goto(urlWeb, {timeout: 0});
        await this.scrape();
    }

    async scrape() {
        const data = [];
        // fetching data
        // const targets = await this.page.$('div.col-12.mb-10.content-box');
        // const targets = await this.page.$$('div.article__list.clearfix');
        const targets = await this.page.$$('div.col-12.mb-10.content-box');

        // const thumbnail = await targets.$eval('div.post-thumb.post-list_feed img', img => img.getAttribute('src'));

        // const title = await targets.$eval('h1.post-title.title-md a', node => node.getAttribute('title'));

        // const description = await targets.$eval('div.post-content p', node => node.textContent);

        // const time = await targets.$eval('div.post-meta.mb-7 span.post-date', node => node.textContent);

        // const item = [{
        //     thumbnail,
        //     title,
        //     description,
        //     time
        // }]

        // fs.writeFileSync('data/berita.json', JSON.stringify(item));

        // debugging with all get data berita solopos
        for (const target of targets) {
            // handle errors
            try {
                
                // url setiap card berita
                // const beritaUrl = await target.$eval('h1 a', e => e.getAttribute('title'));
                // const beritaUrl = await target.$eval('h3.article__title.article__title--medium a', node => node.getAttribute('href'));
                const beritaUrl = await target.$eval('h2.post-title.title-md a', node => node.getAttribute('href'));
                // id.push(beritaUrl);
                // console.log("link", data);
                // console.log("beritaUrl", beritaUrl[0]);
    
                const thumbnail = await target.$eval('div.post-thumb.post-list_feed img', e => e.getAttribute('src'));
                // console.log("thumbnail", thumbnail);

                const title = await target.$eval('h2.post-title.title-md a', e => e.textContent);
                // console.log("title", title);

                const description = await target.$eval('div.post-content p', e => e.textContent);
                // console.log("description", description);

                const time = await target.$eval('div.post-meta.mb-7 span.post-date', node => node.textContent);
                // console.log("time", time);
    
                // for (const id of detailBeritaUrl) {
                //     console.log("id", id)
                // }
                // const dataLink = beritaUrl.map
                // const item = [];
                // data.map()
                // const data = .map((e) => {
                //     item.push({
                //         id: e.beritaUrl,
                //         thumbnail: e.thumbnail,
                //         title: e.title,
                //         time: e.time,
                //         description: e.description
                //     })
                // })
                // const idURL = id.map((e) => e)
                // const data = [];
                data.push({
                    _id: beritaUrl,
                    title,
                    time,
                    thumbnail,
                    description
                })
                console.log("data", data);
                // data.push()
                // console.log("data", item);
                fs.writeFile('data/berita.json', JSON.stringify(data), (err) => console.log(err));
    
                console.log('=============');
            } catch (err) {
                console.log(err);
            }
        }
    }
}

module.exports = new Bot;