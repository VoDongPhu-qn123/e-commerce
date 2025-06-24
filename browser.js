const puppeteer = require("puppeteer");
const startBrowser = async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false, // Mở trình duyệt với giao diện (true ko có giao diện )
      args: ["--disable-setuid-sandbox"], // Tắt sandbox bảo vệ
      ignoreHTTPSERRORS: true, // Bỏ qua lỗi HTTPS
    });
  } catch (error) {
    console.log("Cannot create browser: " + error);
  }
  return browser;
};
module.exports = startBrowser;
