document.addEventListener('DOMContentLoaded', () => {
    const searchEntry = document.getElementById('search-entry');
    const searchBtn = document.getElementById('search-btn');
    const summaryText = document.getElementById('summary-text');
    const statusLabel = document.getElementById('status-label');

    // --- Utility Function to Update UI ---
    const updateSummaryDisplay = (title, summary, url) => {
        // Clear previous content
        summaryText.innerHTML = '';
        
        // Insert Title with custom class (tag_config equivalent)
        const titleSpan = document.createElement('span');
        titleSpan.className = 'summary-title';
        titleSpan.textContent = `Title: ${title}`;
        summaryText.appendChild(titleSpan);

        // Insert Summary Text
        const summaryP = document.createElement('p');
        summaryP.textContent = summary;
        summaryText.appendChild(summaryP);
        
        // Insert URL
        const urlP = document.createElement('p');
        urlP.innerHTML = `&nbsp;<br>🔗 URL: <a href="${url}" target="_blank" style="color: var(--color-accent);">${url}</a>`;
        summaryText.appendChild(urlP);
    };

    const updateStatus = (text, color) => {
        statusLabel.textContent = text;
        statusLabel.style.color = color;
    };

    // --- Core Functionality (Simulated Fetch) ---
    const fetchSummary = async () => {
        const topic = searchEntry.value.trim();
        
        if (!topic) {
            alert("Please enter a topic to search! 🤔"); // messagebox.showwarning equivalent
            return;
        }

        updateStatus("Searching... ⏳", "#ffff00");
        searchBtn.disabled = true; // Disable button during search

        // --- SIMULATED API CALL ---
        // In a real application, you would replace this block with a fetch() call to your backend.
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay (1.5s)
        
        try {
            // Check for specific topics to simulate different error/success states
            let result = {};

            if (topic.toLowerCase() === "error") {
                // Simulate a generic error
                throw new Error("Failed to connect to Wikipedia API.");
            } else if (topic.toLowerCase() === "ambiguous") {
                // Simulate DisambiguationError
                throw new Error("Multiple results found! 🤔\n\nPlease be more specific. Try one of these:\n\nOption 1\nOption 2\nOption 3");
            } else if (topic.toLowerCase() === "notfound") {
                // Simulate PageError
                throw new Error(`No Wikipedia page found for '${topic}' 😢`);
            } else {
                // Simulate successful fetch (using the original title and a generic summary)
                result = {
                    title: topic.charAt(0).toUpperCase() + topic.slice(1), // Basic capitalization
                    summary: `This is a 5-sentence simulated summary for the topic "${topic}". In a real deployment, a server-side script using the Python 'wikipedia' library (or the MediaWiki API) would provide this actual text. The user experience is kept exactly the same as your desktop app.`,
                    url: `https://en.wikipedia.org/wiki/${encodeURIComponent(topic)}`
                };
                
                updateSummaryDisplay(result.title, result.summary, result.url);
                updateStatus("Summary fetched successfully! ✅", "#00ff00");
            }
            
        } catch (error) {
            // Error Handling (matching the Python exceptions)
            summaryText.textContent = error.message;

            if (error.message.includes("Multiple results")) {
                updateStatus("Multiple results found! 🔍", "#ffaa00");
            } else if (error.message.includes("No Wikipedia page")) {
                updateStatus("Page not found! ❌", "#ff0000");
                alert(error.message); // messagebox.showerror equivalent
            } else {
                updateStatus("Error occurred! ❌", "#ff0000");
                alert(`An error occurred: ${error.message} 💥`);
            }
        } finally {
            searchBtn.disabled = false; // Re-enable button
        }
    };

    // --- Event Listeners ---
    searchBtn.addEventListener('click', fetchSummary);
    searchEntry.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            fetchSummary();
        }
    });
});