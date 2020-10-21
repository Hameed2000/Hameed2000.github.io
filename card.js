// Handles the project cards

let cardOnCheck = false;
let mojoInCard = document.getElementById('mojo');
let oilInCard = document.getElementById('oil-sim');
let webInCard = document.getElementById('website');

// Array with information on the different projects
let arrayTest = [
    
    mojo = {type: document.getElementById('mojo'),
           projectTitle: "Project: Mojo",
           bgImage: "url(mojo-thumbnail.jpeg)",
           toolsUsed: "Roblox Studio, Lua, Gimp, Blender, Photoshop, Cinema4d, Trello",
           roles: "Project Manager, Programmer, Game Designer, Builder",
           desc: "Project: Mojo is an open world magic fighting game that is currently in development. My roles in this project include overseeing development and design, programming, and assisting with map building. On the programming side of things, I have designed and developed all enemy AI, combat effects and hit detection, passive systems, and some of the backend systems. Project: Mojo has currently achieved over 230,000 play sessions.",
           link: "https://www.roblox.com/games/2748055246/Project-Mojo",
           linkDesc: "www.roblox.com/project-mojo"
            
           }, 
    oil = {type: document.getElementById('oil-sim'),
           projectTitle: "Oil Simulator",
           bgImage: "url(Oil%20Simulator%20Thumbnail.jpeg)",
           toolsUsed: "Roblox Studio, Lua, Gimp, Blender, Photoshop, Cinema4d",
           roles: "Project Manager, Programmer",
           desc: "Oil Simulator is a fantasy simulator game where you create an oil tycoon. The responsibilities I had on this project were to manage and oversee the team, program and design parts of the game, and to come up with in-game events. It's worth noting that I joined this project after the development had already been started. Some of the things that I did in the programming aspect were; designing and implementing a mining mini-game, assisting in fixing bugs, and adding new items. This game has allotted over 2.3 million play sessions and has generated thousands of dollars in revenue.",
           link: "https://www.roblox.com/games/1945891752/Oil-Simulator",
           linkDesc: "www.roblox.com/oil-simulator"

          },
    
    website = {type: document.getElementById('website'),
               projectTitle: "Hameed's Website",
               bgImage: "url(website-multishot.png)",
               toolsUsed: "HTML/CSS, Javascript, Brackets IDE",
               roles: "Programmer, Designer",
               desc: "My online portfolio is a website showcasing some of my experience, projects, and provides a way to get in contact with me. The website was designed and programmed completely by me and I used HTML, CSS, and Javascript to create it.",
               link: "https://hameed2000.github.io/",
               linkDesc: "www.hameed2000.github.io"
            
              },
    
    algo = {type: document.getElementById('algo'),
               projectTitle: "Algo Visuals",
               bgImage: "url(algoBG.png)",
               toolsUsed: "HTML/CSS, Javascript, Visual Studio",
               roles: "Programmer, Designer",
               desc: "THIS WEBSITE IS NOT COMPLETE! In completion this project will visualize algorithms, data structures, and path finding using a grid system. The website will also show information on each algorithm, data structure, and path finder implemented. The main purpose of this website was to implement these concepts and give me sort of an interactive cheatsheet I can refer to.",
               link: "https://hameed2000.github.io/algo",
               linkDesc: "www.hameed2000.github.io/algo"
            
              }
];

// Hides the card, card is the card object
function hideCard(card){ 
    card.style.transform = "rotate3d(1,0,0,90deg)";
    card.style.filter = "blur(100px)";
    
    
    setTimeout(function(){
        card.style.display = "none";
    }, 500);
    
} 

// Checks to see if there is information on the card is available, e = mouse location 
function checkForCard(e){ 
    for (i = 0; i < arrayTest.length; i++){
        if (arrayTest[i].type.contains(e.target)){
            return arrayTest[i];    
        }
    }
    return false;
}

let typeCard = document.getElementById("card-container");
// work on debounce and fix the bug, then essientally done

// Event listener to check when a client releases mouse from a clicked state 
let inProgress = false;
document.addEventListener('mouseup', function(e) {
    if (!inProgress) {
        let card = checkForCard(e);
        if (cardOnCheck && !card){ // If a card is open and mouse is clicked off a card then it will hide the card that is open
            inProgress = true;
            cardOnCheck = false
            typeCard.style.transform = "rotate3d(1,0,0,90deg)";
            typeCard.style.filter = "blur(100px)";
            setTimeout(function(){
                typeCard.style.display = "none";
                inProgress = false;
            },500)
            if (window.outerWidth <= 650) {
                document.getElementById("card-container").style.transform = "translateY(600px)";
            }
        } else if (!cardOnCheck && card){ // If no card is open and mouse is clicked on a card then it will open the card
            inProgress = true;
            cardOnCheck = true
            typeCard.style.display = "grid"; 
            setTimeout(function(){
                document.getElementById("tools-p").innerHTML = card.toolsUsed;
                document.getElementById("roles-p").innerHTML = card.roles;
                document.getElementById("desc-p").innerHTML = card.desc;
                document.getElementById("card-img").style.backgroundImage = card.bgImage;
                document.getElementById("card-title").innerHTML = card.projectTitle;
                document.getElementById("project-link").innerHTML = card.linkDesc;
                document.getElementById("project-link").href = card.link;
                typeCard.style.filter = "blur(0px)";
                if (window.outerWidth <= 650) {
                    typeCard.style.transform = "rotate3d(1,0,0,0deg) translateY(-600px)" ;
                } else{
                    typeCard.style.transform = "rotate3d(1,0,0,0deg)";
                }
                
                setTimeout(function(){
                    inProgress = false;
                }, 500);

            }, 1);
        }
    }
}); 