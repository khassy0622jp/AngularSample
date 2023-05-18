import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  members: Member[] = [];

  constructor(private memberService: MemberService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.memberService.getHeroes()
      .subscribe(members => this.members = members.slice(1, 5));
  }
}
