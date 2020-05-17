import {Component, Inject, OnInit} from '@angular/core';
import {AppRecord, HttpMethod, RequestMemoryInputTO} from "../models/models";
import {RequestMemoryService} from "../services/request-memory.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
	selector: 'app-form-record',
	templateUrl: './form-record.component.html',
	styleUrls: ['./form-record.component.css']
})
export class FormRecordComponent implements OnInit {

	record: RequestMemoryInputTO;
	allHeaders: string;
	allParameters: string;
	options: FormGroup;
	defaultControl: FormControl = new FormControl(false);

	methodOptions = HttpMethod
	methodKeys: string[];

	constructor(private service: RequestMemoryService,
				fb: FormBuilder,
				@Inject(MAT_DIALOG_DATA) data: RequestMemoryInputTO,
				private dialogRef: MatDialogRef<FormRecordComponent>) {
		this.options = fb.group({
			hideRequired: new FormControl(false),
			floatLabel: this.defaultControl
		});
		this.record = data;
		this.prepareTextAreas(data);
		this.methodKeys = Object.keys(this.methodOptions).filter(k => !isNaN(Number(k)));
	}

	ngOnInit() {
	}

	save() {
		this.service.saveRequest(this.record).subscribe(r => {
			console.log('Result OK');
			this.dialogRef.close('OK');
		});

	}

	cancel() {
		this.dialogRef.close();
	}

	private prepareTextAreas(data: RequestMemoryInputTO) {
		this.allParameters = this.mapToJson(data.parameters);
		this.allHeaders = this.mapToJson(data.requestHeaders);
	}

	private mapToJson(data: Map<string, string>): string {
		if (data) {
			let json = Object.create(null);
			data.forEach((v, k) => {
				json[k.trim()] = v;
			});
			return JSON.stringify(json, null, 2);
		}
		return null;
	}
}
