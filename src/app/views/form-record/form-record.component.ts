import {Component, Inject, OnInit} from '@angular/core';
import {ApiRecord, HttpMethod, KeyValueString, ParameterMemory, ParameterType, RequestMemoryTO} from "../../models/models";
import {RequestMemoryService} from "../../services/request-memory.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
	selector: 'app-form-record',
	templateUrl: './form-record.component.html',
	styleUrls: ['./form-record.component.css']
})
export class FormRecordComponent implements OnInit {

	record: RequestMemoryTO;
	options: FormGroup;
	defaultControl: FormControl = new FormControl(false);

	methodKeys: Map<string, string>;
	requestBody = ''

	readonly editorOptions = {theme: 'vs-dark', language: 'json'};

	constructor(private service: RequestMemoryService,
				fb: FormBuilder,
				@Inject(MAT_DIALOG_DATA) data: RequestMemoryTO,
				private dialogRef: MatDialogRef<FormRecordComponent>) {
		this.options = fb.group({
			hideRequired: new FormControl(false),
			floatLabel: this.defaultControl
		})

		this.record = data
		this.prepareRelationList(data)
		this.methodKeys = new Map<string, string>()
		this.requestBody = data.body

		for (let item in HttpMethod) {
			this.methodKeys.set(item, HttpMethod[item]);
		}
	}

	ngOnInit() {
	}

	save() {
		this.service.saveRequest(this.record).subscribe(r => {
			console.debug('Request saving: Result OK');
			this.dialogRef.close('OK');
		});
	}

	cancel() {
		this.dialogRef.close();
	}

	private prepareRelationList(data: RequestMemoryTO) {
		if (data.requestHeaders == undefined) {
			data.requestHeaders = new Array<ParameterMemory>();
		}
		if (data.parameters == undefined) {
			data.parameters = new Array<ParameterMemory>();
		}
	}

}
