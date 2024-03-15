import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('token'); // Change 'id_token' to 'token' to match your GraphQL implementation
  }

  login(token) {
    localStorage.setItem('token', token); // Store token as 'token' instead of 'id_token'
    // No need to redirect after login when using GraphQL
  }

  logout() {
    localStorage.removeItem('token');
    // No need to reload the page after logout when using GraphQL
  }
}

export default new AuthService();
