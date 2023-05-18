import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Member } from './member';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class MemberService {

  private heroesUrl = 'api/heroes';  // Web APIのURL

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** サーバーから隊士を取得する */
  getHeroes(): Observable<Member[]> {
    return this.http.get<Member[]>(this.heroesUrl)
      .pipe(
        tap(members => this.log('fetched members')),
        catchError(this.handleError<Member[]>('getHeroes', []))
      );
  }

  /** IDにより隊士を取得する。idが見つからない場合は`undefined`を返す。 */
  getHeroNo404<Data>(id: number): Observable<Member> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Member[]>(url)
      .pipe(
        map(heroes => heroes[0]), // {0|1} 要素の配列を返す
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} member id=${id}`);
        }),
        catchError(this.handleError<Member>(`getHero id=${id}`))
      );
  }

  /** IDにより隊士を取得する。見つからなかった場合は404を返却する。 */
  getHero(id: number): Observable<Member> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Member>(url).pipe(
      tap(_ => this.log(`fetched member id=${id}`)),
      catchError(this.handleError<Member>(`getHero id=${id}`))
    );
  }

  /* 検索語を含む隊士を取得する */
  searchHeroes(term: string): Observable<Member[]> {
    if (!term.trim()) {
      // 検索語がない場合、空の隊士配列を返す
      return of([]);
    }
    return this.http.get<Member[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found members matching "${term}"`)),
      catchError(this.handleError<Member[]>('searchMembers', []))
    );
  }

  //////// Save methods //////////

  /** POST: サーバーに新しい隊士を登録する */
  addHero(member: Member): Observable<Member> {
    return this.http.post<Member>(this.heroesUrl, member, this.httpOptions).pipe(
      tap((newMember: Member) => this.log(`added member w/ id=${newMember.id}`)),
      catchError(this.handleError<Member>('addMember'))
    );
  }

  /** DELETE: サーバーから隊士を削除 */
  deleteHero(id: number): Observable<Member> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Member>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted member id=${id}`)),
      catchError(this.handleError<Member>('deleteMember'))
    );
  }

  /** PUT: サーバー上で隊士を更新 */
  updateHero(hero: Member): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated member id=${hero.id}`)),
      catchError(this.handleError<any>('updateMember'))
    );
  }

  /**
   * 失敗したHttp操作を処理します。
   * アプリを持続させます。
   * @param operation - 失敗した操作の名前
   * @param result - observableな結果として返す任意の値
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: リモート上のロギング基盤にエラーを送信する
      console.error(error); // かわりにconsoleに出力

      // TODO: ユーザーへの開示のためにエラーの変換処理を改善する
      this.log(`${operation} failed: ${error.message}`);

      // 空の結果を返して、アプリを持続可能にする
      return of(result as T);
    };
  }

  /** HeroServiceのメッセージをMessageServiceを使って記録 */
  private log(message: string) {
    this.messageService.add(`MemberService: ${message}`);
  }
}
