import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery-9';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvidor } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { OutielListComponent } from './skills/outiel-list/outiel-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { appRoutes } from './routes';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/user.service';
import { UserComponent } from './user/user.component';
import { ProjectComponent } from './projects/project/project.component';
import { SkillComponent } from './skills/skill/skill.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ProjectDetailResolver } from './_resolvers/project-detail.resolver';
import { ProjectListResolver } from './_resolvers/project-list.resolver';
import { UserListResolver } from './_resolvers/user-list.resolver';
import { SkillListResolver } from './_resolvers/skill-list.resolver';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserEditResolver } from './_resolvers/user-edit.resolver';
import { ProjectEditResolver } from './_resolvers/project-edit.resolver';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from './projects/photo-editor/photo-editor.component';
import { PhotoUserEditoComponent } from './user/photo-user-edito/photo-user-edito.component';
import { ProjectAddComponent } from './projects/project-add/project-add.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';




export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [							
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    ProjectListComponent,
    OutielListComponent,
    ListsComponent,
    MessagesComponent,
    AboutComponent,
    UserComponent,
    ProjectComponent,
    SkillComponent,
    ProjectDetailComponent,
    ProjectEditComponent,
    UserEditComponent,
    PhotoEditorComponent,
    PhotoUserEditoComponent,
    ProjectAddComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    NgxGalleryModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    TabsModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['localhost:5000/auth'],
      },
    })
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvidor,
    AlertifyService,
    AuthGuard,
    PreventUnsavedChangesGuard,
    UserService,
    ProjectDetailResolver,
    ProjectListResolver,
    UserListResolver,
    SkillListResolver,
    UserEditResolver,
    ProjectEditResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
