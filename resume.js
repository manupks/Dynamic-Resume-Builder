function addEducation() {
    const educationDiv = document.getElementById("education");
    const newEntry = document.createElement("div");
    newEntry.innerHTML = `
        <label for="degree">Degree:</label>
        <input type="text" name="Degree" placeholder="e.g., B.Sc. Computer Science" required><br>
        <label for="institute">Institute:</label>
        <input type="text" name="Institute" placeholder="e.g., XYZ University" required><br>
        <label for="year">Year of Passing:</label>
        <input type="number" name="Year" placeholder="e.g., 2024" min="1900" max="2100" required><br>
        <button type="button" id='r' onclick="remove(this)">Remove</button><br><br><br>
    `;
    educationDiv.appendChild(newEntry);
    updatePreview();
}

function addExperience() {
    const experienceDiv = document.getElementById("experience");
    const newEntry = document.createElement("div");
    newEntry.innerHTML = `
        <label for="company">Company:</label>
        <input type="text" name="Company" placeholder="e.g., ABC Corp" required><br>
        <label for="position">Position:</label>
        <input type="text" name="Position" placeholder="e.g., Software Engineer" required><br>
        <button type="button" id='r' onclick="remove(this)">Remove</button><br><br><br>
    `;
    experienceDiv.appendChild(newEntry);
    updatePreview();
}

function addProject() {
    const projectDiv = document.getElementById("h");
    const newEntry = document.createElement("div");
    newEntry.innerHTML = `
        <label for="projectName">Project Name:</label>
        <input type="text" name="ProjectName" placeholder="e.g., Personal Portfolio" required><br>
        <label for="projectDescription">Project Description:</label>
        <textarea name="ProjectDescription" rows="4" placeholder="Briefly describe the project..." required></textarea><br>
        <label for="projectLink">Project Link (if available):</label>
        <input type="url" name="ProjectLink" placeholder="https://example.com"><br>
        <button type="button" id='r' onclick="remove(this)">Remove</button><br><br><br>
    `;
    projectDiv.appendChild(newEntry);
    updatePreview();
}

function remove(div) {
    const entry = div.parentElement;
    entry.remove();
    updatePreview();
}

function updatePreview() {
    // Personal Information
    document.getElementById("previewName").innerHTML = `<strong>Name: ${document.getElementById("fname").value} ${document.getElementById("lname").value}</strong>`;
    document.getElementById("previewEmail").innerHTML = `<strong>Email: </strong>${document.getElementById("email").value}`;
    document.getElementById("previewPhone").innerHTML = `<strong>Phone: </strong>${document.getElementById("ph").value}`;
    document.getElementById("previewSummary").innerHTML = `<strong>Profile Summary: </strong>${document.getElementById("ps").value}`;

    // Education
    const educationDiv = document.getElementById("education");
    const educationPreview = document.getElementById("previewEducation");
    let educationContent = `<h3>Education</h3>`;
    const educationEntries = educationDiv.getElementsByTagName("div");
    for (let i = 0; i < educationEntries.length; i++) {
        const inputs = educationEntries[i].getElementsByTagName("input");
        let entryContent = "";
        for (let j = 0; j < inputs.length; j++) {
            if (inputs[j].value) {
                entryContent += `<p>${inputs[j].name}: ${inputs[j].value}</p>`;
            }
        }
        if (entryContent) {
            educationContent += `${entryContent}<br>`; // Add extra line gap after each entry
        }
    }
    educationPreview.innerHTML = educationContent;

    // Skills
    const skillPreview = document.getElementById("previewskill");
    const skillInputs = document.querySelectorAll("input[name='skill']:checked");
    let skillContent = `<h3>Skills</h3>`;
    skillInputs.forEach((skill) => {
        skillContent += `<p>${skill.value}</p>`;
    });
    skillPreview.innerHTML = skillContent;

    // Experience
    const experienceDiv = document.getElementById("experience");
    const experiencePreview = document.getElementById("previewExperience");
    let experienceContent = "<h3>Experience</h3>";
    const experienceEntries = experienceDiv.getElementsByTagName("div");
    for (let i = 0; i < experienceEntries.length; i++) {
        const inputs = experienceEntries[i].getElementsByTagName("input");
        let entryContent = "";
        for (let j = 0; j < inputs.length; j++) {
            if (inputs[j].value) {
                entryContent += `<p>${inputs[j].name}: ${inputs[j].value}</p>`;
            }
        }
        if (entryContent) {
            experienceContent += `${entryContent}<br>`; // Add extra line gap after each entry
        }
    }
    experiencePreview.innerHTML = experienceContent;

    // Projects
    const projectDiv = document.getElementById("h");
    const projectPreview = document.getElementById("previewProjects");
    let projectContent = "<h3>Projects</h3>";
    const projectEntries = projectDiv.getElementsByTagName("div");
    
    for (let i = 0; i < projectEntries.length; i++) {
        const projectInputs = projectEntries[i].getElementsByTagName("input");
        const projectTextareas = projectEntries[i].getElementsByTagName("textarea");

        let projectName = "";
        let projectDescription = "";
        let projectLink = "";

        // Loop through the inputs and textareas to collect data
        for (let j = 0; j < projectInputs.length; j++) {
            if (projectInputs[j].name === "ProjectName" && projectInputs[j].value) {
                projectName = projectInputs[j].value; // Get project name
            }
            if (projectInputs[j].name === "ProjectLink" && projectInputs[j].value) {
                projectLink = projectInputs[j].value; // Get project link
            }
        }

        for (let k = 0; k < projectTextareas.length; k++) {
            if (projectTextareas[k].name === "ProjectDescription" && projectTextareas[k].value) {
                projectDescription = projectTextareas[k].value; // Get project description
            }
        }

        // If project name, description exist, add it to content
        if (projectName && projectDescription) {
            projectContent += `<p><strong>${projectName}:</strong> ${projectDescription}<br>`;
            // Check if project link exists and append it
            if (projectLink) {
                projectContent += `Link: <a href="${projectLink}" target="_blank">${projectLink}</a></p><br>`;
            } 
        }
    }

    projectPreview.innerHTML = projectContent;
}
// Attach an event listener to the "Generate" button
document.getElementById("generateButton").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form submission and clearing
    updatePreview(); // Call updatePreview function to refresh the preview
});

document.getElementById("clearButton").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent any default form submission behavior

    // Reset the form (clears all fields and resets values)
    document.getElementById("myForm").reset();

    // Clear the preview content
    document.getElementById("previewName").innerHTML = "";
    document.getElementById("previewEmail").innerHTML = "";
    document.getElementById("previewPhone").innerHTML = "";
    document.getElementById("previewSummary").innerHTML = "";
    document.getElementById("previewEducation").innerHTML = "";
    document.getElementById("previewExperience").innerHTML = "";
    document.getElementById("previewProjects").innerHTML = "";
    document.getElementById("previewskill").innerHTML = "";
});
