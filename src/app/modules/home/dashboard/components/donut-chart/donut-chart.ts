import { CommonModule } from '@angular/common';
import { Component, ElementRef, model, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Task, TaskState } from '../../../../../core/models/task.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-donut-chart',
  imports: [NgxChartsModule, CommonModule, TranslateModule],
  templateUrl: './donut-chart.html',
  styleUrl: './donut-chart.css'
})
export class DonutChart implements OnChanges {

  tasks = model<Task[]>([]);

  invoiceData :any[]= [];

  colorScheme: any = {
    domain: ['#4a7cd1', '#dbeeff'], // Tonos de azul
  };

  @ViewChild('chartContainer2') chartContainer!: ElementRef;
  view: [number, number] = [250, 250]; // Tamaño del gráfico

  constructor(private readonly translate: TranslateService){}

  ngAfterViewInit(): void {
    if (this.chartContainer) {
      
      const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          const width = entry.contentRect.width;
          const height = entry.contentRect.height;
          this.view = [width, height];
        }
      });
      resizeObserver.observe(this.chartContainer.nativeElement);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasks']) {
      this.updateInvoiceDataFromTasks();
    }
  }


  updateInvoiceDataFromTasks(): void {
    const tasks = this.tasks();

    const completeCount = tasks.filter(t => t.state === TaskState.COMPLETE).length;
    const pendingCount = tasks.filter(t => t.state === TaskState.PENDING).length;

    this.invoiceData = [
      { name: this.translate.instant('dashboard.card.resume.completed') , value: completeCount },
      { name: this.translate.instant('dashboard.card.resume.pending') , value: pendingCount }
    ];
  }

  getTotal(): number {
    return this.invoiceData.reduce((sum, item) => sum + item.value, 0);
  }

}
