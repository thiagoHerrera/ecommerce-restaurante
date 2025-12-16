
export const testServerConnection = async () => {
  try {
    const response = await fetch('http://localhost:5001/');
    const data = await response.json();
    console.log('Server response:', data);
    return true;
  } catch (error) {
    console.error('Server connection failed:', error);
    return false;
  }
};