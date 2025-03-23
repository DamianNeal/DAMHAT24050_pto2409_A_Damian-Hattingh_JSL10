document.addEventListener("DOMContentLoaded", () => {
    // FIXED: Corrected button ID for Room 1 — original code used "solveRoom" (wrong ID)
    document.getElementById("solveRoom1").addEventListener("click", () => {
        fetch('books.json') 
            .then(response => {
                // DEBUGGING:Check if the fetch was successful, otherwise throw error
                if (!response.ok) throw new Error('Network error while fetching books.json');
                return response.json();
            })
            .then(books => {
                const mostRecentBook = findMostRecentBook(books);
                // Corrected result element ID from "resultRoom1" to "room1Result"
                document.getElementById("room1Result").textContent = `The key to the next room is: ${mostRecentBook.title}`;
            })
            .catch(error => console.error("Room 1 Error:", error));  // Helpful for debugging fetch errors
    });

    document.getElementById("solveRoom2").addEventListener("click", () => {
        // Added 'async' to JavaScript concepts to ensure intersection with React concepts
        const jsConcepts = new Set(['closure', 'scope', 'hoisting', 'async']);
        const reactConcepts = new Set(['components', 'jsx', 'hooks', 'async']);

        // Previously used jsConcepts for both parameters — now correctly passing two sets
        const commonConcepts = findIntersection(jsConcepts, reactConcepts);

        document.getElementById("room2Result").textContent = `The code to unlock the door is: ${Array.from(commonConcepts).join(', ')}`;
    });

    // Marked as async so we can use await inside for fetch and delays
    document.getElementById("solveRoom3").addEventListener("click", async () => {
        try {
            const response = await fetch('directions.json');
            // Added error handling for failed fetch
            if (!response.ok) throw new Error('Network error while fetching directions.json');
            const directions = await response.json();

            const message = await navigateLabyrinth(directions);
            document.getElementById("room3Result").innerHTML = message;
        } catch (error) {
            console.error("Room 3 Error:", error);  // Helpful error message in console
        }
    });
});

// FIXED: Logic bug previously used "<" (oldest), now correctly uses ">" to find MOST recent book
function findMostRecentBook(books) {
    return books.reduce((mostRecent, book) => 
        new Date(book.published) > new Date(mostRecent.published) ? book : mostRecent
    );
}

// FIXED: Logic bug previously returned full Set A, now returns intersection between Set A and Set B
function findIntersection(setA, setB) {
    return new Set([...setA].filter(item => setB.has(item)));
}

// FIXED: No delay originally now uses await to simulate step-by-step navigation with 1-second pause
async function navigateLabyrinth(directions) {
    for (let direction of directions) {
        await new Promise(resolve => setTimeout(resolve, 1000));  // Simulates delay for each step
        console.log(`Navigating: ${direction.step}`);  // INFO: Logs step to console for user feedback
    }
    return "🎉 Congratulations! You've mastered the essentials of Vanilla JavaScript. Welcome to the world of React, where you'll build powerful and dynamic web applications. Let's dive in!";
}
