import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-payment',
  templateUrl: './confirm-payment.page.html',
  styleUrls: ['./confirm-payment.page.scss'],
})
export class ConfirmPaymentPage implements OnInit {
  total = 0;
  data = [
    {
      amount: 5,
      quantity: 2,
      title: 'Restaurant'
    },
    {
      amount: 10,
      quantity: 3,
      title: 'Restaurant two'
    }
  ];
  constructor() { }

  ngOnInit() {
    this.total = 0;
    this.data.map(item => {
      this.total  += (item.amount * item.quantity);
    });
  }

}
