import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery";


  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GroceriesServiceProvider) {

  }

  // Get initial groceries list from provider.
  loadItems(){
    return this.dataService.getItems();
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

    // Use Groceries Provider to remove item
    this.dataService.removeItem(index);
    
  }

  editItem(item, index){
    // Troubleshooting
    console.log("Edit item .." + item.name, index);
    
    // Show item removal message (toast)
    const toast = this.toastCtrl.create({
      message: 'Editing item - ' + item.name + " ...",
      duration: 3000
    });
    toast.present();

    // Delete item from items array    
    this.showEditItemPrompt(item, index);
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
            this.dataService.addItem(data);

          }
        }
      ]
    });
    prompt.present();
  }

  showEditItemPrompt(item, index) {
    const prompt = this.alertCtrl.create({
      title: 'Edit Item',
      message: "Please edit an item",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: item.name
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value: item.quantity
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
          handler: item => {
            console.log('Saved clicked', item);            
            // Edit item to array
            this.dataService.editItem(item,index);

          }
        }
      ]
    });
    prompt.present();
  }

}
