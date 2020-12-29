# wekan-json-2-csv

Small utility to extract all cards from a Wekan board export (JSON) into a CSV file.

## Usage

- Clone this repo
- Run `npm install`
- Run `node index.js /path/to/wekan-export.json`
- The tool will create `/path/to/wekan-export.json.csv` containing all your cards
- Use your favorite spreadsheet tool to further process the cards in the CSV

## Content

The tool will extract the following fields from each card:
- list name
- label names
- card title
- user names
- sort
- archived
- created at
- last activity date

