const logout = (e) => {
  localStorage.removeItem('token');
  window.location.replace('signin.html');
};