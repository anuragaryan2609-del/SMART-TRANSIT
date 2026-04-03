// Maharashtra Cities
const MAHARASHTRA_CITIES = [
    "Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", 
    "Solapur", "Amravati", "Kolhapur", "Nanded", "Sangli",
    "Jalgaon", "Akola", "Latur", "Ahmednagar", "Dhule",
    "Ichalkaranji", "Chandrapur", "Parbhani", "Jalna", "Ratnagiri"
];

// Generate random buses for a route
function generateBuses(from, to, date) {
    const operators = ["Maharashtra State Transport", "Shivneri Travels", "Orange Travels", "VRL Express", "MSRTC", "Neeta Tours"];
    const types = ["AC Sleeper", "Non-AC Sleeper", "AC Seater", "Volvo AC", "Luxury AC"];
    const buses = [];
    
    // Generate 10-15 buses per route
    const numBuses = Math.floor(Math.random() * 6) + 10;
    
    for (let i = 0; i < numBuses; i++) {
        const randomNum = Math.floor(Math.random() * 9000) + 1000;
        const departureHour = Math.floor(Math.random() * 20) + 4; // 4 AM to 12 AM
        const duration = Math.floor(Math.random() * 6) + 3; // 3-9 hours
        const arrivalHour = (departureHour + duration) % 24;
        
        buses.push({
            id: `BUS${i+1}`,
            busNumber: `MH01FT${randomNum}`,
            operator: operators[Math.floor(Math.random() * operators.length)],
            type: types[Math.floor(Math.random() * types.length)],
            departure: `${departureHour.toString().padStart(2,'0')}:00`,
            arrival: `${arrivalHour.toString().padStart(2,'0')}:00`,
            duration: `${duration}h ${Math.floor(Math.random() * 60)}m`,
            price: Math.floor(Math.random() * 800) + 400,
            seatsAvailable: Math.floor(Math.random() * 25) + 5,
            rating: (Math.random() * 1.5 + 3.5).toFixed(1),
            amenities: ["Charger", "Water Bottle", "Blanket", "WiFi"].slice(0, Math.floor(Math.random() * 3) + 2)
        });
    }
    
    return buses.sort((a,b) => a.departure.localeCompare(b.departure));
}

// Bus seat layout
const SEAT_LAYOUT = [
    "AL", "AR", "BL", "BR", "CL", "CR", "DL", "DR",
    "EL", "ER", "FL", "FR", "GL", "GR", "HL", "HR",
    "IL", "IR", "JL", "JR"
];
