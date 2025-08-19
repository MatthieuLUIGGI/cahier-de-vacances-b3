import { useState, type FormEvent, type ChangeEvent } from 'react';
import { validatePassword } from '../services/passwordValidator';
import * as React from "react";

interface PasswordInputProps {
  onSuccess: () => void;
  onError: () => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ onSuccess, onError }) => {
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setShowResults(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const result = validatePassword(password);
    setErrors(result.errors);
    setShowResults(true);
    
    if (result.isValid) {
      setIsSuccess(true);
      onSuccess();
    } else {
      setIsSuccess(false);
      onError();
    }
  };

  return (
    <div className="matrix-panel">
      <h2 className="matrix-title">Matrix Security Gateway</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="matrix-input"
          placeholder="Enter access password"
          value={password}
          onChange={handleInputChange}
          autoFocus
        />
        <button type="submit" className="matrix-button">
          Verify Access
        </button>
      </form>

      {showResults && (
        <div className={isSuccess ? 'matrix-success' : 'matrix-error'}>
          {isSuccess ? (
            <p>Access Granted. Firewall penetration successful.</p>
          ) : (
            <>
              <p>Access Denied. Security traces detected:</p>
              <ul className="matrix-error-list">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PasswordInput;