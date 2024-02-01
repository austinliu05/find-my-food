# Overview
- Developed a web application that streamlines the search for preferred dining hall meals at Brown University. T

he project involves a Python web scraping script on AWS Lambda that extracts menu data from the university's dining website once a week. This data, formatted as JSON, is sent to an S3 bucket. Another AWS Lambda function processes this information, integrating it into an AWS RDS database. The Flask server backend then retrieves and displays this data, enhancing the meal selection experience for users. Also features a user-driven voting system to highlight popular dishes, fostering a community-centric approach to meal selection.

# Drawbacks

- Brown Dining website blocks web scraping but they outsource their weekly menus. So every Monday morning, I enter the URLs of the weekly menus into the scraper.

- Currently EC2 is only hosting flask-server but front-end cannot access it as it is http and netlify is running on https (Browser security issue) Need to either find SSL certificate or deploy entirety of website
onto EC2 server instance using Node.js.

# Future Ideas

- Revamping UI and making web application look better.
  
- Plan on developing into an IOS app available on the App Store
