import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from "@angular/core";

const MODULES = [
  MatToolbarModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
];
@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class MaterialSharedModule {}