import { Component, OnInit } from '@angular/core';
import { Invoices } from 'src/app/services/bucket';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  selector: 'app-company-invoices',
  templateUrl: './company-invoices.component.html',
  styleUrls: ['./company-invoices.component.scss'],
})
export class CompanyInvoicesComponent implements OnInit {
  keys = ['invoice_number', 'created_at', 'total_price'];

  invoices: Invoices[] = [];

  constructor(private invoiceService: InvoicesService) {}

  ngOnInit(): void {
    this.invoiceService.getAll({
      type: 'company',
      dateRange: {
        from: new Date(0, 0, 0, 0, 0, 0, 0),
        to: new Date(),
      },
      drivers: [],
      paymentMethods: [],
    }).then(invoices => {

      this.invoices = (invoices as any).map(invoice => {
        return {
          ...invoice,
          created_at :new Date(invoice.created_at)
        }
      })
    });
  }

  openFile(url) {
    window.open(url, '_blank');
  }
}
