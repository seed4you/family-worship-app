import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// window.storage polyfill for Vercel deployment
window.storage = {
  _data: JSON.parse(localStorage.getItem('__fwapp__') || '{}'),
  _save() {
    localStorage.setItem('__fwapp__', JSON.stringify(this._data));
  },
  async get(key) {
    const val = this._data[key];
    if (val === undefined) throw new Error('Key not found: ' + key);
    return { key, value: val };
  },
  async set(key, value) {
    this._data[key] = value;
    this._save();
    return { key, value };
  },
  async delete(key) {
    delete this._data[key];
    this._save();
    return { key, deleted: true };
  },
  async list(prefix = '') {
    const keys = Object.keys(this._data).filter(k => k.startsWith(prefix));
    return { keys };
  }
};

createRoot(document.getElementById('root')).render(<App />)
