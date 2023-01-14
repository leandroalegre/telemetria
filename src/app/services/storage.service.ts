import * as CryptoJS from 'crypto-js';
declare var require: any
import { Injectable } from '@angular/core';

const SecureStorage = require('secure-web-storage');
let SECRET_KEY = '3ntr3r1o52020@';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  public secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key) {
      key = CryptoJS.SHA256(key);
      key = CryptoJS.SHA256(SECRET_KEY);
      return key.toString();
    },
    encrypt: function encrypt(data) {
      data = CryptoJS.AES.encrypt(data, SECRET_KEY);

      data = data.toString();

      return data;
    },
    decrypt: function decrypt(data) {
      data = CryptoJS.AES.decrypt(data, SECRET_KEY);

      data = data.toString(CryptoJS.enc.Utf8);

      return data;
    }
  });

}
