// auth.js

// Import the Amplify library
import { Amplify, Auth } from 'aws-amplify';

// Configure Amplify with your Cognito User Pool and App Client details
Amplify.configure({
  Auth: {
    region: 'your-aws-region', // e.g., 'us-east-1'
    userPoolId: 'your-user-pool-id',
    userPoolWebClientId: 'your-app-client-id',
    oauth: {
      domain: 'your-cognito-hosted-ui-domain',
      scope: ['openid', 'profile', 'email'],
      redirectSignIn: window.location.origin + '/dashboard.html', // Adjust as needed
      redirectSignOut: window.location.origin + '/index.html',   // Adjust as needed
      responseType: 'token' // Or 'code' if using Authorization Code Grant with PKCE
    }
  }
});

// Function to initiate the login flow (redirect to Cognito Hosted UI)
async function login() {
  try {
    await Auth.federatedSignIn();
  } catch (error) {
    console.error('Error signing in:', error);
  }
}

// Function to handle the redirect after login
async function handleAuthRedirect() {
  if (window.location.hash) {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const idToken = params.get('id_token');
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');
    const error = params.get('error');

    if (idToken) {
      console.log('ID Token:', idToken);
      localStorage.setItem('idToken', idToken);
      // Optionally store other tokens as well
      if (accessToken) localStorage.setItem('accessToken', accessToken);
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
      window.location.href = '/dashboard.html'; // Redirect to dashboard or main app page
    } else if (error) {
      console.error('Authentication error:', params.get('error_description'));
      // Handle the error (e.g., display an error message to the user)
    }
  }
}

// Function to check if the user is authenticated (basic check for ID token)
function isAuthenticated() {
  return localStorage.getItem('idToken') !== null;
}

// Function to get the ID token
function getIdToken() {
  return localStorage.getItem('idToken');
}

// Function to sign out
async function logout() {
  try {
    await Auth.signOut();
    localStorage.removeItem('idToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/index.html'; // Redirect to the home page after logout
  } catch (error) {
    console.error('Error signing out:', error);
  }
}

// Call handleAuthRedirect on page load to process any authentication tokens
handleAuthRedirect();

// Export the functions you want to use in app.js or other files
export { login, logout, isAuthenticated, getIdToken };
