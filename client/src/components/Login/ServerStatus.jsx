import { useState, useEffect } from 'react';

const ServerStatus = () => {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await fetch('http://localhost:5000/');
        if (response.ok) {
          setStatus('online');
        } else {
          setStatus('offline');
        }
      } catch (error) {
        setStatus('offline');
      }
    };
    
    checkServer();
    const interval = setInterval(checkServer, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case 'online': return '#10b981';
      case 'offline': return '#ef4444';
      default: return '#f59e0b';
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      padding: '8px 12px',
      backgroundColor: 'white',
      border: `2px solid ${getStatusColor()}`,
      borderRadius: '8px',
      fontSize: '12px',
      fontWeight: 'bold',
      color: getStatusColor(),
      zIndex: 1000
    }}>
      🗄️ BD: {status === 'online' ? 'CONECTADA' : status === 'offline' ? 'DESCONECTADA' : 'VERIFICANDO...'}
    </div>
  );
};

export default ServerStatus;