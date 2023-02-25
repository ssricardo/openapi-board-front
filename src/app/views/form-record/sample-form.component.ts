import {Component, Inject, OnInit} from '@angular/core';
import {HttpMethod, ParameterMemory, RequestSampleTO} from "../../models/models";
import {RequestMemoryService} from "../../services/request-memory.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
	selector: 'app-sample-form',
	templateUrl: './sample-form.component.html',
	styleUrls: ['./sample-form.component.css']
})
export class SampleFormComponent implements OnInit {

	record: RequestSampleTO;
	options: FormGroup;
	defaultControl: FormControl = new FormControl(false);

	methodKeys: Map<string, string>;

	readonly editorOptions = {theme: 'vs-dark', language: 'json'};

	constructor(private service: RequestMemoryService,
				fb: FormBuilder,
				@Inject(MAT_DIALOG_DATA) data: RequestSampleTO,
				private dialogRef: MatDialogRef<SampleFormComponent>) {
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
		this.record.body = this.requestBody
		this.service.saveRequest(this.record).subscribe(r => {
			console.debug('Request saving: Result OK');
			this.dialogRef.close('OK');
		});
	}

	cancel() {
		this.dialogRef.close();
	}

	private prepareRelationList(data: RequestSampleTO) {
		if (data.requestHeaders == undefined) {
			data.requestHeaders = new Array<ParameterMemory>();
		}
		if (data.parameters == undefined) {
			data.parameters = new Array<ParameterMemory>();
		}
	}

	get requestBody(): string | null {
		return this?.record?.body
	}

	set requestBody(value) {
		if (this.record) {
			this.record.body = value;
		}
	}

}
