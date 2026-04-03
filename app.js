// App State
let currentUser = null;
let currentBuses = [];
let selectedBus = null;
let selectedSeats = [];
let pendingOTP = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('smartTransitUser');
    if (savedUser && window.location.pathname.includes('dashboard.html')) {
        currentUser = JSON.parse(savedUser);
        updateDashboardUI();
    } else if (savedUser && !window.location.pathname.includes('dashboard.html')) {
        window.location.href = 'dashboard.html';
    } else if (!savedUser && window.location.pathname.includes('dashboard.html')) {
        window.location.href = 'index.html';
    }
    
    // Setup login page
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname === '/index.html') {
        setupLoginPage();
    }
    
    // Setup dashboard page
    if (window.location.pathname.includes('dashboard.html')) {
        setupDashboard();
    }
});

// Login Page Setup
function setupLoginPage() {
    // Language switching
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            // Language change logic can be added here
            alert('Language changed to ' + this.textContent);
        });
    });
    
    // Tab switching
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const loginType = this.dataset.login;
            document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.login-form').forEach(form => form.classList.remove('active'));
            document.getElementById(`${loginType}-login-form`).classList.add('active');
        });
    });
}

// Email Login
function handleEmailLogin() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    
    if (email && password) {
        currentUser = {
            name: email.split('@')[0],
            email: email,
            phone: "9876543210",
            trips: 47,
            transactions: 52,
            rating: 4.5
        };
        localStorage.setItem('smartTransitUser', JSON.stringify(currentUser));
        window.location.href = 'dashboard.html';
    } else {
        alert('Please enter email and password');
    }
}

// Send OTP
function sendOTP() {
    const phone = document.getElementById('phoneNumber').value;
    if (phone && phone.length >= 10) {
        pendingOTP = "123456";
        document.getElementById('otp-section').style.display = 'block';
        alert(`OTP sent to ${phone}\nDemo OTP: 123456`);
    } else {
        alert('Please enter valid phone number');
    }
}

// Verify OTP
function verifyOTP() {
    const enteredOTP = document.getElementById('otpInput').value;
    if (enteredOTP === "123456") {
        currentUser = {
            name: "User",
            email: "user@example.com",
            phone: document.getElementById('phoneNumber').value,
            trips: 47,
            transactions: 52,
            rating: 4.5
        };
        localStorage.setItem('smartTransitUser', JSON.stringify(currentUser));
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid OTP! Demo OTP is 123456');
    }
}

// Signup
function handleSignup() {
    const name = document.getElementById('fullName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;
    
    if (name && email && phone && password) {
        currentUser = {
            name: name,
            email: email,
            phone: phone,
            trips: 0,
            transactions: 0,
            rating: 0
        };
        localStorage.setItem('smartTransitUser', JSON.stringify(currentUser));
        window.location.href = 'dashboard.html';
    } else {
        alert('Please fill all fields');
    }
}

// Dashboard Setup
function setupDashboard() {
    const savedUser = localStorage.getItem('smartTransitUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateDashboardUI();
    }
    populateCityDropdowns();
}

function updateDashboardUI() {
    if (currentUser) {
        const userNameSpan = document.getElementById('userName');
        if (userNameSpan) userNameSpan.textContent = currentUser.name;
        
        const tripCountSpan = document.getElementById('tripCount');
        if (tripCountSpan) tripCountSpan.textContent = currentUser.trips;
        
        const transactionCountSpan = document.getElementById('transactionCount');
        if (transactionCountSpan) transactionCountSpan.textContent = currentUser.transactions;
    }
}

function populateCityDropdowns() {
    const fromSelect = document.getElementById('fromCity');
    const toSelect = document.getElementById('toCity');
    
    if (fromSelect && toSelect) {
        fromSelect.innerHTML = '<option value="">Select City</option>' + 
            MAHARASHTRA_CITIES.map(city => `<option value="${city}">${city}</option>`).join('');
        
        toSelect.innerHTML = '<option value="">Select City</option>' + 
            MAHARASHTRA_CITIES.map(city => `<option value="${city}">${city}</option>`).join('');
    }
}

function showBookTicket() {
    document.getElementById('main-content').innerHTML = `
        <div class="booking-section">
            <h2>Book Ticket</h2>
            <div class="search-form">
                <div class="form-row">
                    <div class="input-group">
                        <label>From</label>
                        <select id="fromCity" class="city-select">
                            <option value="">Select City</option>
                            ${MAHARASHTRA_CITIES.map(city => `<option value="${city}">${city}</option>`).join('')}
                        </select>
                    </div>
                    <div class="input-group">
                        <label>To</label>
                        <select id="toCity" class="city-select">
                            <option value="">Select City</option>
                            ${MAHARASHTRA_CITIES.map(city => `<option value="${city}">${city}</option>`).join('')}
                        </select>
                    </div>
                    <div class="input-group">
                        <label>Date of Journey</label>
                        <input type="date" id="travelDate" value="2026-04-03">
                    </div>
                    <button onclick="searchBuses()" class="search-btn">
                        <i class="fas fa-search"></i> Search Buses
                    </button>
                </div>
            </div>
            <div id="bus-list"></div>
        </div>
    `;
}

function searchBuses() {
    const from = document.getElementById('fromCity').value;
    const to = document.getElementById('toCity').value;
    const date = document.getElementById('travelDate').value;
    
    if (!from || !to) {
        alert('Please select both departure and destination cities');
        return;
    }
    
    currentBuses = generateBuses(from, to, date);
    
    const busListDiv = document.getElementById('bus-list');
    busListDiv.innerHTML = `
        <h3>${currentBuses.length} Buses available from ${from} to ${to}</h3>
        ${currentBuses.map(bus => `
            <div class="bus-card" onclick="selectBus('${bus.id}')">
                <div class="bus-header">
                    <div>
                        <div class="bus-operator">${bus.operator}</div>
                        <div class="bus-number">${bus.busNumber} • ${bus.type}</div>
                    </div>
                    <div class="bus-rating">
                        <i class="fas fa-star"></i> ${bus.rating}
                    </div>
                </div>
                <div class="bus-timing">
                    <div>
                        <div class="time">${bus.departure}</div>
                        <div>${bus.from}</div>
                    </div>
                    <div>
                        <div class="duration">${bus.duration}</div>
                        <div>→</div>
                    </div>
                    <div>
                        <div class="time">${bus.arrival}</div>
                        <div>${bus.to}</div>
                    </div>
                </div>
                <div class="bus-footer">
                    <div class="seats-available">
                        <i class="fas fa-chair"></i> ${bus.seatsAvailable} seats available
                    </div>
                    <div class="price">₹${bus.price}</div>
                </div>
                <div class="amenities">
                    <small>${bus.amenities.join(' • ')}</small>
                </div>
            </div>
        `).join('')}
    `;
}

function selectBus(busId) {
    selectedBus = currentBuses.find(b => b.id === busId);
    selectedSeats = [];
    showSeatSelection();
}

function showSeatSelection() {
    document.getElementById('main-content').innerHTML = `
        <div class="booking-section">
            <h3>Select Your Seats</h3>
            <p>${selectedBus.operator} (${selectedBus.busNumber}) • ${selectedBus.from} → ${selectedBus.to} • ${selectedBus.date}</p>
            
            <div class="seat-layout">
                ${SEAT_LAYOUT.map(seat => `
                    <div class="seat available" data-seat="${seat}" onclick="toggleSeat('${seat}')">${seat}</div>
                `).join('')}
            </div>
            
            <div style="margin-top: 20px; text-align: center;">
                <p>Selected Seats: <strong id="selectedSeatsList">None</strong></p>
                <button onclick="proceedToPayment()" class="btn-primary" style="width: auto; padding: 12px 30px;">
                    Proceed to Payment (₹${selectedBus.price} per seat)
                </button>
            </div>
        </div>
    `;
}

function toggleSeat(seat) {
    const index = selectedSeats.indexOf(seat);
    if (index === -1) {
        selectedSeats.push(seat);
    } else {
        selectedSeats.splice(index, 1);
    }
    
    document.getElementById('selectedSeatsList').innerText = selectedSeats.length ? selectedSeats.join(', ') : 'None';
    
    // Update UI
    document.querySelectorAll('.seat').forEach(el => {
        if (selectedSeats.includes(el.dataset.seat)) {
            el.classList.remove('available');
            el.classList.add('selected');
        } else {
            el.classList.remove('selected');
            el.classList.add('available');
        }
    });
}

function proceedToPayment() {
    if (selectedSeats.length === 0) {
        alert('Please select at least one seat');
        return;
    }
    
    const totalAmount = selectedSeats.length * selectedBus.price;
    
    document.getElementById('main-content').innerHTML = `
        <div class="booking-section">
            <h3>Payment</h3>
            <div style="background: #f9f9f9; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <p><strong>Amount:</strong> ₹${totalAmount}</p>
                <p><strong>Bus:</strong> ${selectedBus.operator} (${selectedBus.busNumber})</p>
                <p><strong>Seats:</strong> ${selectedSeats.join(', ')}</p>
            </div>
            
            <div class="payment-methods">
                <h
