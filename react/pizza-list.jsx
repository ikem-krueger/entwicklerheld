import React from 'react';

// Start to implement a stateless react component.
// Stateless components in react are simple functions, which return html
const PizzaList = ({ pizzaOffers, friends, onClickCallback }) => {
    return (
        <ul>
            {pizzaOffers.map((pizza) => {
                return <li>{pizza.name}</li>
            })}
        </ul>
    )
}

function printPizzaFans(friends, pizzaOffers) {
    const pizzaFans = [];
    
    friends.forEach((friend) => {
        let pizzas = [];
        let mostPreferences = 0;

        pizzaOffers.forEach((pizza) => {
            const isANoGo = pizza.toppings.some((topping) => friend.noGos.includes(topping));
            const numPreferences = preferences.filter((preference) => toppings.includes(preference)).length

            if(!isANoGo) {
                if(numPreferences > mostPreferences) {
                    pizzas = [];
                    
                    pizzas.push(pizza.name);

                    mostPreferences = numPreferences;
                }

                if(numPreferences == mostPreferences) {
                    pizzas.push(pizza.name);
                }
            }
        });

        if(pizzas.length > 0)
            pizzaFans.push({ name: friend.name, favoritePizza: pizzas.sort().join(", ") });
    });

    return pizzaFans;
}

function printFriendsForAPizza(pizza, friends) {
    return;
}

export { printPizzaFans, printFriendsForAPizza, PizzaList };
