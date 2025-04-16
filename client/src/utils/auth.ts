import { JwtPayload, jwtDecode } from 'jwt-decode';

interface DecodedToken extends JwtPayload {
  username: string;
  exp: number;
}

class AuthService {
  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode<DecodedToken>(token) : null;
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }
  
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      // Check if the token expiration time is past
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return true;
    }
  }

  getToken(): string {
    return localStorage.getItem('id_token') || '';
  }

  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  }
}

export default new AuthService();
