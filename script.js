// Main App Controller
let currentBuses = [];
let selectedBus = null;
let selectedSeats = [];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    if (auth.checkSession()) {
        showDashboard();
    }
    
    // Setup tab switching
    setupTabs();
    
    // Setup login forms
    setupLoginForms();
});

function setupTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show corresponding content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${tabId}-login`).classList.add('active');
        });
    });
}

function setupLoginForms() {
    // Email login
    const emailForm = document.getElementById('emailLoginForm');
    if (emailForm) {
        emailForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = emailForm.querySelector('input[type="email"]').value;
            const password = emailForm.querySelector('input[type="password"]').value;
            
            if (auth.login(email, password)) {
                showDashboard();
            }
        });
    }
    
    // Phone OTP
    const sendOtpBtn = document.getElementById('sendOtpBtn');
    if (sendOtpBtn) {
        sendOtpBtn.addEventListener('click', async () => {
            const phone = document.getElementById('phoneInput').value;
            if (phone.length === 10) {
                await auth.sendOTP(phone);
                document.getElementById('otpSection').style.display = 'block';
                alert('OTP sent! Demo OTP: 123456');
            } else {
                alert('Please enter valid 10-digit phone number');
            }
        });
    }
    
    const verifyOtpBtn = document.getElementById('verifyOtpBtn');
    if (verifyOtpBtn) {
        verifyOtpBtn.addEventListener('click', () => {
            const otp = document.getElementById('otpInput').value;
            if (auth.verifyOTP(otp)) {
                auth.currentUser = {
                    name: "User",
                    email: "user@example.com",
                    phone: document.getElementById('phoneInput').value,
                    trips: 47,
                    transactions: 52,
                    rating: 4.5
                };
                auth.isLoggedIn = true;
                localStorage.setItem('user', JSON.stringify(auth.currentUser));
                showDashboard();
            } else {
                alert('Invalid OTP! Try 123456');
            }
        });
    }
    
    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = signupForm.querySelector('input[placeholder="Full Name"]').value;
            const email = signupForm.querySelector('input[placeholder="Email Address"]').value;
            const phone = signupForm.querySelector('input[placeholder="Phone Number"]').value;
            const password = signupForm.querySelector('input[placeholder="Password"]').value;
            
            if (auth.signup(name, email, phone, password)) {
                showDashboard();
            }
        });
    }
}

function showDashboard() {
    const container = document.querySelector('.container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="dashboard-container">
            <div class="user-header">
                <div class="user-info">
                    <h2>Welcome back, ${auth.currentUser.name}!</h2>
                    <p><i class="fas fa-star" style="color: #ff9800;"></i> ${auth.currentUser.rating}/5 • ${auth.currentUser.trips} Trips • ${auth.currentUser.transactions} Transactions</p>
                </div>
                <button onclick="logout()" class="btn-primary" style="width: auto; padding: 10px 20px;">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </button>
            </div>
            
            <div class="action-buttons">
                <button onclick="showBookTicket()" class="action-btn"><i class="fas fa-ticket-alt"></i> Book Ticket</button>
                <button onclick="showTrackBus()" class="action-btn"><i class="fas fa-map-marker-alt"></i> Track Bus</button>
                <button onclick="showRaiseIssue()" class="action-btn"><i class="fas fa-exclamation-triangle"></i> Raise Issue</button>
                <button onclick="showOrderFood()" class="action-btn"><i class="fas fa-utensils"></i> Order Food</button>
            </div>
            
            <div id="mainContent">
                <!-- Dynamic content will load here -->
                <div class="search-form">
                    <h3>Book Your Bus Ticket</h3>
                    <div class="search-row">
                        <div class="input-group">
                            <i class="fas fa-map-marker-alt"></i>
                            <select id="fromCity">
                                <option value="">From</option>
                                ${MAHARASHTRA_CITIES.map(city => `<option value="${city}">${city}</option>`).join('')}
                            </select>
                        </div>
                        <div class="input-group">
                            <i class="fas fa-map-marker-alt"></i>
                            <select id="toCity">
                                <option value="">To</option>
                                ${MAHARASHTRA_CITIES.map(city => `<option value="${city}">${city}</option>`).join('')}
                            </select>
                        </div>
                        <div class="input-group">
                            <i class="fas fa-calendar"></i>
                            <input type="date" id="travelDate" value="${new Date().toISOString().split('T')[0]}">
                        </div>
                        <button onclick="searchBuses()" class="btn-primary"><i class="fas fa-search"></i> Search Buses</button>
                    </div>
                </div>
                <div id="busResults"></div>
            </div>
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
    
    const resultsDiv = document.getElementById('busResults');
    resultsDiv.innerHTML = `
        <h3>${currentBuses.length} Buses available from ${from} to ${to}</h3>
        ${currentBuses.map(bus => `
            <div class="bus-card" onclick="selectBusForBooking('${bus.id}')">
                <div class="bus-header">
                    <div>
                        <span class="bus-operator">${bus.operator}</span>
                        <small> • ${bus.busNumber}</small>
                        <div><small>${bus.type}</small></div>
                    </div>
                    <div class="bus-rating">
                        <i class="fas fa-star"></i> ${bus.rating}
                    </div>
                </div>
                <div class="bus-details">
                    <div>
                        <div class="time">${bus.departure}</div>
                        <div>${from}</div>
                    </div>
                    <div>
                        <div class="duration">${bus.duration}</div>
                        <div>→</div>
                    </div>
                    <div>
                        <div class="time">${bus.arrival}</div>
                        <div>${to}</div>
                    </div>
                </div>
                <div class="bus-header">
                    <div class="seat-info"><i class="fas fa-chair"></i> ${bus.seatsAvailable} seats available</div>
                    <div class="price">₹${bus.price}</div>
                </div>
                <div><small>${bus.amenities.join(' • ')}</small></div>
            </div>
        `).join('')}
    `;
}

function selectBusForBooking(busId) {
    selectedBus = currentBuses.find(b => b.id === busId);
    showSeatSelection();
}

function showSeatSelection() {
    const contentDiv = document.getElementById('mainContent');
    contentDiv.innerHTML = `
        <div class="seat-selection">
            <h3>Select Your Seats</h3>
            <p>${selectedBus.operator} (${selectedBus.busNumber}) • ${selectedBus.type}</p>
            <div class="seat-layout">
                ${SEAT_LAYOUT.map(seat => `
                    <div class="seat available" data-seat="${seat}" onclick="toggleSeat('${seat}')">${seat}</div>
                `).join('')}
            </div>
            <div style="margin-top: 20px;">
                <p>Selected Seats: <span id="selectedSeatsList">None</span></p>
                <button onclick="proceedToPayment()" class="btn-primary">Proceed to Payment (₹${selectedBus.price} per seat)</button>
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
    const seatElements = document.querySelectorAll('.seat');
    seatElements.forEach(el => {
        if (selectedSeats.includes(el.dataset.seat)) {
            el.classList.add('selected');
        } else {
            el.classList.remove('selected');
        }
    });
}

function proceedToPayment() {
    if (selectedSeats.length === 0) {
        alert('Please select at least one seat');
        return;
    }
    
    const totalAmount = selectedSeats.length * selectedBus.price;
    
    const contentDiv = document.getElementById('mainContent');
    contentDiv.innerHTML = `
        <div class="payment-section">
            <h3>Payment Details</h3>
            <div class="payment-summary">
                <p><strong>Bus:</strong> ${selectedBus.operator} (${selectedBus.busNumber})</p>
                <p><strong>Route:</strong> ${selectedBus.from} → ${selectedBus.to}</p>
                <p><strong>Date:</strong> ${document.getElementById('travelDate').value}</p>
                <p><strong>Seats:</strong> ${selectedSeats.join(', ')}</p>
                <p><strong>Amount:</strong> ₹${totalAmount}</p>
            </div>
            <div class="payment-methods">
                <h4>Select Payment Method</h4>
                <button onclick="makePayment()" class="btn-primary">Pay Now (Demo)</button>
            </div>
        </div>
    `;
}

function makePayment() {
    // Simulate payment success
    alert('Payment Successful! Your ticket has been booked.');
    showBookingSuccess();
}

function showBookingSuccess() {
    const contentDiv = document.getElementById('mainContent');
    contentDiv.innerHTML = `
        <div class="success-message">
            <i class="fas fa-check-circle" style="font-size: 4rem; color: #4caf50;"></i>
            <h2>Payment Successful!</h2>
            <p>Your booking has been confirmed</p>
            <div class="booking-details">
                <p><strong>Bus:</strong> ${selectedBus.operator} (${selectedBus.busNumber})</p>
                <p><strong>Route:</strong> ${selectedBus.from} → ${selectedBus.to}</p>
                <p><strong>Date:</strong> ${document.getElementById('travelDate').value}</p>
                <p><strong>Seats:</strong> ${selectedSeats.join(', ')}</p>
                <p><strong>Amount Paid:</strong> ₹${selectedSeats.length * selectedBus.price}</p>
            </div>
            <button onclick="showDashboard()" class="btn-primary">Go to Dashboard</button>
        </div>
    `;
}

function showBookTicket() {
    showDashboard();
}

function showTrackBus() {
    const contentDiv = document.getElementById('mainContent');
    contentDiv.innerHTML = `
        <div class="track-bus">
            <h3>Track Your Bus</h3>
            <div class="track-info">
                <p><i class="fas fa-map-marker-alt"></i> Current Location: Narayangaon</p>
                <p><i class="fas fa-clock"></i> Next Stop: Alephata (ETA: 08:00)</p>
                <div class="route-progress">
                    <div>📍 Sinnar → Nashik Road (06:45) → Narayangaon (07:30) → Alephata (08:00) → Pune (10:00)</div>
                </div>
                <div style="margin-top: 20px; background: #f0f0f0; padding: 20px; border-radius: 10px;">
                    <iframe width="100%" height="300" frameborder="0" style="border:0; border-radius: 10px;" 
                        src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d241317.11609823225!2d73.78940536774427!3d18.998610266799856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2c2fbd7b0f0f1%3A0x8b5e5b5e5b5e5b5e!2sNashik%2C%20Maharashtra!3m2!1d19.9974533!2d73.7898023!4m5!1s0x3bc2c2fbd7b0f0f1%3A0x8b5e5b5e5b5e5b5e!2sPune%2C%20Maharashtra!3m2!1d18.5204303!2d73.8567437!5e0!3m2!1sen!2sin!4v1640000000000!5m2!1sen!2sin" 
                        allowfullscreen></iframe>
                </div>
            </div>
            <button onclick="showDashboard()" class="btn-primary" style="margin-top: 20px;">Back to Dashboard</button>
        </div>
    `;
}

function showRaiseIssue() {
    const contentDiv = document.getElementById('mainContent');
    contentDiv.innerHTML = `
        <div class="raise-issue">
            <h3>Raise an Issue</h3>
            <form id="issueForm">
                <div class="input-group">
                    <i class="fas fa-tag"></i>
                    <select required>
                        <option value="">Select Issue Type</option>
                        <option>Bus Delayed</option>
                        <option>Cleanliness Issue</option>
                        <option>Staff Behavior</option>
                        <option>Technical Issue</option>
                        <option>Other</option>
                    </select>
