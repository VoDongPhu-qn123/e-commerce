const scrapers = require("./scraper");
const fs = require("fs");
const scrapeController = async (browserInstance) => {
  const url = "https://digital-world-2.myshopify.com/";
  try {
    let browser = await browserInstance;
    // gọi hàm cạo ở file scraper
    const categories = await scrapers.scraperCategory(browser, url);
    const itemLinks = await Promise.all(
      categories.map((category) =>
        scrapers.scraperItems(browser, category.link)
      )
    );
    // Gom tất cả các link thành một mảng
    const links = itemLinks.flat();
    const result = await Promise.all(
      links.map((link) => scrapers.scraperItem(browser, link))
    );
    //let result = [];
    // Chạy song song các category
    // await Promise.all(
    //   categories.map(async (category) => {
    //     const dataItems = await scrapers.scraperItems(browser, category.link);
    //     //Chạy song song các item trong mỗi category
    //     const items = await Promise.all(
    //       dataItems.map(async (dataItem) => {
    //         return await scrapers.scraperItem(browser, dataItem);
    //       })
    //     );
    //     result[category.category] = items;
    //   })
    // );
    fs.writeFile("ecommerce.json", JSON.stringify({ result }), (err) => {
      if (err) {
        console.log("Ghi vô file thất bại: " + err);
      } else {
        console.log("Ghi data vô file thành công");
      }
    });
  } catch (err) {
    console.log("Lỗi ở scrape controller: " + err);
  }
};
module.exports = scrapeController;
