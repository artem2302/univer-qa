import { Component, OnInit } from '@angular/core';
import { FacultiesService } from './faculties.service';

@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.component.html',
  styleUrls: ['./faculties.component.css'],
  providers: [FacultiesService]
})
export class FacultiesComponent implements OnInit {
  faculties: any[] = [];
  private skip = 0;
  private limit = 10;

  constructor(private facultiesService: FacultiesService) { }

  ngOnInit(): void {
    this.facultiesService
      .getFaculties(this.skip, this.limit)
      .subscribe(data => {
        this.faculties = data as any;
        console.log(data)
      })
  }

}
