# Brown University Find My Food

https://brownfood.netlify.app/

Welcome to the Brown University Find My Food project! This web application is designed to streamline the search for preferred dining hall meals at Brown University, providing an enhanced meal selection experience.

## Overview

Find My Food is a comprehensive web application. It leverages a Python web scraping script hosted on AWS Lambda that extracts menu data from the university's dining website once a week. This data is formatted as JSON and sent to an S3 bucket. Another AWS Lambda function processes this information, integrating it into an AWS RDS database. The Flask server backend retrieves and displays this data, enhancing the meal selection experience for users. Additionally, the platform features a user-driven voting system to highlight popular dishes, fostering a community-centric approach to meal selection.

## Inspiration

The inspiration for this project stemmed from observing the suboptimal usage of the existing Brown Dining app. Many students found the app difficult to navigate and unreliable in providing accurate, up-to-date information about dining hall menus. This project aims to address these issues by providing a more user-friendly and efficient solution.

## Features

- **Up-to-date Menu Information**: Weekly updates of dining hall menus ensure users have the latest meal options.
- **User-friendly Interface**: Intuitive design for easy navigation and meal selection.
- **Voting System**: Users can vote for their favorite dishes, helping highlight popular meals.
- **Search Bar**: Quickly find specific meals or dishes with ease, enhancing the user experience.
- **Cloud Integration**: Efficient data handling and processing using AWS services.

## Tech Stack

- **Frontend**: React, HTML, CSS
- **Backend**: Python, Flask
- **Database**: AWS RDS
- **Web Scraping**: Python (BeautifulSoup, Requests), AWS Lambda
- **Storage**: AWS S3
- **Hosting**: Netlify (for frontend), AWS (for backend and data processing)
