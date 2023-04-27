let rectangleCount = 0;
const rectangleButton = document.getElementById('rectangleButton');
let lastRectangleWidth = 80; // Initial width of the first rectangle
let lastRectangleHeight = 80; // Initial height of the first rectangle
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Array of letters to assign to rectangles
let saveLastLetter = null;
let flag = 0;
let lastRectangleLetter = null;
let clickCounter = 0;
let firstSelectedRectangle = null;
const rectangles = []; // Create an empty array to store rectangles
let unviewedRectangles = []; // Create an empty array to store unviewed rectangles

// Add event listener to the button
rectangleButton.addEventListener('click', () => {
    createRectangles();
});

// Function to perform letter swapping
function swapLetters() {

    // Shuffle the unviewed rectangles array
    shuffle(unviewedRectangles);

    // Loop through unviewed rectangles and swap letters
    for (let i = 0; i < unviewedRectangles.length; i++) {

        // Skip rectangles that are already viewed
        if (!unviewedRectangles[i].viewed) {
            const nextRectangleIndex = (i + 1) % unviewedRectangles.length; // Get index of the next rectangle

            // Only swap letters if the next rectangle has not been viewed
            if (!unviewedRectangles[nextRectangleIndex].viewed) {
                const tempLetter = unviewedRectangles[i].innerText; // Store the letter of current rectangle
                unviewedRectangles[i].innerText = unviewedRectangles[nextRectangleIndex].innerText; // Assign letter of next rectangle
                unviewedRectangles[nextRectangleIndex].innerText = tempLetter; // Assign stored letter to next rectangle
            }
        }
    }
}

// Function to shuffle an array
function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Function to create rectangles
function createRectangles() {
    const rectangleContainer = document.getElementById('rectangleContainer');
    const sizeIncrement = 20;
    
    for (let i = 0; i < 3; i++) {
        const rectangle = document.createElement('div');
        rectangle.className = 'rectangleLayout3';

        // Set the size of the rectangle based on the previous rectangle's size
        rectangle.style.width = lastRectangleWidth + 'px';
        rectangle.style.height = lastRectangleHeight + 'px';

        // Update the last rectangle's width and height for the next iteration
        lastRectangleWidth += sizeIncrement;
        lastRectangleHeight += sizeIncrement;

        // Set the boolean parameters for the rectangle
        rectangle.viewed = false;
        rectangle.opened = false;
        rectangle.paired = false;
        
        // Using if's and flags to make sure there will be always pair of letters and choosing random letter from the array of letters
        if(i==0) {
            if(flag==0){
                const randomIndex = Math.floor(Math.random() * alphabet.length);
                rectangle.innerText = alphabet[randomIndex];
                lastRectangleLetter = rectangle.innerText;
                flag = 1
            }
            else{
                rectangle.innerText = saveLastLetter;
                flag=0;
            }
        }
        else if (i==1){
            if (flag == 0){
                const randomIndex = Math.floor(Math.random() * alphabet.length);
                rectangle.innerText = alphabet[randomIndex];
                lastRectangleLetter = rectangle.innerText
            }
            else{
                rectangle.innerText = lastRectangleLetter
            }
        }
        else if (i==2){
            if (flag == 0){
                rectangle.innerText = lastRectangleLetter;
            }
            else{
                const randomIndex = Math.floor(Math.random() * alphabet.length);
                rectangle.innerText = alphabet[randomIndex];
                saveLastLetter = rectangle.innerText;
            }
        }

        rectangleCount++;
        rectangle.addEventListener('click', handleClick);
        rectangleContainer.appendChild(rectangle);
        unviewedRectangles.push(rectangle); // Add rectangle to the unviewedRectangles array
        rectangles.push(rectangle); // Add rectangle to the rectangles array
        
    } //end of for loop, 3 new unviewed rectangles created
    swapLetters(); // Call swapLetters to perform letter swapping, making sure that each time creating 3 rectangles the position of the unviewed rectangles will change randomly
}

// Event handler for rectangle click
function handleClick(event) {
    const rectangle = event.target;

    // If the clickCounter is already bigger then 1, return
    if (clickCounter >1) {
        return;
    }
    // If the rectangle is already paired, return
    if (rectangle.paired) {
        return;
    }    
    // If the rectangle is already opened, return
    if (rectangle.opened) {
        return;
    }

    // Set the rectangle as viewed, then opened. Showing the letter and change color to blue
    rectangle.viewed = true;
    rectangle.opened = true;
    rectangle.style.fontSize = '40px';
    rectangle.style.backgroundColor = 'blue';
    
    // If this is the first selected rectangle, store it
    if (clickCounter === 0) {
        firstSelectedRectangle = rectangle;
        clickCounter = 1;
    }

    // If this is the second selected rectangle, compare with the first
    else if (clickCounter === 1) {

        // If the selected rectangles have matching text
        if (rectangle.innerText === firstSelectedRectangle.innerText) {
            // Set both rectangles as paired
            rectangle.paired = true;
            firstSelectedRectangle.paired = true;
            
            // Change font size to 40px and color to green
            rectangle.style.fontSize = '40px';
            rectangle.style.backgroundColor = 'green';
            firstSelectedRectangle.style.fontSize = '40px';
            firstSelectedRectangle.style.backgroundColor = 'green';
            
            // Reset click counter and first selected rectangle
            clickCounter = 0;
            firstSelectedRectangle = null;
        } 
        // If the selected rectangles do not match hide letter and change color to black
        else {
            setTimeout(() => {
        
            rectangle.style.fontSize = '0px';
            rectangle.style.backgroundColor = 'black';

            firstSelectedRectangle.style.fontSize = '0px';
            firstSelectedRectangle.style.backgroundColor = 'black';
            // No longer open rectangle
            rectangle.opened = false;
            firstSelectedRectangle.opened = false;
            // Reset click counter and first selected rectangle
            firstSelectedRectangle = null;
            clickCounter = 0;
            
            }, 200);
        }
    }
}



            