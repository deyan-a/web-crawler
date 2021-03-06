'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Brands", deps: []
 * createTable "Features", deps: []
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2018-03-13T06:25:48.760Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Brands",
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
    },
    {
        fn: "createTable",
        params: [
            "Features",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "model": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "size": {
                    "type": Sequelize.DECIMAL,
                    "allowNull": false
                },
                "camera": {
                    "type": Sequelize.DECIMAL,
                    "allowNull": false
                },
                "chipset": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "RAM": {
                    "type": Sequelize.DECIMAL,
                    "allowNull": false
                },
                "Battery": {
                    "type": Sequelize.DECIMAL,
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
    }
];

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
