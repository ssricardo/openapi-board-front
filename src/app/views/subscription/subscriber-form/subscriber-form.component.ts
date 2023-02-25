import {Component, OnInit} from '@angular/core';
import {Subscription, ApiRecord, ApiNamespace} from "../../../models/models";
import {Router} from "@angular/router";
import {SubscriberService} from "../../../services/subscriber.service";
import {NotificationService} from "../../../services/notification.service";
import {ApiRegistryService} from "../../../services/api-registry.service";
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

  newItem: boolean = false;
  appList: Array<ApiRecord> = []
  pathList: Array<PathItem> = [];
  nsList: Array<string> = []

  form: Subscription = {
    apiName: '',
    basePathList: [],
    hookAddress: '',
    namespace: ''
  };

  constructor(private route: Router,
              private service: SubscriberService,
              private apiService: ApiRegistryService,
              private notificationService: NotificationService) {

    if (route.getCurrentNavigation()?.extras.state) {
      this.form = route.getCurrentNavigation()!.extras.state as Subscription;

      this.pathList = this.form.basePathList.map(p => { 
        let item: PathItem = { value: p }
        return item;
      });
    }
  }

  ngOnInit() {
    this.apiService.listApiOnNamespace(Config.MAIN_NAMESPACE).subscribe(r => this.appList = r);
    this.apiService.listNamespaces().subscribe(r => this.nsList = r);
  }

  onSubmit() {
    this.form.basePathList = this.pathList.map(i => i.value);
    this.service.saveSubscription(this.form)
        .subscribe(res => {
          this.notificationService.showSuccess("Subscription saved successfully");
          this.clearForm()
          this.route.navigate(['subs-list']);
        })
    return true;
  }

  save() {
    this.onSubmit();
  }

  cancel() {
    this.clearForm()
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

  private clearForm() {
    this.form = {
      apiName: '', basePathList: [], hookAddress: ''
    }
  }
}
