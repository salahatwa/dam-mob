import { Component, Input, OnInit } from '@angular/core';
import { Customer } from '@core/models/customer';
import { ModalController, NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'customer-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  
  @Input() title: string;
  @Input() customers: Customer[];
  @Input() color;
  

  ngOnInit() {
    
  }


  allSearchables = [];
  queryText: string;
  searchables = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {

  }

  filter() {
    // console.log(this.queryText);
    
    // Symbols.filter(this.queryText, of(this.allSearchables)).subscribe(symbols => {
    //   this.searchables = symbols;
    // });
  }
  filter2() {
    // console.log(this.queryText);
    // let filteredSearchables = [];
    // this.queryText = (<any>(this.queryText || '')).trimStart();
    // if (this.queryText != '') {
    //   this.queryText = Strings.normalizeArabicNumbers(this.queryText.toLowerCase());

    //   const digitsRegex = /\d+/m;

    //   // Do extraction of the query text
    //   let queryNumbers = this.queryText.match(digitsRegex);
    //   let queryNumber = queryNumbers && queryNumbers.length > 0 ? queryNumbers[0].trim() : null;
    //   let queryWords = this.queryText.replace(digitsRegex, '').trim().toLowerCase();

    //   let secondFilteredSearchables = [];
    //   this.allSearchables.forEach((searchable: ISearchable) => {
    //     var matchValue = searchable?.toString()?.toLocaleLowerCase();
    //     if (!matchValue) return;
    //     let numberIndex = null, wordsIndex = null;
    //     if (queryNumber)
    //       numberIndex = matchValue.indexOf(queryNumber);
    //     if (queryWords)
    //       wordsIndex = matchValue.indexOf(queryWords);

    //     if (numberIndex != null && numberIndex != -1) {
    //       if (wordsIndex == null || (wordsIndex != null && wordsIndex != -1)) {
    //         if (numberIndex == 0)
    //           filteredSearchables.push(searchable);
    //         else
    //           secondFilteredSearchables.push(searchable);
    //       }
    //     } else if (numberIndex == null && wordsIndex && wordsIndex != -1) {
    //       filteredSearchables.push(searchable);
    //     }
    //   }
    //   )
    //   filteredSearchables.push(...secondFilteredSearchables);
    // } else
    //   filteredSearchables = this.allSearchables;

    // this.searchables = filteredSearchables
  }

  select(customer) {
    this.modalCtrl.dismiss(customer);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}

