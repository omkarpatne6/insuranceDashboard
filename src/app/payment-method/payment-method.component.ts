import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaymentService } from './payment.service';

@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [NgIf, FormsModule, NgFor],
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.css'
})
export class PaymentMethodComponent implements OnInit {

  readonly paymentAPIUrl: string = 'https://localhost:7268/api/PaymentDetail';
  data: any = [];

  isEdit: boolean = false;
  constructor(private http: HttpClient, private paymentService: PaymentService) { }

  form: any = {
    cardOwnerName: "",
    cardNumber: "",
    securityCode: null,
    validThrough: "",
    eid: 0
  }

  ngOnInit(): void {
    this.paymentService.getPaymentMethods().subscribe(
      (data) => {
        this.data = data;
      },
      (error) => {
        console.error('Error fetching payment methods:', error);
      }
    );

    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.form.eid = parseInt(JSON.parse(userData).eid);
    }
  }

  deletePayment(paymentId: number): void {
    this.http.delete(this.paymentAPIUrl + '/' + paymentId).subscribe(() => {
      this.paymentService.getPaymentMethods().subscribe(
        (data) => {
          this.data = data;
        },
        (error) => {
          console.error('Error fetching payment methods:', error);
        }
      );
    });
  }

  editToggle(paymentId: number) {
    // this.isEdit = !this.isEdit;

    const selectedPayment = this.data.find((item: any) => item.paymentId === paymentId);

    if (!this.isEdit) {

      this.form = {
        ...this.form,
        paymentId: selectedPayment.paymentId,
        cardOwnerName: selectedPayment.cardOwnerName,
        cardNumber: selectedPayment.cardNumber,
        securityCode: selectedPayment.securityCode,
        validThrough: selectedPayment.validThrough,
        eid: selectedPayment.eid
      }

      this.isEdit = true;
    } else {
      this.form = {
        cardOwnerName: "",
        cardNumber: "",
        securityCode: null,
        validThrough: "",
        eid: null
      }

      this.isEdit = false;
    }

  }

  resetForm() {
    this.form = {
      cardOwnerName: "",
      cardNumber: "",
      securityCode: null,
      validThrough: "",
      eid: null
    }

    if (this.isEdit) {
      this.isEdit = false;
    }
  }

  convertToSQLDate(inputString: string) {
    // Split the input string into month and year parts
    var parts = inputString.split('/');

    // Extract month and year from the parts
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[1], 10);

    // Construct the new date string with day set as 1 and format it as YYYY/MM/DD
    var newDateString = year.toString() + '-' + month.toString().padStart(2, '0') + '-01';

    return newDateString;
  }

  submit() {
    if (!this.form.cardOwnerName || !this.form.cardNumber || !this.form.validThrough || !this.form.securityCode) {
      alert("Please fill necessary fields");
      return;
    }

    const newDate = this.convertToSQLDate(this.form.validThrough);
    console.log(newDate)

    if (!this.isEdit) {
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        this.form.eid = parseInt(JSON.parse(userData).eid);
      }

      this.http.post(this.paymentAPIUrl, { ...this.form, validThrough: newDate }).subscribe(() => {
        alert("Card added successfully");
        this.resetForm();
        this.paymentService.getPaymentMethods().subscribe(
          (data) => {
            this.data = data;
          },
          (error) => {
            console.error('Error fetching payment methods:', error);
          }
        );
      });
    } else {
      this.http.put<any>(this.paymentAPIUrl, this.form)
        .subscribe(() => {
          alert("Card updated successfully");
          this.resetForm();
          this.paymentService.getPaymentMethods().subscribe(
            (data) => {
              this.data = data;
            },
            (error) => {
              console.error('Error fetching payment methods:', error);
            }
          );
        });
    }

  }
}
