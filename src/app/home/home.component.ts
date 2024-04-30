import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeService } from '../shared/services/home.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  policyData: any = [];
  empData: any = {};

  constructor (private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getPoliciesByUser().subscribe(
      (data) => {
        this.policyData = data;
        console.log(data)
      },
      (error) => {
        console.error('Error fetching payment methods:', error);
      }
    );

    this.homeService.getEmpDetails().subscribe(
      (data) => {
        this.empData = data;
        console.log(data)
      },
      (error) => {
        console.error('Error fetching payment methods:', error);
      }
    );
  }
}