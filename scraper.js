const scraperCategory = (browser, url) =>
  new Promise(async (resolve, reject) => {
    try {
      const newPage = await browser.newPage();
      console.log("Mở tab mới");
      await newPage.goto(url);
      console.log("Truy cập vào url " + url);
      await newPage.waitForSelector("#digital-world-2");
      console.log("Web đã load xong");
      const dataCategory = await newPage.$$eval(
        "#shopify-section-all-collections > div.all-collections > div.sdcollections-content > ul.sdcollections-list > li",
        (els) =>
          els.map((el) => ({
            category: el?.querySelector("div.collection-name").innerText,
            link: el?.querySelector("a").href,
          }))
      );
      await newPage.close();
      console.log("Tab đã đóng");
      resolve(dataCategory);
    } catch (err) {
      console.log("Lỗi scraper category: " + err);
      reject(err);
    }
  });
const scraperItems = (browser, url) =>
  new Promise(async (resolve, reject) => {
    try {
      const newPage = await browser.newPage();
      console.log("Mở tab mới");
      await newPage.goto(url);
      console.log("Truy cập vào url " + url);
      const dataItems = await newPage.$$eval(
        "#collection-product-grid > div.grid-element",
        (els) =>
          els.map((el) => el?.querySelector("a.grid-view-item__link").href)
      );
      await newPage.close();
      console.log("Tab đã đóng");
      resolve(dataItems);
    } catch (err) {
      console.log("Lỗi scraper items: " + err);
      reject(err);
    }
  });
const scraperItem = (browser, url) =>
  new Promise(async (resolve, reject) => {
    try {
      const newPage = await browser.newPage();
      console.log("Mở tab mới");
      await newPage.goto(url);
      console.log("Truy cập vào url " + url);
      await newPage.waitForSelector("main.main-content");
      console.log("Web đã load xong");
      const scraperData = {};
      // Lấy tên sản phẩm
      const productName = await newPage.$eval(
        "header.section-header",
        (el) => el?.querySelector("h3").innerText
      );
      scraperData.productName = productName;
      // Lấy ảnh thumbnail sản phẩm
      const thumbnail = await newPage.$$eval(
        "#ProductThumbs > div.owl-wrapper-outer > div.owl-wrapper > div.owl-item > li.thumb__element",
        (els) => els[0]?.querySelector("a.product-single__thumbnail").href
      );
      scraperData.thumbnail = thumbnail;
      // Lấy nhiều ảnh sản phẩm
      const images = await newPage.$$eval(
        "#ProductThumbs > div.owl-wrapper-outer > div.owl-wrapper > div.owl-item > li.thumb__element",
        (els) =>
          els.map((el) => el?.querySelector("a.product-single__thumbnail").href)
      );
      scraperData.images = images;
      // Lấy giá sản phẩm
      const productPrice = await newPage.$eval(
        "#ProductPrice",
        (el) => el?.querySelector("span.money").innerText
      );
      scraperData.productPrice = productPrice;
      // Lấy mô tả sản phẩm
      const descriptionProduct = await newPage.$$eval(
        "div.product-single__description > ul.spec > li",
        (els) => els.map((el) => el.innerText)
      );
      scraperData.descriptionProduct = descriptionProduct;
      // Lấy variants
      const variants = await newPage.$$eval(
        "form.product-single__form > div.product-form__item",
        (els) =>
          els.map((el) => {
            const variantLabels = el?.querySelectorAll(
              "fieldset.single-option-radio > label"
            );
            const values = [];
            for (let variantLabel of variantLabels) {
              values.push(variantLabel.innerText);
            }
            return {
              label: el?.querySelector("label.single-option-radio__label")
                .innerText,
              variants: values,
            };
          })
      );
      scraperData.variants = variants;
      // Lấy thông tin sản phẩm
      const informationTitles = await newPage.$$eval(
        "#tabs-information > ul > li",
        (els) => els.map((el) => el?.querySelector("a").innerText)
      );
      const desc = await newPage.$eval("#desc", (el) => el.textContent);
      const size = await newPage.$eval("#size", (el) => el.textContent);
      const delivery = await newPage.$eval("#delivery", (el) => el.textContent);
      const payment = await newPage.$eval("#payment", (el) => el.textContent);
      scraperData.informations = {
        [informationTitles[0]]: desc,
        [informationTitles[1]]: size,
        [informationTitles[2]]: delivery,
        [informationTitles[3]]: payment,
      };
      await newPage.close();
      console.log("Tab đã đóng");
      resolve(scraperData);
    } catch (err) {
      console.log("Lỗi scarper item: " + err);
      reject(err);
    }
  });
module.exports = {
  scraperCategory,
  scraperItems,
  scraperItem,
};
