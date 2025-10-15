import {
  Component,
  ElementRef,
  ViewChild,
  SimpleChanges,
  AfterViewInit,
  OnInit,
  model,
  inject,
  ViewEncapsulation
} from '@angular/core';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { curveNatural } from 'd3-shape';
import { Task } from '../../../../../core/models/task.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Theme } from '../../../../../core/services/theme';

@Component({
  selector: 'app-line-chart',
  imports: [NgxChartsModule, TranslateModule],
  templateUrl: './line-chart.html',
  styleUrl: './line-chart.css',
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class LineChart implements AfterViewInit, OnInit {
  tasks = model<Task[]>([]);
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  view: [number, number] = [400, 300];
  position = LegendPosition.Below;
  curve = curveNatural;

 protected theme= inject(Theme);

  colorScheme: any = this.theme.theme()==='light'
    ? { domain: ['#90cdf4', '#f6ad55', '#f56565'] } // tonos claros para fondo oscuro
    : { domain: ['#3182ce', '#ed8936', '#e53e3e'] }; // tonos oscuros para fondo claro

  salesData: { name: string, series: { name: string, value: number }[] }[] = [
    {
      name: '',
      series: []
    }
  ];

  constructor(private readonly translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe(() => this.updateSalesDataFromTasks());
  }

  ngAfterViewInit(): void {
    if (this.chartContainer) {
      const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          const width = entry.contentRect.width - 20;
          const height = entry.contentRect.height;
          this.view = [width, height];
        }
      });
      resizeObserver.observe(this.chartContainer.nativeElement);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasks']) {
      this.updateSalesDataFromTasks();
    }
  }

  updateSalesDataFromTasks(): void {
    const tasks = this.tasks();

    // Traduce los nombres de los meses según el idioma actual
    const monthKeys = [
      'month.january', 'month.february', 'month.march', 'month.april',
      'month.may', 'month.june', 'month.july', 'month.august',
      'month.september', 'month.october', 'month.november', 'month.december'
    ];

    const monthLabels = monthKeys.map(key => this.translate.instant(key));
    const monthlyCounts: { [key: string]: number } = {};

    monthLabels.forEach(label => {
      monthlyCounts[label] = 0;
    });

    for (const task of tasks) {
      const date = new Date(task.createdAt);
      const monthIndex = date.getMonth(); // 0–11
      const translatedMonth = monthLabels[monthIndex];
      if (monthlyCounts[translatedMonth] !== undefined) {
        monthlyCounts[translatedMonth]++;
      }
    }

    this.salesData = [
      {
        name: this.translate.instant('dashboard.card.registered.tooltip'),
        series: Object.entries(monthlyCounts).map(([name, value]) => ({ name, value }))
      }
    ];
  }
}