// Authentication utilities with basic obfuscation
// In a production app, this would be handled by a secure backend

// Simple string obfuscation (not real security, just makes it less obvious)
const obfuscate = (str: string): string => {
  return btoa(str).split('').reverse().join('');
};

const deobfuscate = (str: string): string => {
  return atob(str.split('').reverse().join(''));
};

// Obfuscated credentials
const CREDENTIALS_DATA = {
  a: obfuscate('admin@acentrium.org'),
  b: obfuscate('acentriumD@2025'),
  c: obfuscate('team@acentrium.org'),
  d: obfuscate('events@acentrium.org')
};

// Validate credentials with obfuscation
export const validateAuth = (email: string, password: string): boolean => {
  const validEmails = [
    deobfuscate(CREDENTIALS_DATA.a),
    deobfuscate(CREDENTIALS_DATA.c),
    deobfuscate(CREDENTIALS_DATA.d)
  ];
  
  const validPassword = deobfuscate(CREDENTIALS_DATA.b);
  
  return validEmails.includes(email.toLowerCase()) && password === validPassword;
};

// Add rate limiting to prevent brute force
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 3;
const LOCKOUT_TIME = 5 * 60 * 1000; // 5 minutes

export const checkRateLimit = (email: string): boolean => {
  const now = Date.now();
  const attempts = loginAttempts.get(email);
  
  if (!attempts) {
    return true;
  }
  
  // Reset attempts if lockout time has passed
  if (now - attempts.lastAttempt > LOCKOUT_TIME) {
    loginAttempts.delete(email);
    return true;
  }
  
  return attempts.count < MAX_ATTEMPTS;
};

export const recordFailedAttempt = (email: string): void => {
  const now = Date.now();
  const attempts = loginAttempts.get(email);
  
  if (attempts) {
    attempts.count++;
    attempts.lastAttempt = now;
  } else {
    loginAttempts.set(email, { count: 1, lastAttempt: now });
  }
};
