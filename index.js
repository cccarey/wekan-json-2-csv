const fs = require('fs');
const csv = require('fast-csv');

// Prepare data
const inputFileName = process.argv[2];
const outputFileName = `${inputFileName}.csv`;
const fileData = require(inputFileName);

const labelMap = createWekanObjectMap(fileData.labels);
const listMap = createWekanObjectMap(fileData.lists);
const userMap = createWekanObjectMap(fileData.users);
const cards = fileData.cards;

// Convert to JSON
const file = fs.createWriteStream(outputFileName);
const csvStream = csv.createWriteStream({ headers: true });
csvStream.pipe(file);

cards.forEach(card => {

    const row = {
        list: getListName(card),
        labels: getLabelNames(card),
        title: card.title,
        members: getMemberNames(card),
        archived: card.archived,
        createdAt: card.createdAt,
        lastActivity: card.dateLastActivity,
    };

    csvStream.write(row);
});

csvStream.end();

// Helper
function createWekanObjectMap(wekanObjectList) {
    const map = {};
    wekanObjectList.forEach(object => {
        map[object._id] = object;
    });
    return map;
}

function getListName(card) {
    return listMap[card.listId].title;
}

function getLabelNames(card) {
    return card.labelIds
        .map(id => labelMap[id].name)
        .join(',')
}

function getMemberNames(card) {
    return card.members
        .map(id => userMap[id].username)
        .join(',')
}
