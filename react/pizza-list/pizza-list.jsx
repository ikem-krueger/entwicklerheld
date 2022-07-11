import React from 'react';

const PizzaList = ({ pizzaOffers, friends, onClickCallback }) => {
    return (
        <ul>
            {pizzaOffers.map(pizza => {
                return <li onClick={onClickCallback(pizza, friends)}>{pizza.name}</li>
            })}
        </ul>
    )
}

function printPizzaFans(friends, pizzaOffers) {
    return friends.map(friend => {
        const favouritePizza = [];

        let mostPrefs = 0;

        pizzaOffers.forEach(pizza => {
            const isANoGo = pizza.toppings.some(topping => friend.noGos.includes(topping));

            if(!isANoGo) {
                const numPrefs = friend.preferences.filter(preference => pizza.toppings.includes(preference)).length

                if(numPrefs > mostPrefs) {
                    favouritePizza.length = 0;

                    mostPrefs = numPrefs;
                }

                if(numPrefs >= mostPrefs && !favouritePizza.includes(pizza.name))
                    favouritePizza.push(pizza.name);
            }
        });

        return { name: friend.name, favouritePizza: favouritePizza.sort().join(", ") };
    });
}

function printFriendsForAPizza(pizza, friends) {
    const pizzaFriends = [];

    let mostPrefs = 0;

    friends.forEach(friend => {
        const isANoGo = pizza.toppings.some(topping => friend.noGos.includes(topping));

        if(!isANoGo) {
            const numPrefs = friend.preferences.filter(preference => pizza.toppings.includes(preference)).length

            if(numPrefs > mostPrefs) {
                pizzaFriends.length = 0;

                mostPrefs = numPrefs;
            }

            if(numPrefs >= mostPrefs && !pizzaFriends.includes(friend.name))
                pizzaFriends.push(friend.name);
        }
    })

    return pizzaFriends.sort().join(", ");
}

export { PizzaList, printPizzaFans, printFriendsForAPizza };
