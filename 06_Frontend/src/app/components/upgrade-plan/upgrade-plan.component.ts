import { Component } from '@angular/core'; 
declare var Razorpay: any;
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-upgrade-plan',
  templateUrl: './upgrade-plan.component.html',
  styleUrl: './upgrade-plan.component.css'
})  





export class UpgradePlanComponent { 


  /**
   * 
   * Function to handle payment using Razorpay.
   */
  payNow() {
    const options = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: 300000,
      name: 'Shruti',
      key: 'rzp_test_rcZDiWvY5D4oKi',
      image: '',
      prefill: {
        name: 'Shruti Shrivastav',
        email: 'shrutishrivastav938@gmail.com',
        contact: '8624833069',
      },
      theme: {
        color: '#f37254',
      },
      modal: {
        ondismiss: () => {
          console.log('Payment dismissed');
        },
      },
    };

    const successCallback = (paymentId: any) => {
      console.log('Payment successful with ID:', paymentId);
     
      

    };

    const failureCallback = (error: any) => {
      console.error('Payment failed with error:', error);
    };

    Razorpay.open(options, successCallback, failureCallback);
    const updateAvailability = {
      availability : false
    } 




  }
}
