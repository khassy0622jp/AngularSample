import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './member-search.component.html',
  styleUrls: [ './member-search.component.css' ]
})
export class MemberSearchComponent implements OnInit {
  members$!: Observable<Member[]>;
  private searchTerms = new Subject<string>();

  constructor(private memberService: MemberService) {}

  // 検索語をobservableストリームにpushする
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.members$ = this.searchTerms.pipe(
      // 各キーストロークの後、検索前に300ms待つ
      debounceTime(300),

      // 直前の検索語と同じ場合は無視する
      distinctUntilChanged(),

      // 検索語が変わる度に、新しい検索observableにスイッチする
      switchMap((term: string) => this.memberService.searchHeroes(term)),
    );
  }
}
