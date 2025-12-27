let state = {
    population: 1,
    food: 10,
    wood: 10,
    stone: 5,
    houses: 0,
    farms: 0,
    barracks: 0,
    soldiers: 0,
    walls: 0,
    explored: 0,
    civilisationsFound: 0
};
function explore() {
    // Require at least 1 soldier to explore
    if (state.soldiers < 1) {
        log('You need at least 1 soldier to explore.');
        return;
    }
    state.explored++;
    // 30% chance to find a civilisation per explore
    if (Math.random() < 0.3) {
        state.civilisationsFound++;
        log('You discovered a new civilisation! Total found: ' + state.civilisationsFound);
    } else {
        log('Exploration yielded no new civilisations.');
    }
    updateUI();
}

function updateUI() {
    document.getElementById('population').textContent = state.population;
    document.getElementById('food').textContent = state.food;
    document.getElementById('wood').textContent = state.wood;
    document.getElementById('stone').textContent = state.stone;
    updateGraphics();
}
// Show SVG images for buildings
function updateGraphics() {
    let html = `<div style='text-align:center;padding:16px;'>`;
    html += `<div>Houses: `;
    for (let i = 0; i < state.houses; i++) {
        html += `<img src='assets/house.svg' alt='House' style='width:40px;height:28px;margin:2px;vertical-align:middle;'>`;
    }
    html += ` <strong>${state.houses}</strong></div>`;
    html += `<div>Farms: `;
    for (let i = 0; i < state.farms; i++) {
        html += `<img src='assets/farm.svg' alt='Farm' style='width:54px;height:20px;margin:2px;vertical-align:middle;'>`;
    }
    html += ` <strong>${state.farms}</strong></div>`;
    html += `<div>Barracks: `;
    for (let i = 0; i < state.barracks; i++) {
        html += `<img src='assets/barracks.svg' alt='Barracks' style='width:40px;height:28px;margin:2px;vertical-align:middle;'>`;
    }
    html += ` <strong>${state.barracks}</strong></div>`;
    html += `<div>Walls: `;
    for (let i = 0; i < state.walls; i++) {
        html += `<img src='assets/wall.svg' alt='Wall' style='width:40px;height:14px;margin:2px;vertical-align:middle;'>`;
    }
    html += ` <strong>${state.walls}</strong></div>`;
    html += `<div>Soldiers: <strong>${state.soldiers}</strong></div>`;
    html += `<div>Explored: <strong>${state.explored}</strong></div>`;
    html += `<div>Civilisations Found: <strong>${state.civilisationsFound}</strong></div>`;
    html += `</div>`;
    document.getElementById('graphics').innerHTML = html;
}
function trainSoldier() {
    if (state.barracks > 0 && state.food >= 5 && state.population > 1) {
        state.food -= 5;
        state.population--;
        state.soldiers++;
        log('You trained a soldier!');
        updateUI();
    } else if (state.barracks === 0) {
        log('You need a barracks to train soldiers.');
    } else if (state.food < 5) {
        log('Not enough food to train a soldier.');
    } else if (state.population <= 1) {
        log('Not enough population to train a soldier.');
    }
}

function log(msg) {
    const logDiv = document.getElementById('log');
    logDiv.textContent = msg;
}

function gather(resource) {
    let amount = 2;
    if (resource === 'food' && state.farms > 0) {
        amount += state.farms * 3;
    }
    state[resource] += amount;
    log(`You gathered ${amount} ${resource}.`);
    updateUI();
}

function build(type) {
    if (type === 'house') {
        if (state.wood >= 5 && state.stone >= 2) {
            state.wood -= 5;
            state.stone -= 2;
            state.houses++;
            state.population++;
            log('You built a house! Population increased.');
        } else {
            log('Not enough resources to build a house.');
        }
    } else if (type === 'farm') {
        if (state.wood >= 8 && state.stone >= 5) {
            state.wood -= 8;
            state.stone -= 5;
            state.farms++;
            log('You built a farm! Food gathering improved.');
        } else {
            log('Not enough resources to build a farm.');
        }
    } else if (type === 'barracks') {
        if (state.wood >= 12 && state.stone >= 10) {
            state.wood -= 12;
            state.stone -= 10;
            state.barracks++;
            log('You built a barracks!');
        } else {
            log('Not enough resources to build a barracks.');
        }
    } else if (type === 'wall') {
        if (state.wood >= 6 && state.stone >= 8) {
            state.wood -= 6;
            state.stone -= 8;
            state.walls++;
            log('You built a wall!');
        } else {
            log('Not enough resources to build a wall.');
        }
    }
    updateUI();
}

// Food consumption per population per turn
function nextTurn() {
    let consumption = state.population;
    state.food -= consumption;
    if (state.food < 0) {
        state.food = 0;
        log('Your people are starving!');
    }
    updateUI();
}

// Advance turn every 20 seconds
setInterval(nextTurn, 20000);

updateUI();
