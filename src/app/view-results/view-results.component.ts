import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-view-results',
  templateUrl: './view-results.component.html',
  styleUrls: ['./view-results.component.css']
})
export class ViewResultsComponent implements OnInit {
  public houses: any;
  imagePath = `../../assets/`;
  soldiers = {};

  constructor() { }

  ngOnInit() {
    firebase.initializeApp(environment.firebase);
    firebase.firestore().settings(environment.settings);
    const soldiersRef = firebase.database().ref('/soldiers');
    soldiersRef.on('value', function (snapshot) {
      console.log(snapshot.val());
      snapshot.val().map(t => {return this.soldiers[t.id] = t.name; });
      console.log(this.soldiers);
    }, this);
    const housesRef = firebase.database().ref('/houses');
    housesRef.on('value', function (snapshot) {
      console.log(snapshot.val());
      this.houses = snapshot.val();
    }, this);
  }

}