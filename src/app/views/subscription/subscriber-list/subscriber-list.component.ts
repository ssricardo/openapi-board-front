import { Component, OnInit } from '@angular/core';
import {AlertSubscriber} from "../../../models/models";
import {SubscriberService} from "../../../services/subscriber.service";
import {NotificationService} from "../../../services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-subscriber-list',
  templateUrl: './subscriber-list.component.html',
  styleUrls: ['./subscriber-list.component.css']
})
export class SubscriberListComponent implements OnInit {
	filter: string = "";
	data: AlertSubscriber[];

	// for while, we filter only on forntend
	private completeList: AlertSubscriber[];

	constructor(private service: SubscriberService,
				private router: Router,
				private notificationService: NotificationService) {
	}

	ngOnInit() {
		console.log('Looking up subscribers');
		this.service.listAllSubscription()
			.subscribe(res => {
				this.completeList = res
				this.filterSubscriber();
			});
	}

	filterSubscriber() {
		this.data = this.completeList.filter(
			(item) => item.email.startsWith(this.filter) || item.appName.startsWith(this.filter));
	}

	addNewSubscription() {
		this.router.navigate(['subs-edit']);
	}

	editItem(item: AlertSubscriber) {
		let itemCopy = Object.assign({}, item);
		this.router.navigate(['subs-edit'], {state: itemCopy});
	}

	removeItem(item: AlertSubscriber) {
		this.service.deleteSubscription(item.id)
			.subscribe(r => this.notificationService.showSuccess('Item successfully removed'));
		this.ngOnInit();
	}
}
