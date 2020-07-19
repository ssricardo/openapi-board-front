import {Component, OnInit} from '@angular/core';
import {AlertSubscriber} from "../../../models/models";
import {Router} from "@angular/router";
import {SubscriberService} from "../../../services/subscriber.service";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-subscriber-form',
  templateUrl: './subscriber-form.component.html',
  styleUrls: ['./subscriber-form.component.css']
})
export class SubscriberFormComponent implements OnInit {
	newItem: boolean;
  form: AlertSubscriber = {
    appId: 0, appName: "", basePathList: [], email: ""
  };

  constructor(private route: Router,
              private service: SubscriberService,
              private notificationService: NotificationService) {
    if (route.getCurrentNavigation().extras.state.item) {
      this.form = route.getCurrentNavigation().extras.state.item as AlertSubscriber;
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    this.service.saveSubscription(this.form)
        .subscribe(res => {
          this.notificationService.showSuccess("Subscription saved successfully")
        })
    return true;
  }

  save() {
    this.onSubmit();
  }

  cancel() {
    this.route.navigate(['subs-list']);
  }
}
