import {Component, OnInit} from '@angular/core';
import {AlertSubscriber, AppRecord} from "../../../models/models";
import {Router} from "@angular/router";
import {SubscriberService} from "../../../services/subscriber.service";
import {NotificationService} from "../../../services/notification.service";
import {AppRegistryService} from "../../../services/app-registry.service";
import {Config} from "../../../app.config";

export interface PathItem {
  value: string
}

@Component({
  selector: 'app-subscriber-form',
  templateUrl: './subscriber-form.component.html',
  styleUrls: ['./subscriber-form.component.css']
})
export class SubscriberFormComponent implements OnInit {

  newItem: boolean;
  appList: Array<AppRecord> = []
  form: AlertSubscriber = {
    appName: '', basePathList: [], email: ""
  };
  pathList: Array<PathItem> = [];

  constructor(private route: Router,
              private service: SubscriberService,
              private appService: AppRegistryService,
              private notificationService: NotificationService) {
    if (route.getCurrentNavigation().extras.state) {
      this.form = route.getCurrentNavigation().extras.state as AlertSubscriber;
    }
  }

  ngOnInit() {
    this.appService.listAppOnNamespace(Config.MAIN_NAMESPACE).subscribe(r => this.appList = r);
  }

  onSubmit() {
    this.form.basePathList = this.pathList.map(i => i.value);
    this.service.saveSubscription(this.form)
        .subscribe(res => {
          this.notificationService.showSuccess("Subscription saved successfully");
        })
    return true;
  }

  save() {
    this.onSubmit();
  }

  cancel() {
    this.route.navigate(['subs-list']);
  }

  removePath(index: number) {
    this.pathList.splice(index, 1);
  }

  addPath() {
    this.pathList.push({
      value: ''
    });
  }
}
