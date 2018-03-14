'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Webpages", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "create-webpage-table",
    "created": "2018-03-12T13:56:39.780Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "Webpages",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "autoIncrement": true,
                "primaryKey": true,
                "allowNull": false
            },
            "name": {
                "type": Sequelize.STRING,
                "unique": true,
                "allowNull": false
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "allowNull": false
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
