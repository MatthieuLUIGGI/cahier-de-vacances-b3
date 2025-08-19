import { useState, useEffect, type ReactElement } from 'react';
import PasswordInput from './components/PasswordInput';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/matrix-theme.css';

function App() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAlarm, setShowAlarm] = useState(false);
  const [matrixChars, setMatrixChars] = useState<ReactElement[]>([]);

  useEffect(() => {
    // More straightforward approach for Matrix code
    const createRaindropColumn = (index: number) => {
      const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
      const characters = [];
      const columnWidth = 20;
      const duration = 5 + Math.random() * 10;
      const opacity = 0.5 + Math.random() * 0.5;
      
      // Create 15 characters for this column
      for (let j = 0; j < 15; j++) {
        const randomChar = chars[Math.floor(Math.random() * chars.length)];
        characters.push(
          <div 
            key={`${index}-${j}`} 
            style={{
              opacity: opacity - (j * 0.03), // Fade out toward the bottom
              color: j === 0 ? 'rgba(180, 255, 180, 0.95)' : undefined, // Brighter head
              textShadow: j === 0 ? '0 0 8px rgba(0, 255, 0, 0.8)' : undefined
            }}
          >
            {randomChar}
          </div>
        );
      }
      
      return (
        <div 
          key={index}
          style={{
            position: 'fixed',
            left: `${index * columnWidth}px`,
            top: 0,
            fontSize: `${12 + Math.random() * 8}px`,
            lineHeight: '1em',
            fontFamily: 'monospace',
            color: `rgba(0, 255, 0, ${opacity})`,
            display: 'flex',
            flexDirection: 'column',
            animation: `matrix-code-fall ${duration}s linear ${Math.random() * 8}s infinite`,
            zIndex: -1,
            pointerEvents: 'none'
          }}
        >
          {characters}
        </div>
      );
    };
    
    const createMatrixEffect = () => {
      const columns = Math.floor(window.innerWidth / 20);
      const raindrops = [];
      
      for (let i = 0; i < columns; i++) {
        raindrops.push(createRaindropColumn(i));
      }
      
      setMatrixChars(raindrops);
    };
    
    createMatrixEffect();
    window.addEventListener('resize', createMatrixEffect);
    
    return () => {
      window.removeEventListener('resize', createMatrixEffect);
    };
  }, []);

  const handleSuccess = () => {
    setShowSuccess(true);
    setShowAlarm(false);
    
    // Hide success message after 4 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 4000);
  };

  const handleError = () => {
    setShowAlarm(true);
    
    setTimeout(() => {
      setShowAlarm(false);
    }, 2000);
  };

  return (
    <div className={`matrix-container ${showAlarm ? 'alarm-animation' : ''}`}>
      {matrixChars}
      
      {showSuccess && (
        <div className="success-message" style={{
          position: 'fixed',
          top: '20px',
          left: '0',
          width: '100%',
          textAlign: 'center',
          zIndex: 100
        }}>
          <div style={{
            display: 'inline-block',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'var(--matrix-success)',
            padding: '15px 30px',
            borderRadius: '5px',
            boxShadow: 'var(--matrix-success-glow)',
            textShadow: '0 0 5px var(--matrix-success)',
            fontFamily: 'var(--matrix-font)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            animation: 'matrix-success-pulse 2s infinite'
          }}>
            <p style={{ fontSize: '1.5rem', margin: 0 }}>Firewall Breached</p>
            <p style={{ fontSize: '1rem', marginTop: '5px', margin: 0 }}>System Access Granted</p>
          </div>
        </div>
      )}
      
      <div className="container-fluid">
        <PasswordInput onSuccess={handleSuccess} onError={handleError} />
        
        <div className="mt-4 text-center">
          <p style={{ color: 'var(--matrix-light)', fontSize: '0.8rem' }}>
            MATRIX v4.1.7 • THE SYSTEM IS WATCHING
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
