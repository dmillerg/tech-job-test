import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
  constructor(private translate: TranslateService) {
    super();
    this.translate.onLangChange.subscribe(() => this.injectTranslations());
    this.injectTranslations();
  }

  injectTranslations(): void {
    this.itemsPerPageLabel = this.translate.instant('commons.paginator.itemsPerPageLabel');
    this.nextPageLabel = this.translate.instant('commons.paginator.nextPageLabel');
    this.previousPageLabel = this.translate.instant('commons.paginator.previousPageLabel');
    this.firstPageLabel = this.translate.instant('commons.paginator.firstPageLabel');
    this.lastPageLabel = this.translate.instant('commons.paginator.lastPageLabel');

    this.getRangeLabel = (page: number, pageSize: number, length: number): string => {
      if (length === 0 || pageSize === 0) {
        return this.translate.instant('commons.paginator.range', {
          start: 0,
          end: 0,
          length: length
        });
      }
      const startIndex = page * pageSize;
      const endIndex = Math.min(startIndex + pageSize, length);
      return this.translate.instant('commons.paginator.range', {
        start: startIndex + 1,
        end: endIndex,
        length: length
      });
    };

    this.changes.next(); // Notifica a Angular Material que debe actualizar el paginator
  }
}