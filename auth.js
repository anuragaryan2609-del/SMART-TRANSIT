// Auth Manager
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.isLoggedIn = false;
    }
    
    sendOTP(phoneNumber) {
        // Simulate OTP sending
        return new Promise((resolve) => {
            console.log(`OTP sent to ${phoneNumber}: 123456`);
            setTimeout(() => {
                resolve({ success: true, message: "OTP sent successfully" });
            }, 1000);
        });
    }
    
    verifyOTP(enteredOTP) {
        return enteredOTP === "123456";
    }
    
    login(email, password) {
        // Demo login - accept any credentials
        this.currentUser = {
            name: email.split('@')[0],
            email: email,
            phone: "9876543210",
            trips: 47,
            transactions: 52,
            rating: 4.5
        };
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(this.currentUser));
        return true;
    }
    
    signup(name, email, phone, password) {
        this.currentUser = {
            name: name,
            email: email,
            phone: phone,
            trips: 0,
            transactions: 0,
            rating: 0
        };
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(this.currentUser));
        return true;
    }
    
    logout() {
        this.currentUser = null;
        this.isLoggedIn = false;
        localStorage.removeItem('user');
    }
    
    checkSession() {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.isLoggedIn = true;
            return true;
        }
        return false;
    }
}

const auth = new AuthManager();
