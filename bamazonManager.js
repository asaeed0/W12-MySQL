//  npm dependencies
const inquirer = require('inquirer');
require("dotenv").config();

const connection = require('./connection');

const prompts = {
    
    initial: [
        {
            name: "options",
            type: "list",
            message: 'Choose an Option',
            choices: [
                'View Products',
                'View Low Inventory',
                'Add to Inventory',
                'Add new Product',
            ],
        },
    ],

    addInventory: [
        {
            name: 'product',
            type: 'list',
            message: 'Which product\'s inventory would you like to update?',
            choices: [],
        },
        {
            name: 'quantity',
            type: 'input',
            message: 'How many units would you like to add?',
        },
    ],

    addProduct: [
        {
            name: 'name',
            type: 'input',
            message: 'Product name:',
        },
        {
            name: 'department',
            type: 'input',
            message: 'Department:',
        },
        {
            name: 'price',
            type: 'input',
            message: "Price:"
        },
        {
            name: 'quantity',
            type: 'input',
            message: 'Quantity:',
        },
    ]
}

const querys = {

    selectAll: 'SELECT * FROM products',
    updateInventory: 'UPDATE products SET stock_quantity = stock_quantity + ? WHERE product_name = ?',
    addProduct: 'INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)',
}

function manager() {
    inquirer
        .prompt(prompts.initial)
        .then( answers => {
            connection.query(querys.selectAll, (err, res) => {
                if(err) throw err;

                switch(answers.options) {

                    case prompts.initial[0].choices[0]:
                        console.log(`Item ID | Product Name | Department Name | Price | Quantity Remaining |`);
                        for (let item of res) {
                            console.log(`${item.item_id} | ${item.product_name} | ${item.department_name} | ${item.price} | ${item.stock_quantity} |`);
                        }
                        manager();
                        break;

                    case prompts.initial[0].choices[1]:
                        console.log(`Item ID | Product Name | Department Name | Price | Quantity Remaining |`);
                        for (let item of res) {
                            if (item.stock_quantity < 5) {
                                console.log(`${item.item_id} | ${item.product_name} | ${item.department_name} | ${item.price} | ${item.stock_quantity} |`);
                            }
                        }
                        manager();
                        break;

                    case prompts.initial[0].choices[2]:
                        prompts.addInventory[0].choices = res.map(x => x.product_name);
                        inquirer.prompt(prompts.addInventory)
                            .then( answers => {
                                // TODO
                                connection.query(querys.updateInventory, [answers.quantity , answers.product], (err, res) => {
                                    if(err) throw err;
                                    console.log(`${answers.product}'s inventory successfully updated!`);
                                    manager();
                                })
                            })
                        break;

                    case prompts.initial[0].choices[3]:
                        inquirer.prompt(prompts.addProduct)
                            .then( answers => {
                                connection.query(querys.addProduct, [answers.name, answers.department, answers.price, answers.quantity], (err, res) => {
                                    if(err) throw err;
                                    console.log(`${answers.name} successfully added!`);
                                    manager();
                                })
                            })
                        break;
                }

            })
        }
    );
};


manager();