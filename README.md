# Overview
https://brownfood.netlify.app/

- Developed a web application that streamlines the search for preferred dining hall meals at Brown University.

The project involves a Python web scraping script on AWS Lambda that extracts menu data from the university's dining website once a week. This data, formatted as JSON, is sent to an S3 bucket. Another AWS Lambda function processes this information, integrating it into an AWS RDS database. The Flask server backend then retrieves and displays this data, enhancing the meal selection experience for users. Also features a user-driven voting system to highlight popular dishes, fostering a community-centric approach to meal selection.
