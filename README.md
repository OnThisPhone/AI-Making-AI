# Live Page
https://onthisphone.github.io/AI-Making-AI/AI%20Making%20AI/index.html
# AI-Making-AI
ChatGPT aided A* algorithm. Why not make an AI that an AI helped make!

# Description
"AI Making AI" is a project that aims to implement the A* algorithm for pathfinding in a fun and educational way. The project was created by "Jojo" and features code assistance and optimization by ChatGPT.

# Acknowledgments
We would like to thank the creators of the A* algorithm for making this project possible, as well as the developers of the programming languages and tools used in the project.

# Disclaimer

This project is for educational purposes only and should not be used in any commercial applications without proper testing and validation.

The human's note:
Use it as you will. Please disregard that part of ChatGPT's response. Although, you should mind the... mess.

# IMPORTANT NOTES
It uses A* such as it is, and it doesn't make the best effort in finding the most optimal path. It sometimes choses poorly. I think it's because of some biases in how it prioritizes moves. But for this basic demostration, i feel it's good enough.

It doesn't represent the path, map, etc super accurately. Math.floor was used for every such calculation, where a round function might have been slightly better. I also didn't care enough to make it super accurately when i could. Mainly because i got tired yesterday and mainly because i'm just a little lazy.

How it plots the path and updates it could be way more optimized, but i got tired of the way Javascript implements multithreading, i got annoyed with the usual security restrictions that browsers always have that makes things way more complicated than it should be, and i should have made all the functionality with multithreading in mind from the beginning. Async works just fine for the project, and when porting it to a different platform that does multithreading way better (Like Android, Windows, etc), this will be a foregone conclusion.

The level generator is about as basic as they come. It doesn't check for the "enemy" (yellow square) being stuck in a wall.

You can uncomment the showAIMap() part of the code in the draw() method in the main.js file to show the map in a way that the AI is seeing it (Still not super accurate then, but a little more)
