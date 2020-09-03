// I know I could have used JQuery to handle the animations but one of the points of this project was to introduce me to JavaScript :D

// If any developer looks at this with this comment still here means my code is still a mess
// I had to finish in a rush so I could include the website in my resume for an application
// I will be reviewing, optimizing, documenting, and cleaning up the code later on
// I hope you understand


// Bools
let debounce = true;
let faded = false;
let inProg = false;

// Elements
let navBar = document.getElementById('nav-bar');
let profileSection = document.getElementById('profile-section');
let profileSectionRect = profileSection.getBoundingClientRect();

let navTable = {
    profileButton: {
        button: document.getElementById("profile-button"),
        location: function() {
            return document.getElementById("profile-section").offsetTop + 50;
        }
    },
    
    educationButton: {
        button: document.getElementById("education-button"),
        location: function() {
            return document.getElementById("education-container").offsetTop - 75;
        }
    },
    
    careersButton: {
        button: document.getElementById("careers-button"),
        location: function() {
            return document.getElementById("careers-container").offsetTop - 175;
        }
    }, 
    
    projectsButton: {
        button: document.getElementById("projects-button"),
        location: function() {
            return document.getElementById("projects-heading").offsetTop - 50;
        }
    },
    
    contactButton: {
        button: document.getElementById("contact-button"),
        location: function() {
            return document.getElementById("footer").offsetTop + 50;
        }
    }   
    
}

for (let button in navTable) {

    navTable[button].button.addEventListener("click", function(e){
        e.preventDefault();
        window.scroll({
            top: navTable[button].location(),
            behavior: "smooth"
            
        });
        
    });
    
}

// Scroling listener
window.addEventListener('scroll', function(e){ 
    e.preventDefault();
    if (debounce){
        debounce = false;
        checkProgress();
        debounce = true;
        
    }
    
}); 

function yGoal(){
    return (document.getElementById("showcase").offsetTop + document.getElementById("showcase").offsetHeight) - 425;
}

// Handles fading in and out of nav-bar
function checkProgress() {
    if(inProg == true) {
        window.setTimeout(checkProgress, 100);
            
    } else {
        // Checking to see if script should fade-in or fade-out nav-bar
        if (window.scrollY >= yGoal() && faded == false){
            // Setting bools
            faded = true;
            inProg = true

            // Running fade-in function
            let fadeID = setInterval(fadeIn, 10, navBar);
            let origin = 0;

            // Fade-in function
            function fadeIn(element){
                origin = origin + .05;
                element.style.transform = "scale(1)";
                element.style.filter = "grayscale(0%) blur(0px)";
                if ( parseFloat(window.getComputedStyle(element).getPropertyValue("opacity")) >= 1 ){
                    origin = 1;
                    element.style.opacity = 1;
                    clearInterval(fadeID);
                    inProg = false;

                } else{
                    element.style.opacity = origin;

                }

            }

        } else if (window.scrollY < yGoal() && faded == true) {
            // Setting bools
            faded = false;
            inProg = true;

            // Running fade-out function
            let fadeID = setInterval(fadeOut, 10, navBar);
            let origin = 1;

            // Fade-out function
            function fadeOut(element){
                origin = origin - 0.05;
                element.style.transform = "scale(.5) translateY(-100px)";
                element.style.filter = "grayscale(100%) blur(100px)";
                if ( parseFloat(window.getComputedStyle(element).getPropertyValue("opacity")) <= 0.0 ){
                    origin = 0;
                    element.style.opacity = origin;
                    clearInterval(fadeID);
                    inProg = false

                } else{
                    element.style.opacity = origin;

                }
                
            }

        }
        
    }
    
}

function cellFadeIn(){
    if (this.idx == 1){
        document.getElementById("heading-wrap").style.transform = "rotate3d(1,0,0,0deg)";
        document.getElementById("showcase-hr").style.width = "75%";
    }
    this.style.transition = ".75s";
    this.style.filter = "blur(20px) saturate(110%)";
    this.removeEventListener("transitionend", cellFadeIn);
}

function hideCard(card){
    card.style.transform = "rotate3d(1,0,0,90deg)";
    card.style.filter = "blur(1000px)";
    
    
    setTimeout(function(){
        card.style.display = "none";
    }, 500);
    
} 

let cardOnCheck = false;
let mojoInCard = document.getElementById('mojo');
let oilInCard = document.getElementById('oil-sim');
let webInCard = document.getElementById('website');

let arrayTest = [
    
    mojo = {type: document.getElementById('mojo'),
           projectTitle: "Project: Mojo",
           bgImage: "url(mojo-thumbnail.jpeg)",
           toolsUsed: "Roblox Studio, Lua, Gimp, Blender, Photoshop, Cinema4d, Trello",
           roles: "Project Manager, Programmer, Game Designer, Builder",
           desc: "Project: Mojo is an open world magic fighting game that is currently in development. My roles in this project include overseeing development and design, programming, and assisting with map building. On the programming side of things, I have designed and developed all enemy AI, combat effects and hit detection, passive systems, and some of the backend systems. Project: Mojo has currently achieved over 230,000 play sessions."            
           }, 
    oil = {type: document.getElementById('oil-sim'),
           projectTitle: "Oil Simulator",
           bgImage: "url(Oil%20Simulator%20Thumbnail.jpeg)",
           toolsUsed: "Roblox Studio, Lua, Gimp, Blender, Photoshop, Cinema4d",
           roles: "Project Manager, Programmer",
           desc: "Oil Simulator is a fantasy simulator game where you create an oil tycoon. The responsibilities I had on this project were to manage and oversee the team, program and design parts of the game, and to come up with in-game events. It's worth noting that I joined this project after the development had already been started. Some of the things that I did in the programming aspect were; designing and implementing a mining mini-game, assisting in fixing bugs, and adding new items. This game has allotted over 2.3 million play sessions and has generated thousands of dollars in revenue."

          }, 
    website = {type: document.getElementById('website'),
               projectTitle: "Hameed's Website",
               bgImage: "url(website-multishot.png)",
               toolsUsed: "HTML/CSS, Javascript, Brackets IDE",
               roles: "Programmer, Designer",
               desc: "My online portfolio is a website showcasing some of my experience, projects, and provides a way to get in contact with me. The website was designed and programmed completely by me and I used HTML, CSS, and Javascript to create it."
              }
];
 
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

document.addEventListener('mouseup', function(e) {
    let card = checkForCard(e);
    
    if (cardOnCheck && !card){
        cardOnCheck = false
        typeCard.style.transform = "rotate3d(1,0,0,90deg)";
        typeCard.style.filter = "blur(1000px)";
        setTimeout(function(){
            typeCard.style.display = "none";
        },500)
    } else if (!cardOnCheck && card){
        cardOnCheck = true
        typeCard.style.display = "grid"; 
        setTimeout(function(){
            document.getElementById("tools-p").innerHTML = card.toolsUsed;
            document.getElementById("roles-p").innerHTML = card.roles;
            document.getElementById("desc-p").innerHTML = card.desc;
            document.getElementById("card-img").style.backgroundImage = card.bgImage;
            document.getElementById("card-title").innerHTML = card.projectTitle;
            typeCard.style.transform = "rotate3d(1,0,0,0deg)";
            typeCard.style.filter = "blur(0px)";
        }, 1)
    }
}); 

let rowArr = document.getElementsByClassName("row");
let cellArr = document.getElementsByClassName("cell");
let colorGrid = {
    0: ["#b53333", "#b56033", "#b59433", "#b2b533"],
    1: ["#94b533", "#74b533", "#33b537", "#33b54c"],
    2: ["#33b576", "#33b5ac", "#3399b5", "#336ab5"],
    3: ["#3733b5", "#5633b5", "#7a33b5", "#9b33b5"],
    4: ["#b53397", "#b53373", "#b53369", "#b5334e"]
};

document.getElementById("heading-wrap").style.transform = "rotate3d(1,0,0,0deg)";
document.getElementById("showcase-hr").style.width = "75%";

for (let i = 0; i < rowArr.length; i++){
    let children = rowArr[i].getElementsByTagName("div");
    for (let v = 0; v < children.length; v++){
        children[v].style.transition = ".75s";
        children[v].style.filter = "blur(15px) saturate(110%)"; //20pxxxxx
    } 
}

function colorTestOne(){
    for (let i = 0; i < cellArr.length; i++){
        cellArr[i].style.transition = ".5s";
        cellArr[i].style.backgroundColor = "#121212";  
    }
    
    let duration = 0;
    
    setTimeout(function(){
        for (let i = 0; i < rowArr.length; i++){
            setTimeout(function(){
                let children = rowArr[i].getElementsByTagName("div");
                for (let v = 0; v < children.length; v++){
                    children[v].style.transition = ".75s";
                    children[v].style.backgroundColor = colorGrid[i][v]; 
                }      
            }, duration);
            duration = duration + 250;
        }
        
        
        setTimeout(function(){
            duration = 0;
            for (let i = 0; i < rowArr.length; i++){
                setTimeout(function(){
                    let children = rowArr[i].getElementsByTagName("div");
                    for (let v = 0; v < children.length; v++){
                        children[v].style.backgroundColor = "#121212";
                    }      
                }, duration);
                duration = duration + 250;
           }
        }, duration);
        
    }, 500);
 
}

function colorTestTwo(){
    for (let i = 0; i < cellArr.length; i++){
        cellArr[i].style.transition = ".5s";
        cellArr[i].style.backgroundColor = "#121212";  
    }
    
    let duration = 0;
    
    setTimeout(function(){
        for (let i = 0; i < rowArr.length; i++){
            setTimeout(function(){
                let children = rowArr[i].getElementsByTagName("div");
                for (let v = 0; v < children.length; v++){
                    setTimeout(function(){
                        children[v].style.transition = ".75s";
                        children[v].style.backgroundColor = colorGrid[i][v]; 
                    }, duration);
                    duration = duration + 100;
                }    
                duation = duration + 100;
            }, duration);
        }
                
        setTimeout(function(){
            duration = 0; 
            for (let i = rowArr.length - 1; i >= 0 ; i--){
                setTimeout(function(){
                    let children = rowArr[i].getElementsByTagName("div");
                    for (let v = children.length - 1; v >= 0 ; v--){
                        setTimeout(function(){
                            children[v].style.transition = ".75s";
                            children[v].style.backgroundColor = "#121212";
                        }, duration);
                        duration = duration + 100;
                    }    
                    duation = duration + 100;
                }, duration);


            }
        }, 2500);
        
        
        
        
    }, 500);
 
}



function colorTestThree(){
    for (let i = 0; i < cellArr.length; i++){
        cellArr[i].style.transition = ".5s";
        cellArr[i].style.backgroundColor = "#121212";  
    }
    
    let duration = 0;
    
    setTimeout(function(){
        for (let i = rowArr.length - 1; i >= 0 ; i--){
                setTimeout(function(){
                    let children = rowArr[i].getElementsByTagName("div");
                    for (let v = children.length - 1; v >= 0 ; v--){
                        setTimeout(function(){
                            children[v].style.transition = ".75s";
                            children[v].style.backgroundColor = colorGrid[i][v]; 
                        }, duration);
                        duration = duration + 100;
                    }    
                    duation = duration + 100;
                }, duration);


            }
                
        setTimeout(function(){
            duration = 0; 
            for (let i = 0; i < rowArr.length; i++){
            setTimeout(function(){
                let children = rowArr[i].getElementsByTagName("div");
                for (let v = 0; v < children.length; v++){
                    setTimeout(function(){
                        children[v].style.transition = ".75s";
                        children[v].style.backgroundColor = "#121212";
                    }, duration);
                    duration = duration + 100;
                }    
                duation = duration + 100;
            }, duration);
        }
        }, 2500);
        
        
        
        
    }, 500);
 
}

let fadeBlackModesLength = 2;
let fadeInModeLength = 4;




let fadeBlackModes = {
    0: function() {
        let duration = 0;
        for (let i = 0; i < rowArr.length; i++){
            setTimeout(function(){
                let children = rowArr[i].getElementsByTagName("div");
                for (let v = 0; v < children.length; v++){
                    children[v].style.transition = ".5s";
                    children[v].style.backgroundColor = "#121212"; 
                }      
            }, duration);
            duration = duration + 125;
        }
        return duration;
    },
    
    1: function(){
        console.log('choosen');
        let duration = 0;
        for (let i = rowArr.length - 1; i >= 0; i--){
            setTimeout(function(){
                let children = rowArr[i].getElementsByTagName("div");
                for (let v = children.length - 1; v >= 0; v--){
                    children[v].style.transition = ".5s";
                    children[v].style.backgroundColor = "#121212"; 
                }      
            }, duration);
            duration = duration + 250;
        }
        return duration;
    },
    
    2: function(){
        console.log('gottemmmm');
        let duration = 0;
        for (let i = 0; i < rowArr.length; i++){
            let children = rowArr[i].getElementsByTagName("div");
            children[1].style.transition = ".5s";
            children[1].style.backgroundColor = "#121212"; 
            children[2].style.transition = ".5s";
            children[2].style.backgroundColor = "#121212"; 
        }
        
        duration = duration + 150;
        setTimeout(function(){
            for (let i = 0; i < rowArr.length; i++){
                let children = rowArr[i].getElementsByTagName("div");
                children[0].style.transition = ".5s";
                children[0].style.backgroundColor = "#121212"; 
                children[3].style.transition = ".5s";
                children[3].style.backgroundColor = "#121212"; 
            } 
        }, duration);
        
        return duration;
    },
    
    3: function(){
        let duration = 600;
        let gridContainer = document.getElementById("color-grid-containerID");
        gridContainer.style.transition = ".5s";
        gridContainer.style.width = gridContainer.offsetWidth * 1.33 + "px";
        
       for (let i = 0; i < rowArr.length; i++){
            let children = rowArr[i].getElementsByTagName("div");
            for (let v = 0; v < children.length; v++){
                children[v].style.transition = ".5s";
                //children[v].style.backgroundColor = "#121212"; 
                children[v].style.opacity = ".15";
            }      
        }
        
        return duration;
    },
    
    4: function(){
        let duration = 500;
        let gridContainer = document.getElementById("color-grid-containerID");
        document.querySelectorAll(".cell").forEach(function(cell, index){
            cell.style.transition = ".5s";
            cell.style.filter = "blur(50px) saturate(110%)";
            cell.style.backgroundColor = "#121212";
        });
        
        return duration;
    },
    
    5: function(){
            
            if (screen.width <= 500) return;
        
            for (let i = 0; i < rowArr.length; i++){
                let children = rowArr[i].getElementsByTagName("div");
                for (let v = 0; v < children.length; v++){
                    children[v].style.transition = ".35s";
                }
            }
            //setInterval(function(){
            function delayMain() {
                
                let duration = 0;
                for (let i = 0; i < rowArr.length; i++){
                    let children = rowArr[i].getElementsByTagName("div");
                    for (let v = 0; v < children.length; v++){
                        
                       setTimeout(function(){

                           children[v].style.transform = "scale(1.15)";

                           setTimeout(function(){
                               children[v].style.transform = "scale(.85)";

                           },  350);
                       }, duration);
                     }

                    duration = duration + 250                
                }

                setTimeout(function(){

                    for (let i = rowArr.length - 1; i >= 0; i--){
                        let children = rowArr[i].getElementsByTagName("div");
                        for (let v = 0; v < children.length; v++){
                            setTimeout(function(){
                               children[v].style.transform = "scale(1.15)";

                               setTimeout(function(){
                                   children[v].style.transform = "scale(.85)";

                               },  350);
                           }, duration);
                        }
                        duration = duration + 250
                    }

                }, 800 );
                setTimeout(delayMain, 4000);
            }
            
            setTimeout(delayMain, 3000);
            //}, 4000);
        
        
    }
}

fadeBlackModes[5]();

let fadeInModes = {
    // Work from here!!!
    0: function(){
        let duration = 0;
        for (let i = 0; i < rowArr.length; i++){
            setTimeout(function(){
                let children = rowArr[i].getElementsByTagName("div");
                for (let v = 0; v < children.length; v++){
                    children[v].style.transition = ".75s";
                    children[v].style.backgroundColor = colorGrid[i][v]; 
                }      
            }, duration);
            duration = duration + 250;
        }
        return duration;
    },
    
    1: function(){
        let duration = 0;
        for (let i = rowArr.length - 1; i >= 0; i--){
            setTimeout(function(){
                let children = rowArr[i].getElementsByTagName("div");
                for (let v = children.length - 1; v >= 0; v--){
                    children[v].style.transition = ".75s";
                    children[v].style.backgroundColor = colorGrid[i][v]; 
                }      
            }, duration);
            duration = duration + 250;
        }
        return duration;
    },
    
    2: function(){
        let duration = 0;
        for (let i = 0; i < rowArr.length; i++){
            let children = rowArr[i].getElementsByTagName("div");
            setTimeout(function(){
                for (let v = children.length - 1; v >= 0; v--){
                    setTimeout(function(){
                        children[v].style.transition = ".75s";
                        children[v].style.backgroundColor = colorGrid[i][v]; 
                    }, duration);
                    duration = duration + 75;
                }
            }, 50);
        }
        return 1500; 
    },
    
    3: function(){
        let duration = 0;
        for (let i = 0; i < rowArr.length; i++){
            let children = rowArr[i].getElementsByTagName("div");
            for (let v = children.length - 1; v >= 0; v--){
                setTimeout(function(){
                    children[v].style.transition = ".75s";
                    children[v].style.backgroundColor = colorGrid[i][v]; 
                }, duration);
                duration = duration + 50;
            }
        }
        return duration; 
    },
    
    4: function(){
        let duration = 0;
        for (let i = 0; i < rowArr.length; i++){
            let children = rowArr[i].getElementsByTagName("div");
            for (let v = children.length - 1; v >= 0; v--){
                setTimeout(function(){
                    children[v].style.transition = ".75s";
                    children[v].style.backgroundColor = colorGrid[i][v]; 
                }, duration);
                duration = duration + 50;
            }
        }
        return duration; 
    },
    
    5: function(){
        console.log('gottem');
        let duration = 0;
        let directionCheck = true; // true means right -> left, false means left -> right
        for (let i = rowArr.length - 1; i >= 0; i--){
            let children = rowArr[i].getElementsByTagName("div");
            if (directionCheck) {
                for (let v = children.length - 1; v >= 0; v--){
                    setTimeout(function(){
                        children[v].style.transition = ".75s";
                        children[v].style.backgroundColor = colorGrid[i][v]; 
                    }, duration);
                    duration = duration + 50;
                }
                directionCheck = false
            } else {
                for (let v = 0; v < children.length; v++){
                    setTimeout(function(){
                        children[v].style.transition = ".75s";
                        children[v].style.backgroundColor = colorGrid[i][v]; 
                    }, duration);
                    duration = duration + 50;
                }
                directionCheck = true
            }
            
        } 
        return duration;
    },
    
    6: function(){
        console.log('gottemmmm');
        let duration = 0;
        for (let i = 0; i < rowArr.length; i++){
            let children = rowArr[i].getElementsByTagName("div");
            children[0].style.transition = ".75s";
            children[0].style.backgroundColor = colorGrid[i][0]; 
            children[3].style.transition = ".75s";
            children[3].style.backgroundColor = colorGrid[i][3]; 
        }
        
        duration = duration + 200;
        setTimeout(function(){
            for (let i = 0; i < rowArr.length; i++){
                let children = rowArr[i].getElementsByTagName("div");
                children[1].style.transition = ".75s";
                children[1].style.backgroundColor = colorGrid[i][1]; 
                children[2].style.transition = ".75s";
                children[2].style.backgroundColor = colorGrid[i][2]; 
            } 
        }, duration);
        
        return duration;
    },
    
    7: function(){
        console.log('gottemmmm');
        let duration = 0;
        for (let i = 0; i < rowArr.length; i++){
            let children = rowArr[i].getElementsByTagName("div");
            children[1].style.transition = ".5s";
            children[1].style.backgroundColor = colorGrid[i][1]; 
            children[2].style.transition = ".5s";
            children[2].style.backgroundColor = colorGrid[i][2]; 
        }
        
        duration = duration + 200;
        setTimeout(function(){
            for (let i = 0; i < rowArr.length; i++){
                let children = rowArr[i].getElementsByTagName("div");
                children[0].style.transition = ".5s";
                children[0].style.backgroundColor = colorGrid[i][0]; 
                children[3].style.transition = ".5s";
                children[3].style.backgroundColor = colorGrid[i][3]; 
            } 
        }, duration);
        
        return duration;
    },
    
    8: function(){
        let duration = 850;
        let gridContainer = document.getElementById("color-grid-containerID");
        gridContainer.style.transition = ".75s";
        gridContainer.style.width = gridContainer.offsetWidth / 1.33 + "px";
        
        for (let i = 0; i < rowArr.length; i++){
            let children = rowArr[i].getElementsByTagName("div");
            for (let v = 0; v < children.length; v++){
                children[v].style.transition = ".75s";
                children[v].style.backgroundColor = colorGrid[i][v]; 
                children[v].style.opacity = "1";
            }      
        }
        
        return duration;
    },
    
    9: function(){
        let duration = 0;
                    
        for (let i = 0; i < rowArr.length; i++){
            let children = rowArr[i].getElementsByTagName("div");
            for (let v = 0; v < children.length; v++){
                children[v].style.transition = ".75s";
                children[v].style.backgroundColor = "green"; 
                children[v].style.filter = "blur(20px) saturate(110%)";
                setTimeout(function(){
                    children[v].style.backgroundColor = "yellow"; 
                    setTimeout(function(){
                        children[v].style.backgroundColor = "red";
                        duration = duration + 5;
                        setTimeout(function(){
                            children[v].style.backgroundColor = colorGrid[i][v]; 
                        }, duration + 750); 
                    }, 750);
                }, 750);
            }      
        }
        
        return duration;
    },
    
    10: function(){
        let duration = 0;
                    
        for (let i = 0; i < rowArr.length; i++){
            let children = rowArr[i].getElementsByTagName("div");
            for (let v = 0; v < children.length; v++){
                children[v].style.transition = "3s";
                children[v].style.display = "";
            }      
        }
        
        return duration;
    }
    
}

function fadeChooser(){
    let masterDuration = new Promise(function(resolve, reject) {
        let delay = fadeBlackModes[Math.floor(Math.random() * fadeBlackModesLength)]();
        setTimeout(function(){
            duration = fadeInModes[Math.floor(Math.random() * fadeInModeLength)]();
            console.log(duration);
            resolve(duration);
        }, delay);
    });
    return masterDuration;
}

function sleep(sleepTime) {
  return new Promise((resolve) => setTimeout(resolve, sleepTime));
}


