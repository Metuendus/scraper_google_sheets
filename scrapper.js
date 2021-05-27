// Fuente: https://eikhart.com/blog/google-sheets-scraper
/**
 * Scrape URL, return whatever you choose with jquery-style selectors. Dependency: cheeriogs, see https://github.com/fgborges/cheeriogs
 *
 * @param {url} valid start-url
 * @return result (array values)
 *
 * @customfunction
 */
function scraper(url) {
    var result = [];
    var nombreProducto, sku, price;
    var options = {
        'muteHttpExceptions': true,
        'followRedirects': false,
    };
    try {
        // trim url to prevent (rare) errors
        url.toString().trim();
        var r = UrlFetchApp.fetch(url, options);
        var c = r.getResponseCode();
        // check for meta refresh if 200 ok
        if (c == 200) {
            var html = r.getContentText();
            var $ = Cheerio.load(html); // make sure this lib is added to your project!
            // Nombre del producto
            if ($('H1')) {
                nombreProducto = $('H1').text().trim();
            }
            // SKU
            if ($('body > div.wrapper > div > div.mod__producto > div.viewsNdescrip > div.buy-Details > div.skuMarca > div.right > h3 > span')) {
                sku = $('body > div.wrapper > div > div.mod__producto > div.viewsNdescrip > div.buy-Details > div.skuMarca > div.right > h3 > span').text().trim();
            }
            // precio
            if ($('#precioCambio')) {
                price = $('#precioCambio').text().trim();
            }
        }
        result.push([c, nombreProducto, sku, price]);
    } catch (error) {
        result.push(error.toString());
    } finally {
        return result;
    }
}