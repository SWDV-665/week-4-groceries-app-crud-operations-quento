import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery";


  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GroceriesServiceProvider, public dialogService: InputDialogServiceProvider) {

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
    this.dialogService.showPrompt(item, index);
  }

  addItem(){
    console.log("Item added"); 
    this.dialogService.showPrompt();   
  }

}
