import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-sncak-bar',
  templateUrl: './update-sncak-bar.component.html',
  styleUrls: ['./update-sncak-bar.component.scss']
})
export class UpdateSncakBarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
