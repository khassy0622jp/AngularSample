import { Component, OnInit } from '@angular/core';

import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members: Member[] = [];

  constructor(private memberService: MemberService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.memberService.getHeroes()
    .subscribe(members => this.members = members);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.memberService.addHero({ name } as Member)
      .subscribe(hero => {
        this.members.push(hero);
      });
  }

  delete(hero: Member): void {
    this.members = this.members.filter(h => h !== hero);
    this.memberService.deleteHero(hero.id).subscribe();
  }

}
