import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery";

  items = [
    {
      name: "Milk",
      quantity: 2
    },
    {
      name: "Bread",
      quantity: 4
    },
    {
      name: "Eggs",
      quantity: 3
    },
    {
      name: "Grapes", 
      quantity: 5
    }
  ];

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController) {

  }

  removeItem(item, index){
    // Troubleshooting
    console.log("Deleting item .." + item.name, index);
    
    // Show item removal message (toast)
    const toast = this.toastCtrl.create({
      message: 'Deleting item - ' + item.name + " ...",
      duration: 3000
    });
    toast.present();

    // Delete item from items array
    this.items.splice(index, 1);
    
  }

  addItem(){
    console.log("Item added"); 
    this.showAddItemPrompt();   
  }

  showAddItemPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Add Item',
      message: "Please enter an item",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'quantity',
          placeholder: 'Quantity'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked', data);
            
            // Add item to array
            this.items.push(data);

          }
        }
      ]
    });
    prompt.present();
  }

}
