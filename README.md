# web-crawler
Telerik Alpha individual project assignment utilizing Node.js and Databases

Create a web crawler gathering and aggregating information from atleast two different web sites.
The crawler should support the following operations: 
•	npm run update
o	Gathers the information and stores it in MariaDB/MySQL instance
•	npm run statistics COMMAND:params
o	At least 3 commands for information aggregation 

Example:

Web crawler for mobile phones.
•	Gathers information from technopolis and technomarket
•	Statistics
o	Order by price
	npm run statistics order-by-price 
o	Filter by RAM, screen size, or OS
	npm run statistics filter:ram:gt:4GB
	npm run statistics filter:screen-suze:lt:5
o	Search for a specific requirement
	i.e. 4G, gorilla glass, etc...
	npm run statistics search:4g
	npm run statistics search:gorilla

Web crawler for books (goodreads.com) 
Web crawler for movies (imdb)

Technical Requirements:

•	No UI required, only CLI interface
•	Parse HTML pages, DO NOT use APIs
•	Use as much ES2015 as possible
–	async-await, promises, generators (if possible), etc..
•	Zero ESLint errors/warnings
–	Use the .eslintrc file from demos
•	Use MariaDB as data storage
–	With schemas, fulfulling the good practices
•	Use Sequelize
•	Do not use loop constructs
–	for(var i = 0; …. ), for(const el of …), for(const key in …)
–	while(….)

Optional Requirements:

•	Optimize the gathering of data
–	i.e. using an async queue, where, at each moment of time, there are exactly 5 downloading queries
•	Feel free to use any npm package available on the Web
–	i.e. jQuery for the parsing of the HTML
