import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { forkJoin, map, mergeMap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private nextPokemonsLink: any = 'https://pokeapi.co/api/v2/pokemon/?limit=12'

  constructor(private http: HttpClient) { }

  getPokemons(url: string = this.nextPokemonsLink) {
    return this.http.get(`${url}`).pipe(
      map((value: any) => {
        this.nextPokemonsLink = value.next;

        const urls = value.results;
        console.log(urls);
        const data: any[] = []
        urls.map((val: any) => {
          data.push(val.url)
        })
        console.log(data)

        return data;
      }), mergeMap(pokemon => {
        let pokemonRequests: any = []
        pokemon.forEach(url => {
          pokemonRequests.push(this.http.get(url).pipe(map((data: any) => [
            data.id,
            data.name,
            data.sprites.front_default,
            data.types,
            data.stats,
            data.weight,
            data.moves
          ])))
        })

        return forkJoin(pokemonRequests)
      })

    )

  }

  
  




}

/*

.subscribe((allPokemons: any) => {
      let finarr: any[] = []

      allPokemons.map((value: any) => {
        finarr.push({
          id: value[0],
          name: value[1],
          sprite: value[2],
          types: value[3].map((data: any) => { return data.type.name }),
          stats: value[4].map((data: any) => { return data.base_stat }),
          weight: value[5],
          moves: value[6].length,
        }
        )
      })

      console.log(finarr)

    })

*/

