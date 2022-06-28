import { Injectable } from '@angular/core';
import * as Storage from '@spica-devkit/storage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() {
    Storage.initialize({
      identity: localStorage.getItem('identity'),
      publicUrl: environment.url
    })
  }

  async insert(storageObject, imageId) {    
    if (imageId) {
      return Storage.update(imageId, storageObject);
    } else {
      return await Storage.insert(storageObject);
    }
  }
  toBuffer(base64, type = '') {
    
    base64 = base64.split(',')[1];
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    return bytes.buffer;
  }
}
