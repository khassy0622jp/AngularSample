import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Member } from './member';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const members = [
      { id: 11, name: '冨岡義勇' },
      { id: 12, name: '胡蝶しのぶ' },
      { id: 13, name: '煉獄杏寿郎' },
      { id: 14, name: '宇髄天元' },
      { id: 15, name: '甘露寺蜜璃' },
      { id: 16, name: '伊黒小芭内' },
      { id: 17, name: '不死川実弥' },
      { id: 18, name: '時透無一郎' },
      { id: 19, name: '悲鳴嶼行冥' },
      { id: 20, name: '竈門炭治郎' },
      { id: 21, name: '我妻善逸' },
      { id: 22, name: '嘴平伊之助' }
    ];
    return {heroes: members};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Member[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
