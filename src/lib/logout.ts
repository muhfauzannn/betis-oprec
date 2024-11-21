// Call this function when the user clicks "Logout"
const logout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });
  
      if (response.ok) {
        // Redirect to login or homepage
        window.location.href = '/';
      } else {
        console.error('Logout failed.');
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };

export default logout