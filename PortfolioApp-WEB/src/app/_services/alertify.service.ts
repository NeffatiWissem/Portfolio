import { Injectable } from '@angular/core';
declare let alertify :any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

//--> Méthode pour afficher Message de confirmation boite de dialogue  
confirm(message: string, okCallback: () => any) {
  alertify.confirm(message, function(e:any) {
      if (e) {
          okCallback();
      } else {

      }
  });
}

//--> Méthode pour afficher Message de Success dans une boite de dialogue
success(message:string){
  alertify.success(message);
}

//--> Méthode pour afficher Message de Error dans une boite de dialogue
error(message:string){
  alertify.error(message);
}

//--> Méthode pour afficher Message de Warning dans une boite de dialogue
warning(message:string){
  alertify.warning(message);
}

//--> Méthode pour afficher n'importe quelle Message dans une boite de dialogue
message(message:string){
  alertify.message(message);
}

}

//--> Paramèter par défaut:
alertify.defaults = {
  // dialogs defaults
  autoReset:true,
  basic:false,
  closable:true,
  closableByDimmer:true,
  invokeOnCloseOff:false,
  frameless:false,
  defaultFocusOff:false,
  maintainFocus:true, // <== global default not per instance, applies to all dialogs
  maximizable:true,
  modal:true,
  movable:true,
  moveBounded:false,
  overflow:true,
  padding: true,
  pinnable:true,
  pinned:true,
  preventBodyShift:false, // <== global default not per instance, applies to all dialogs
  resizable:true,
  startMaximized:false,
  transition:'pulse',
  transitionOff:false,
  tabbable:'button:not(:disabled):not(.ajs-reset),[href]:not(:disabled):not(.ajs-reset),input:not(:disabled):not(.ajs-reset),select:not(:disabled):not(.ajs-reset),textarea:not(:disabled):not(.ajs-reset),[tabindex]:not([tabindex^="-"]):not(:disabled):not(.ajs-reset)',  // <== global default not per instance, applies to all dialogs

  // notifier defaults
  notifier:{
  // auto-dismiss wait time (in seconds)  
      delay:2,
  // default position
      position:'bottom-right',
  // adds a close button to notifier messages
      closeButton: false,
  // provides the ability to rename notifier classes
      classes : {
          base: 'alertify-notifier',
          prefix:'ajs-',
          message: 'ajs-message',
          top: 'ajs-top',
          right: 'ajs-right',
          bottom: 'ajs-bottom',
          left: 'ajs-left',
          center: 'ajs-center',
          visible: 'ajs-visible',
          hidden: 'ajs-hidden',
          close: 'ajs-close'
      }
  },

  // language resources 
  glossary:{
      // dialogs default title
      title:'AlertifyJS',
      // ok button text
      ok: 'OK',
      // cancel button text
      cancel: 'Cancel'            
  },

  // theme settings
  theme:{
      // class name attached to prompt dialog input textbox.
      input:'ajs-input',
      // class name attached to ok button
      ok:'ajs-ok',
      // class name attached to cancel button 
      cancel:'ajs-cancel'
  }
};

