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

  constructor(private apiService: ApiService, private scroll: ViewportScroller) { }

  formatData(rawObservable: Observable<any>) {
    this.loadingStatus = true
    rawObservable.subscribe((allPokemons: any) => {
          
      allPokemons.map((value: any) => {
        this.FilteredPokemonsList.push({
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

      console.log(this.FilteredPokemonsList)
      this.loadingStatus = false
    })
   
  }

  ngOnInit() {
    this.formatData(this.apiService.getPokemons())
  }

  loadMore() {
    this.formatData(this.apiService.getPokemons())
  }

  passToExpanded(data: any) {
    console.log(data)
    this.ExpandedPokemonVievClicked = true
    this.ExpandedPokemonVievData = data

    this.scroll.scrollToPosition([0,0])
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
 


}
