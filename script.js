document.addEventListener("DOMContentLoaded", function () {
    initializeHostels();
    loadHostels();
});

// Default Hostel Data
const Hostels = [
    {
        name: "Sunrise Hostel",
        location: "CUSAT Main Road",
        fee: "₹5000/month",
        rating: 4.2,
        contact: "9876543210",
        reviews: []
    },
    {
        name: "Moonlight Hostel",
        location: "CUSAT South Gate",
        fee: "₹4500/month",
        rating: 4.5,
        contact: "9863480185",
        reviews: []
    },
    {
        name: "Greenview Hostel",
        location: "CUSAT North Block",
        fee: "₹4800/month",
        rating: 4.0,
        contact: "9856741230",
        reviews: []
    },
    {
        name: "Lakeview Hostel",
        location: "Near CUSAT Lake",
        fee: "₹5200/month",
        rating: 4.7,
        contact: "9845123456",
        reviews: []
    }
];

// Initialize hostels in localStorage if empty
function initializeHostels() {
    if (!localStorage.getItem("hostels")) {
        localStorage.setItem("hostels", JSON.stringify(Hostels));
    }
}

// Load hostels from localStorage and display them
function loadHostels() {
    const hostelContainer = document.getElementById("hostelList");
    const hostels = JSON.parse(localStorage.getItem("hostels")) || [];
    hostelContainer.innerHTML = "";

    hostels.forEach((hostel) => {
        hostelContainer.innerHTML += `
            <div class="hostel-card">
                <h3 class="hostel-name">${hostel.name}</h3>
                <p><strong>📍 Location:</strong> ${hostel.location}</p>
                <p><strong>💰 Fee:</strong> ${hostel.fee}</p>
                <p><strong>⭐ Rating:</strong> ${hostel.rating}/5</p>
                <p><strong>📞 Contact:</strong> ${hostel.contact}</p>
                <p><strong>📝 Reviews:</strong></p>
                <ul class="review-list">
                    ${hostel.reviews.length > 0 ? hostel.reviews.map(r => `<li>${r}</li>`).join("") : "<li>No reviews yet</li>"}
                </ul>
            </div>
        `;
    });
}

// Function to add a new hostel dynamically
function addHostel() {
    let name = document.getElementById("hostelName").value.trim();
    let location = document.getElementById("hostelLocation").value.trim();
    let fee = document.getElementById("hostelFee").value.trim();
    let rating = parseFloat(document.getElementById("hostelRating").value.trim());
    let contact = document.getElementById("hostelContact").value.trim();

    if (name === "" || location === "" || fee === "" || isNaN(rating) || contact === "") {
        alert("Please fill in all fields correctly!");
        return;
    }

    let hostels = JSON.parse(localStorage.getItem("hostels")) || [];

    const newHostel = { name, location, fee, rating, contact, reviews: [] };
    hostels.push(newHostel);

    // Update localStorage
    updateStorage(hostels);

    alert("Hostel added successfully!");

    // Clear input fields
    document.getElementById("hostelForm").reset();
}

// Update localStorage & reload UI
function updateStorage(data) {
    localStorage.setItem("hostels", JSON.stringify(data));
    loadHostels();
}

// Reset hostels to default
function resetHostels() {
    updateStorage(Hostels);
    alert("Hostels have been reset to default!");
}

// Search Function
document.getElementById("hostelSearch").addEventListener("input", function () {
    let search = this.value.toLowerCase();
    document.querySelectorAll(".hostel-card").forEach(card => {
        let name = card.querySelector(".hostel-name").textContent.toLowerCase();
        let location = card.querySelector("p").textContent.toLowerCase();
        card.style.display = name.includes(search) || location.includes(search) ? "block" : "none";
    });
});


// Function to submit a review
document.getElementById("submitReview").addEventListener("click", function () {
    let hostelName = document.getElementById("reviewHostelName").value.trim();
    let reviewText = document.getElementById("reviewText").value.trim();

    if (hostelName === "" || reviewText === "") {
        alert("Please fill in all fields!");
        return;
    }

    let hostels = JSON.parse(localStorage.getItem("hostels")) || [];

    let hostelIndex = hostels.findIndex(h => h.name.toLowerCase() === hostelName.toLowerCase());

    if (hostelIndex !== -1) {
        // Add review to the correct hostel
        hostels[hostelIndex].reviews.push(reviewText);
        updateStorage(hostels);
        alert("Review added successfully!");
    } else {
        alert("Hostel not found! Please enter a valid hostel name.");
    }

    // Clear form
    document.getElementById("reviewHostelName").value = "";
    document.getElementById("reviewText").value = "";
});

    // Clear the form
    document.getElementById("reviewHostelName").value = "";
    document.getElementById("reviewText").value = "";

