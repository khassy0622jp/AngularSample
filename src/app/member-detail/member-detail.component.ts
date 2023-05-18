import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: [ './member-detail.component.css' ]
})
export class MemberDetailComponent implements OnInit {
  member: Member | undefined;

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.memberService.getHero(id)
      .subscribe(hero => this.member = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.member) {
      this.memberService.updateHero(this.member)
        .subscribe(() => this.goBack());
    }
  }
}
