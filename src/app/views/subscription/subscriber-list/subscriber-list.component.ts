import { Component, OnInit } from '@angular/core';
import {AlertSubscriber} from "../../../models/models";
import {SubscriberService} from "../../../services/subscriber.service";
import {NotificationService} from "../../../services/notification.service";
import {Router} from "@angular/router";
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/confirm-dialog/ConfirmDialogComponent';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-subscriber-list',
  templateUrl: './subscriber-list.component.html',
  styleUrls: ['./subscriber-list.component.css']
})
export class SubscriberListComponent implements OnInit {
	filter: string = "";
	data: AlertSubscriber[] = [];

	// for while, we filter only on frontend
	private completeList: AlertSubscriber[] = [];

	constructor(private service: SubscriberService,
				private router: Router,
				private notificationService: NotificationService,
				private dialog: MatDialog) {
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
			(item) => item.email.startsWith(this.filter) || item.apiName.startsWith(this.filter));
	}

	addNewSubscription() {
		this.router.navigate(['subs-edit']);
	}

	formatPaths(paths: Array<string>): string {
		if (!paths) {
			return "";
		}
		return paths.join(',<br />');
	}

	editItem(item: AlertSubscriber) {
		let itemCopy = Object.assign({}, item);
		this.router.navigate(['subs-edit'], {state: itemCopy});
	}

	removeItem(item: AlertSubscriber) {
		let ref = this;
		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			maxWidth: "400px",
			data: new ConfirmDialogModel("Confirm Action", `Delete subscription? \n${item.apiName}: ${item.email}`)
		  });
	  
		  dialogRef.afterClosed().subscribe(dialogResult => {
			if (dialogResult) {
				ref.service.deleteSubscription(item.id ?? -1)
					.subscribe(r => { 
						ref.notificationService.showSuccess('Item successfully removed');
						ref.ngOnInit();
					});
			}
		  });		
	}
}
