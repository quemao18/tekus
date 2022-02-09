import { Injectable } from '@angular/core';
import * as ElectronStore from 'electron-store';

@Injectable({
  providedIn: 'root'
})
export class ElectronStoreService {
  private store: ElectronStore;
  loadStore: boolean = false;

  constructor() {
    if (window.require) {
      try {
        const storeClass = window.require("electron-store");
        this.store = new storeClass();
        this.loadStore = true;
      }catch (e) {
        this.loadStore = false;
        console.error(e)
      }
    } else {
      this.loadStore = false;
      console.warn("electron-store was not loaded");
    }
   }

   //This function returns the value of the key stored locally with electron-store.
   get = (key: string): any => {
    return this.store.get(key) || null;
   }

   /* And this other function sets the value of the key we want to store.
      (If the key already exists, the value will be replaced) */
   set = (key: string, value: any): void => {
     this.store.set(key, value);
   }

   isLoadStore = (): boolean => {
     return this.loadStore;
   }
}
