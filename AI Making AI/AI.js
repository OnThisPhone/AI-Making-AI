// Define a grid to represent the game world
// No point in having the grid for the AI be the same resolution as the map that's shown to the player.
const AIworldWidth = 40;
const AIworldHeight = 40;
var terrainMap = new Array(AIworldWidth);//Ugly implementation. But too tired to do anything about it now.
const terrainCosts = {
    lighterThanAir: -1,
    plain: 1,
    water: 3,
    mountain: 5,
    impassable: 20
};

function MakeMapAIMap() {

    /*const terrainMap = [
        ['plain', 'plain', 'water', 'plain', 'plain', 'mountain'],
        ['plain', 'water', 'water', 'plain', 'plain', 'mountain'],
        ['plain', 'water', 'water', 'water', 'plain', 'mountain'],
        ['plain', 'water', 'plain', 'plain', 'plain', 'mountain'],
        ['plain', 'plain', 'plain', 'plain', 'plain', 'mountain'],
        ['plain', 'plain', 'plain', 'plain', 'plain', 'mountain'],
    ];*/

    for (let y = 0; y < AIworldHeight; ++y) {
        terrainMap[y] = new Array(AIworldHeight);
        for (let x = 0; x < AIworldWidth; ++x) {
            terrainMap[y][x] = 0;
        }
    }
/*
    terrainMap[10][5] = terrainCosts['impassable'];
    terrainMap[11][5] = terrainCosts['impassable'];
    terrainMap[9][5] = terrainCosts['impassable'];
    terrainMap[8][5] = terrainCosts['impassable'];
    terrainMap[7][5] = terrainCosts['impassable'];
    terrainMap[6][5] = terrainCosts['impassable'];
    terrainMap[12][5] = terrainCosts['impassable'];

    terrainMap[30][9] = terrainCosts['impassable'];*/

    /*for (let x = 0; x < AIworldWidth; x++) {
        terrainMap[x] = new Array(AIworldHeight);
        for (let y = 0; y < AIworldHeight; y++) {
            terrainMap[y][x] = 0; // 0 = empty tile
        }
    }*/

    //Set so that it mimics the actual world.


    //Some debug shit
    /*grid[10][10] = 1;
    grid[10][5] = 1;
    grid[5][0] = 1;*/

    return terrainMap;
}

//Converts lines to array.
//This function should probably not be in the AI class.
//(x1 and x2) and (y1 and y2) has to be different numbers. Something to do with the algorithm that was chosen.
//Right now, you have to make the values different, but the function should just do it for you instead. Maybe later if i end up reusing this.
function lineTo2DArray(x1, y1, x2, y2, width, height) {
    const array = Array.from({ length: height }, () => Array.from({ length: width }, () => 0));
    
    x1 = Math.floor(x1/(winW/width));
    x2 = Math.floor(x2/(winW/width));
    y1 = Math.floor(y1/(winH/height));
    y2 = Math.floor(y2/(winH/height));

    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const sx = x1 < x2 ? 1 : -1;
    const sy = y1 < y2 ? 1 : -1;
  
    let err = dx - dy;
    let x = x1;
    let y = y1;
  
    while (x !== x2 || y !== y2) {
      if (x >= 0 && x < width && y >= 0 && y < height) {
        array[Math.floor(y / (height / array.length))][Math.floor(x / (width / array[0].length))] = 1;
      }
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x += sx;
      }
      if (e2 < dx) {
        err += dx;
        y += sy;
      }
    }
  
    return array;
  }
  
  
  // Example usage:
  /*const arr = lineTo2DArray(100, 0, 100, 200, 550/40, 350/40);
  console.log(arr);*/
  


//Manhattan distance with diagonal
function manhattanDistanceWithDiagonal(startNode, endNode) {
    const dx = Math.abs(endNode.x - startNode.x);
    const dy = Math.abs(endNode.y - startNode.y);
    const diagonalSteps = Math.min(dx, dy);
    const straightSteps = Math.abs(dx - dy);
    const diagonalCost = diagonalSteps * 1.4; // Cost of a diagonal step
    const straightCost = straightSteps;
    return diagonalCost + straightCost;
}
// Define a function to calculate the heuristic cost of a tile
function heuristicCost(x1, y1, x2, y2) {
    return Math.abs(x2 - x1) + Math.abs(y2 - y1); // Manhattan distance without diagonal
}

// Define a function to get the neighbors of a tile
function getNeighbors(x, y) {
    const neighbors = [];

    // Check horizontal and vertical neighbors
    const offsets = [[-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1]
    ];

    for (const [dx, dy] of offsets) {
        const nx = x + dx;
        const ny = y + dy;

        // Check if neighbor is within bounds
        if (nx >= 0 && nx < terrainMap[0].length && ny >= 0 && ny < terrainMap.length) {

            // Check if neighbor is an obstacle
            if (terrainMap[ny][nx] !== 0) continue;

            // Calculate terrain cost
            const cost = terrainCosts[terrainMap[ny][nx]];

            neighbors.push([nx, ny, cost]);
        }
    }

    return neighbors;
}
/*function getNeighbors(x, y) {
    const neighbors = [];
    if (x > 0) neighbors.push([x - 1, y]); // Left
    if (x < AIworldWidth - 1) neighbors.push([x + 1, y]); // Right
    if (y > 0) neighbors.push([x, y - 1]); // Up
    if (y < AIworldHeight - 1) neighbors.push([x, y + 1]); // Down
    return neighbors.filter(([x, y]) => terrainMap[x][y] === 0); // Only empty tiles
}*/
function getDistance(nodeA, nodeB) {
    //Older code, but still works, so i'm not touching it.
    let dx = Math.abs(nodeA.x - nodeB.x);
    let dy = Math.abs(nodeA.y - nodeB.y);
    if (dx > dy) {
        return 1.4 * dy + (dx - dy);
    } else {
        return 1.4 * dx + (dy - dx);
    }
}
function getNode(x, y) {
    if (x < 0 || x >= AIworldWidth || y < 0 || y >= AIworldHeight) {
        return null;
    }
    return terrainMap[y][x];
}

// Define a function to run the A* algorithm
function findPath(startX, startY, endX, endY, terrainMap, terrainCosts) {
    const startNode = { x: startX, y: startY, gCost: 0, hCost: 0 };
    const endNode = { x: endX, y: endY, gCost: 0, hCost: 0 };
    const openSet = [startNode];
    const closedSet = [];

    while (openSet.length > 0) {
        // Find the node with the lowest fCost in the open set
        const currentNode = openSet.reduce((a, b) => (b.fCost < a.fCost ? b : a));//Should probably be a different function than "reduce", but i'm not asking for more revisions. :D

        // If we've reached the end node, reconstruct the path and return it
        if (currentNode.x === endNode.x && currentNode.y === endNode.y) {
            const path = [];
            let node = currentNode;
            while (node) {
                path.push([node.x, node.y]);
                node = node.parent;
            }
            return path.reverse();
        }

        // Move the current node from the open set to the closed set
        openSet.splice(openSet.indexOf(currentNode), 1);
        closedSet.push(currentNode);

        // Check each neighbor of the current node
        const neighbors = getNeighbors(currentNode.x, currentNode.y);
        for (let i = 0; i < neighbors.length; i++) {
            const [nx, ny] = neighbors[i];

            // Skip this neighbor if it's already in the closed set
            if (closedSet.some(node => node.x === nx && node.y === ny)) continue;

            // Calculate the tentative gCost for this neighbor
            const neighborTerrainCost = terrainCosts[terrainMap[ny][nx]];
            const gCost = currentNode.gCost + getDistance(currentNode, neighbors[i]) * neighborTerrainCost;

            // Check if this neighbor is already in the open set
            const openNode = openSet.find(node => node.x === nx && node.y === ny);
            if (openNode) {
                // If the new path to this neighbor is shorter, update its gCost and parent
                if (gCost < openNode.gCost) {
                    openNode.gCost = gCost;
                    openNode.parent = currentNode;
                }
            } else {
                // Add this neighbor to the open set
                const hCost = getDistance({ x: nx, y: ny }, endNode) * neighborTerrainCost;
                const neighborNode = { x: nx, y: ny, gCost, hCost, parent: currentNode };
                openSet.push(neighborNode);
            }
        }
    }

    // If we reach this point, there's no path to the end node
    return null;
}



// Usage example:
//MakeMapAIMap();
var AIMap = MakeMapAIMap();
//AIMap = combineArrays(AIMap, lineTo2DArray(20, 0, 21, 200, AIworldWidth, AIworldHeight));
var path = findPath(0, 0, 20, 30, AIMap, terrainCosts); // Find a path from x, y to x2, y2
console.log("Grid:"); // Print the grid to the console
console.log(terrainMap);
console.log("Path:"); // Print the path to the console
console.log(path);


//Custom code
//Some debug/helper functions
function showAIMap() {
    ctx.fillStyle = "#990099";
    const airealW = winW / AIworldWidth;
    const airealH = winH / AIworldHeight;

    for (var s = 0; s < AIworldHeight; ++s)
        for (var d = 0; d < AIworldWidth; ++d)
            if (terrainMap[d][s] == terrainCosts["impassable"] || terrainMap[d][s] == 1)
                ctx.fillRect(s * airealW, d * airealH, airealW, airealH);
}
function showAIPath() {

    ctx.fillStyle = "#119999";
    const airealW = winW / AIworldWidth;
    const airealH = winH / AIworldHeight;

    if(path !== null)
        for (var d = 0; d < path.length; ++d)
            ctx.fillRect(path[d][0] * airealW, path[d][1] * airealH, airealW, airealH);
    else
        console.log("Path is null");

    /*ctx.fillStyle = "#119999";
    const airealW = winW / AIworldWidth;
    const airealH = winH / AIworldHeight;

    for (var d = 0; d < path.length; ++d)
        ctx.fillRect(path[d][0] * airealW, path[d][1] * airealH, airealW, airealH);*/
}

//Bridge chatGPT with my custom shit
//Plotting should happen less than 60 times per seconds.
function plotPath() {
    //Should probably only be calculated once, but maybe the compiler will recognize it and optimize it for me. Whoooo knowwws. It won't really matter for this project.
    const playerTerrainPos = {
        x: Math.floor(player.x / (winW / AIworldWidth)),
        y: Math.floor(player.y / (winH / AIworldHeight))
    }
    const enemyTerrainPos = {
        x: Math.floor(anEnemy.x / (winW / AIworldWidth)),
        y: Math.floor(anEnemy.y / (winH / AIworldHeight))
    }
    //console.log("PLOTTTT");
    path = findPath(playerTerrainPos.x, playerTerrainPos.y, enemyTerrainPos.x, enemyTerrainPos.y, AIMap, terrainCosts);

    

    return path;

    //findPath(player.x, player.y, 20, 30, MakeMapAIMap(), terrainCosts);
}

