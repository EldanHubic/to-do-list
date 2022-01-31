import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TasksComponent } from './tasks/tasks.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConvertDashToSpacePipe } from './tasks/convert-dash-to-space.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from './ng-material/ng-material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ConfirmComponent } from './dialog/confirm/confirm.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    AddTaskComponent,
    TasksComponent,
    ConvertDashToSpacePipe,
    ConfirmComponent,
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule.forRoot([
      { path: 'tasks', component: HomeComponent },
      { path: 'tasks/:id', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', component: HomeComponent },
    ]),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
