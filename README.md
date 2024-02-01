# Drawbacks

Brown Dining website blocks web scraping but they outsource their weekly menus. So every Monday morning, I enter the URLs of the weekly menus into the scraper.

Currently EC2 is only hosting flask-server but front-end cannot access it as it is http and netlify is running on https (Browser security issue) Need to either find SSL certificate or deploy entirety of website
onto EC2 server instance using Node.js.

# Future Ideas

Revamping UI and making web application look better. 
Plan on developing into an IOS app available on the App Store
