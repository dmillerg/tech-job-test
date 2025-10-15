import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DonutChart } from '../../components/donut-chart/donut-chart';
import { LineChart } from '../../components/line-chart/line-chart';
import { RecentTasks } from '../../components/recent-tasks/recent-tasks';
import { TaskService } from '../../../../../core/services/task';
import { take } from 'rxjs';
import { Task, TaskState } from '../../../../../core/models/task.model';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatIconModule, CommonModule, DonutChart, LineChart, RecentTasks, TranslateModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  tasks: Task[] = [];

  cardResume: { icon: string, cant: number, title: string, footer: string, class: string }[] = [
  ]

  constructor(
    private readonly taskService: TaskService
  ) {
    this.getTasks()
  }

  private getTasks() {
    this.taskService.getTask().pipe(take(1)).subscribe({
      next: (response: Task[]) => {
        this.tasks = response
        this.updateCardResumeFromTasks();
      }
    });
  }

  updateCardResumeFromTasks(): void {
    const completeCount = this.tasks.filter(t => t.state === TaskState.COMPLETE).length;
    const pendingCount = this.tasks.filter(t => t.state === TaskState.PENDING).length;
    const totalCount = this.tasks.length;

    this.cardResume = [
      {
        icon: 'check_circle',
        cant: completeCount,
        title: 'dashboard.card.complete.title',
        footer: `dashboard.card.complete.footer`,
        class: 'text-green-500 bg-green-500/20'
      },
      {
        icon: 'schedule',
        cant: pendingCount,
        title: 'dashboard.card.pending.title',
        footer: `dashboard.card.pending.footer`,
        class: 'text-yellow-500 bg-yellow-500/20'
      },
      {
        icon: 'list_alt',
        cant: totalCount,
        title: 'dashboard.card.total.title',
        footer: `dashboard.card.total.footer`,
        class: 'text-blue-500 bg-blue-500/20'
      }
    ];
  }
}
