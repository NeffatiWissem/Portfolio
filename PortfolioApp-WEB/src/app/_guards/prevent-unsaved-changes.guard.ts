import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectEditComponent } from '../projects/project-edit/project-edit.component';
import { AlertifyService, ConfirmResult } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<ProjectEditComponent> {
  x = false;
  constructor(private alertify: AlertifyService) { }

  async canDeactivate(component: ProjectEditComponent) {

    if (component.editForm?.dirty) {

      const confirm = await this.alertify.promisifyConfirm('Attention','Vos données ont été modifiées. Voulez-vous continuer sans enregistrer les données?');
      if (confirm == ConfirmResult.Ok) { this.x = true } else {
        this.x = false;
      }
      
      return this.x;

    }
    return true
  }
  
  
}
