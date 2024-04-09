# Overview
- Developed a web application that streamlines the search for preferred dining hall meals at Brown University.

The project involves a Python web scraping script on AWS Lambda that extracts menu data from the university's dining website once a week. This data, formatted as JSON, is sent to an S3 bucket. Another AWS Lambda function processes this information, integrating it into an AWS RDS database. The Flask server backend then retrieves and displays this data, enhancing the meal selection experience for users. Also features a user-driven voting system to highlight popular dishes, fostering a community-centric approach to meal selection.

# Drawbacks

- Brown Dining website blocks web scraping but they outsource their weekly menus. So every Monday morning, I enter the URLs of the weekly menus into the scraper.

# Future Ideas

- Revamping UI and making web application look better.
- Currently developing a search bar functionality for better user experience
- Plan on developing into an IOS app available on the App Store
