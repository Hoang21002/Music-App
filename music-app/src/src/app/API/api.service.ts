import { Injectable, OnInit } from '@angular/core';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit {
  dataAll: any[] = [];
  constructor() { }
  async ngOnInit() {
    await this.GetApi()
  }
  async GetApi(): Promise<void> {
    try {

      const firebaseApp = initializeApp(environment.firebase);
      const firestore = getFirestore(firebaseApp);
      const collectionReference = collection(firestore, 'artists');
      const querySnapshot = await getDocs(collectionReference);

      this.dataAll = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    } catch (error) {

      console.error('Error getting documents: ', error);
    }

  }
}
