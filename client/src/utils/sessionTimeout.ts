import Auth from './auth';

class SessionTimeout {
  private timeoutId: number | null = null;
  private readonly inactivityTime = 30 * 60 * 1000; // 30 minutes in milliseconds
  
  constructor() {
    // Initialize the timer when the class is instantiated
    this.resetTimer();
    
    // Add event listeners for user activity
    this.setupActivityListeners();
  }
  
  private setupActivityListeners() {
    // User activity events that reset the timer
    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      window.addEventListener(event, () => this.resetTimer());
    });
  }
  
  private resetTimer() {
    // Clear any existing timeout
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
    
    // Only set a new timeout if the user is logged in
    if (Auth.loggedIn()) {
      this.timeoutId = window.setTimeout(() => {
        // If the session has timed out, log the user out
        console.log('Session expired due to inactivity');
        Auth.logout();
      }, this.inactivityTime);
    }
  }
  
  // Method to manually check if token is expired (for use on page load)
  public checkTokenExpiration() {
    const token = Auth.getToken();
    if (token && Auth.isTokenExpired(token)) {
      console.log('Token expired, logging out');
      Auth.logout();
      return false;
    }
    return token && !Auth.isTokenExpired(token);
  }
}

// Create a singleton instance
const sessionTimeout = new SessionTimeout();

export default sessionTimeout;