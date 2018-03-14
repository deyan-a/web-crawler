'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "Battery" on table "Features"
 * changeColumn "RAM" on table "Features"
 * changeColumn "camera" on table "Features"
 * changeColumn "size" on table "Features"
 *
 **/

var info = {
    "revision": 4,
    "name": "noname",
    "created": "2018-03-13T10:07:23.393Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "changeColumn",
        params: [
            "Features",
            "Battery",
            {
                "type": Sequelize.STRING,
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Features",
            "RAM",
            {
                "type": Sequelize.STRING,
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Features",
            "camera",
            {
                "type": Sequelize.STRING,
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Features",
            "size",
            {
                "type": Sequelize.STRING,
                "allowNull": false
            }
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
