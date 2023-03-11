import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {
  FilteredPokemonsList: any = []
  UnfilteredPokemonsList: any = []
  ExpandedPokemonVievData: any = {}
  ExpandedPokemonVievClicked = false
  loadingStatus = false
  nextDisabled = true
  prevDisabled = true
  PokemonVievPage = 0

  constructor(private apiService: ApiService, private scroll: ViewportScroller) { }

  formatData(rawObservable: Observable<any>) {
    this.loadingStatus = true
    let pokemons: any = []

    rawObservable.subscribe((allPokemons: any) => {

      allPokemons.map((value: any) => {
        pokemons.push({
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

      console.log(pokemons)
      this.FilteredPokemonsList.push(pokemons)
      this.loadingStatus = false
    })

  }

  ngOnInit() {
    this.formatData(this.apiService.getPokemons())
  }

  loadMore() {
    this.formatData(this.apiService.getPokemons())
    this.PokemonVievPage += 1
  }

  passToExpanded(data: any) {
    console.log(data)
    this.ExpandedPokemonVievClicked = true
    this.ExpandedPokemonVievData = data

    this.scroll.scrollToPosition([0, 0])
  }


  filterList(type: string) {
    this.UnfilteredPokemonsList = this.FilteredPokemonsList
    this.FilteredPokemonsList = []
    console.log('saved', this.UnfilteredPokemonsList)

    this.UnfilteredPokemonsList.map((pokemon: any) => {
      if ((pokemon.types).includes(type)) {
        this.FilteredPokemonsList.push(pokemon)
      }
    })
  }

  paginatorNext() {
    console.log(this.FilteredPokemonsList.length, this.PokemonVievPage)
    
    if (this.PokemonVievPage < this.FilteredPokemonsList.length) {
      this.PokemonVievPage += 1
    }
    if (this.PokemonVievPage + 1 > this.FilteredPokemonsList.length) {
      this.PokemonVievPage = 0
    }
    if (this.PokemonVievPage == this.FilteredPokemonsList.length) {
      this.PokemonVievPage -= 1
    }
  }

  paginatorPrev() {
    console.log(this.FilteredPokemonsList.length, this.PokemonVievPage)

    if (this.PokemonVievPage - 1 >= 0) {
      this.PokemonVievPage -= 1
    }
    else {
      this.PokemonVievPage = this.FilteredPokemonsList.length - 1
    }
  }




}
