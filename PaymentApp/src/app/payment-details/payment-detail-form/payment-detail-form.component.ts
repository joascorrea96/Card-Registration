import { Component } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { NgForm } from "@angular/forms";
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: [
  ]
})
export class PaymentDetailFormComponent {
  list: PaymentDetail[] = [];

  constructor(public service: PaymentDetailService, private toastr: ToastrService) {
  }

  onSubmit(form: NgForm) {
    this.service.formSubmitted = true
    if (form.valid) {
      if (this.service.formData.paymentDetailId == 0)
        this.insertRecord(form)
      else
        this.updateRecord(form)
    }

  }


  insertRecord(form: NgForm) {
    this.service.postPaymentDetail()
      .subscribe({
        next: res => {
          let newPaymentDetail = res as PaymentDetail;
          this.service.list.push(newPaymentDetail); // Adiciona o novo item à lista existente
          this.service.resetForm(form);
          this.toastr.success('Inserido com sucesso', 'Cadastro de Cartões');
        },
        error: err => { console.log(err); }
      });
  }
  
  
  updateRecord(form: NgForm) {
    this.service.putPaymentDetail()
      .subscribe({
        next: res => {
          this.service.list = res as PaymentDetail[]
          this.service.resetForm(form)
          this.toastr.info('Alterado com sucesso', 'Cadastro de Cartões')
        },
        error: err => { console.log(err) }
      })
   }

}
