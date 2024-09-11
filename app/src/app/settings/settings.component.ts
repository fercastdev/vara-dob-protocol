import { Component, OnInit  } from '@angular/core';
import { Language } from '../shared/interfaces/language';
import { Currency } from '../shared/interfaces/currency'
import { configUser } from '../shared/interfaces/config';
import { ConfigUserService } from '../services/config-user.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  configForm: FormGroup;
  user: configUser;
  visible = false;
  date = new Date();
  isMobile: boolean;

  constructor(private configUserService: ConfigUserService, 
              private route:ActivatedRoute, private formBuilder:FormBuilder) { 
                
              }
              
    ngOnInit(): void {
      this.getSettingUser();
      this.size();
      this.buildForm();
    }

    size(){
      if(window.screen.availWidth<767){
        this.isMobile=true;
      }else{
        this.isMobile=false;
      }
    }

    getSettingUser(){
      let id = this.route.snapshot.paramMap.get('id');
      this.configUserService.getUser(id)
      .subscribe((prof: configUser)=>{
        this.user = prof;
        this.configForm.setValue({
          'currency': this.user.currency,
          'primary' : this.user.primary,
          'lang' : this.user.lang,
          'background' : this.user.background,
          'd_browser' : this.user.d_browser,
          'd_email' : this.user.d_email,
          'd_desktop' : this.user.d_desktop,
          'i_browser' : this.user.i_browser,
          'i_email' : this.user.i_email,
          'i_desktop' : this.user.i_desktop,
        })
      });
    }
    
    private buildForm(){
      this.configForm = this.formBuilder.group({
        currency: [{value: ''}, [Validators.required]],
        primary: [{value: ''}, [Validators.required]],
        lang: [{value: ''}, [Validators.required]],
        background: [{value: ''}, [Validators.required]],
        d_browser: [{value: ''}, [Validators.required]],
        d_email: [{value: ''}, [Validators.required]],
        d_desktop: [{value: ''}, [Validators.required]],
        i_browser: [{value: ''}, [Validators.required]],
        i_email: [{value: ''}, [Validators.required]],
        i_desktop: [{value: ''}, [Validators.required]],
    })
  }

  save(event: Event):void {
    event.preventDefault();
    this.visible=true;
      setTimeout( this.visibleSuccess,2000);
  }

  visibleSuccess(): void{
    this.visible=false;
  }

  idioms: Language[] = [
    {value: 'ES', viewValue: 'ES - Español'},
    {value: 'EN', viewValue: 'EN - English'},
  ];

  currencies: Currency[] = [
    {value: 'ADP', viewValue: 'ADP - Andorran peseta Currency'},
    {value: 'AFN', viewValue: 'AFN - Afghan afghani Currency'},
    {value: 'ALL', viewValue: 'ALL - Albanian lek Currency'},
    {value: 'AMD', viewValue: 'AMD - Armenian dram Currency'},
    {value: 'AOA', viewValue: 'AOA - Angolan kwanza Currency'},
    {value: 'ARS', viewValue: 'ARS - Argentine peso Currency'},
    {value: 'AUD', viewValue: 'AUD - Australian dollar Currency'},
    {value: 'BAM', viewValue: 'BAM - Bosnia and Herzegovina convertible mark Currency'},
    {value: 'BBD', viewValue: 'BBD - Barbados dollar Currency'},
    {value: 'BDT', viewValue: 'BDT - Bangladeshi taka Currency'},
    {value: 'BHD', viewValue: 'BHD - Bahraini dinar Currency'},
    {value: 'BIF', viewValue: 'BIF - Burundian franc Currency'},
    {value: 'BMD', viewValue: 'BMD - Bermudian dollar Currency'},
    {value: 'BND', viewValue: 'BND - Brunei dollar Currency'},
    {value: 'BOB', viewValue: 'BOB - Boliviano Currency'},
    {value: 'BRL', viewValue: 'BRL - Brazilian real Currency'},
    {value: 'BSD', viewValue: 'BSD - Bahamian dollar Currency'},
    {value: 'BWP', viewValue: 'BWP - Botswana pula Currency'},
    {value: 'BYN', viewValue: 'BYN - Belarusian ruble Currency'},
    {value: 'BYR', viewValue: 'BYR - Belarusian ruble Currency'},
    {value: 'BZD', viewValue: 'BZD - Belize dollar Currency'},
    {value: 'CAD', viewValue: 'CAD - Canadian dollar Currency'},
    {value: 'CHF', viewValue: 'CHF - Swiss franc Currency'},
    {value: 'CLF', viewValue: 'CLF - Unidad de Fomento Currency'},
    {value: 'CLP', viewValue: 'CLP - Chilean peso Currency'},
    {value: 'CNY', viewValue: 'CNY - RenminbiRenminbi (Chinese) yuan Currency'},
    {value: 'COP', viewValue: 'COP - Colombian peso Currency'},
    {value: 'CRC', viewValue: 'CRC - Costa Rican colon Currency'},
    {value: 'CUC', viewValue: 'CUC - Cuban convertible peso Currency'},
    {value: 'CUP', viewValue: 'CUP - Cuban peso Currency'},
    {value: 'CZK', viewValue: 'CZK - Czech koruna Currency'},
    {value: 'DJF', viewValue: 'DJF - Djiboutian franc Currency'},
    {value: 'DKK', viewValue: 'DKK - Danish krone Currency'},
    {value: 'DOP', viewValue: 'DOP - Dominican peso Currency'},
    {value: 'EGP', viewValue: 'EGP - Egyptian pound Currency'},
    {value: 'ESP', viewValue: 'ESP - Spanish peseta Currency'},
    {value: 'EUR', viewValue: 'EUR - Euro Currency'},
    {value: 'FJD', viewValue: 'FJD - Fijian dollarFiji dollar Currency'},
    {value: 'FKP', viewValue: 'FKP - Falkland Islands pound Currency'},
    {value: 'GBP', viewValue: 'GBP - Pound sterling Currency'},
    {value: 'GEL', viewValue: 'GEL - Georgian lari Currency'},
    {value: 'GIP', viewValue: 'GIP - Gibraltar pound Currency'},
    {value: 'GNF', viewValue: 'GNF - Guinean franc Currency'},
    {value: 'GTQ', viewValue: 'GTQ - Guatemalan quetzal Currency'},
    {value: 'GYD', viewValue: 'GYD - Guyanese dollar Currency'},
    {value: 'HKD', viewValue: 'HKD - Hong Kong dollar Currency'},
    {value: 'HNL', viewValue: 'HNL - Honduran lempira Currency'},
    {value: 'HRK', viewValue: 'HRK - Croatian kuna Currency'},
    {value: 'HUF', viewValue: 'HUF - Hungarian forint Currency'},
    {value: 'IDR', viewValue: 'IDR - Indonesian rupiah Currency'},
    {value: 'ILS', viewValue: 'ILS - Israeli new shekel Currency'},
    {value: 'INR', viewValue: 'INR - Indian rupee Currency'},
    {value: 'IQD', viewValue: 'IQD - Iraqi dinar Currency'},
    {value: 'IRR', viewValue: 'IRR - Iranian rial Currency'},
    {value: 'ISK', viewValue: 'ISK - Icelandic krona Currency'},
    {value: 'ITL', viewValue: 'ITL - Italian lira Currency'},
    {value: 'JMD', viewValue: 'JMD - Jamaican dollar Currency'},
    {value: 'JOD', viewValue: 'JOD - Jordanian dinar Currency'},
    {value: 'JPY', viewValue: 'JPY - Japanese yen Currency'},
    {value: 'KHR', viewValue: 'KHR - Cambodian riel Currency'},
    {value: 'KMF', viewValue: 'KMF - Comoro franc Currency'},
    {value: 'KPW', viewValue: 'KPW - North Korean won Currency'},
    {value: 'KRW', viewValue: 'KRW - South Korean won Currency'},
    {value: 'KWD', viewValue: 'KWD - Kuwaiti dinar Currency'},
    {value: 'KYD', viewValue: 'KYD - Cayman Islands dollar Currency'},
    {value: 'KZT', viewValue: 'KZT - Kazakhstani tenge Currency'},
    {value: 'LAK', viewValue: 'LAK - Lao kip Currency'},
    {value: 'LBP', viewValue: 'LBP - Lebanese pound Currency'},
    {value: 'LKR', viewValue: 'LKR - Sri Lankan rupee Currency'},
    {value: 'LRD', viewValue: 'LRD - Liberian dollar Currency'},
    {value: 'LTL', viewValue: 'LTL - Lithuanian litas Currency'},
    {value: 'LUF', viewValue: 'LUF - Luxembourg franc Currency'},
    {value: 'LVL', viewValue: 'LVL - Latvian lats Currency'},
    {value: 'LYD', viewValue: 'LYD - Libyan dinar Currency'},
    {value: 'MGA', viewValue: 'MGA - Malagasy ariary Currency'},
    {value: 'MGF', viewValue: 'MGF - Malagasy franc Currency'},
    {value: 'MMK', viewValue: 'MMK - Myanmar kyat Currency'},
    {value: 'MNT', viewValue: 'MNT - Mongolian tugrik Currency'},
    {value: 'MRO', viewValue: 'MRO - Mauritanian Ouguiya Currency'},
    {value: 'MUR', viewValue: 'MUR - Mauritian rupee Currency'},
    {value: 'MXR', viewValue: 'MXR - Mexican peso Currency'},
    {value: 'MYR', viewValue: 'MYR - Malaysian ringgit Currency'},
    {value: 'NAD', viewValue: 'NAD - Namibian dollar Currency'},
    {value: 'NGN', viewValue: 'NGN - Nigerian naira Currency'},
    {value: 'NIO', viewValue: 'NIO - Nicaraguan cordoba Currency'},
    {value: 'NOK', viewValue: 'NOK - Norwegian krone Currency'},
    {value: 'NPR', viewValue: 'NPR - Nepalese rupee Currency'},
    {value: 'NZD', viewValue: 'NZD - New Zealand dollar Currency'},
    {value: 'OMR', viewValue: 'OMR - Omani rial Currency'},
    {value: 'PHP', viewValue: 'PHP - Philippine peso Currency'},
    {value: 'PKR', viewValue: 'PKR - Pakistani rupee Currency'},
    {value: 'PLN', viewValue: 'PLN - Polish zloty Currency'},
    {value: 'PYG', viewValue: 'PYG - Paraguayan guarani Currency'},
    {value: 'RON', viewValue: 'RON - Romanian leu Currency'},
    {value: 'RSD', viewValue: 'RSD - Serbian dinar Currency'},
    {value: 'RUB', viewValue: 'RUB - Russian ruble Currency'},
    {value: 'RUR', viewValue: 'RUR - Russian ruble Currency'},
    {value: 'RWF', viewValue: 'RWF - Rwandan franc Currency'},
    {value: 'SBD', viewValue: 'SBD - Solomon Islands dollar Currency'},
    {value: 'SEK', viewValue: 'SEK - Swedish krona/kronor Currency'},
    {value: 'SGD', viewValue: 'SGD - Singapore dollar Currency'},
    {value: 'SHP', viewValue: 'SHP - Saint Helena pound Currency'},
    {value: 'SLL', viewValue: 'SLL - Sierra Leonean leone Currency'},
    {value: 'SOS', viewValue: 'SOS - Somali shilling Currency'},
    {value: 'SRD', viewValue: 'SRD - Surinamese dollar Currency'},
    {value: 'SSP', viewValue: 'SSP - South Sudanese pound Currency'},
    {value: 'STD', viewValue: 'STD - Sao Tome/Principe Dobra Currency'},
    {value: 'STN', viewValue: 'STN - Sao Tome/Principe Dobra Currency'},
    {value: 'SYP', viewValue: 'SYP - Syrian pound Currency'},
    {value: 'THB', viewValue: 'THB - Thai baht Currency'},
    {value: 'TMM', viewValue: 'TMM - Turkmenistani manat Currency'},
    {value: 'TND', viewValue: 'TND - Tunisian dinar Currency'},
    {value: 'TOP', viewValue: 'TOP - Tongan paanga Currency'},
    {value: 'TRL', viewValue: 'TRL - Turkish lira Currency'},
    {value: 'TRY', viewValue: 'TRY - Turkish lira Currency'},
    {value: 'TTD', viewValue: 'TTD - Trinidad and Tobago dollar Currency'},
    {value: 'TWD', viewValue: 'TWD - New Taiwan dollar Currency'},
    {value: 'TZS', viewValue: 'TZS - Tanzanian shilling Currency'},
    {value: 'UAH', viewValue: 'UAH - Ukrainian hryvnia Currency'},
    {value: 'UGX', viewValue: 'UGX - Ugandan shilling Currency'},
    {value: 'USD', viewValue: 'USD - United States dollar Currency'},
    {value: 'UYI', viewValue: 'UYI - Uruguay Peso en Unidades Indexadas Currency'},
    {value: 'UYU', viewValue: 'UYU - Uruguayan peso Currency'},
    {value: 'UZS', viewValue: 'UZS - Uzbekistan som Currency'},
    {value: 'VEF', viewValue: 'VEF - Venezuelan bolivar Currency'},
    {value: 'VND', viewValue: 'VND - Vietnamese dong Currency'},
    {value: 'VUV', viewValue: 'VUV - Vanuatu vatu Currency'},
    {value: 'XAF', viewValue: 'XAF - CFA franc BEAC Currency'},
    {value: 'XCD', viewValue: 'XCD - East Caribbean dollar Currency'},
    {value: 'XOF', viewValue: 'XOF - CFA franc BCEAO Currency'},
    {value: 'XPF', viewValue: 'XPF - CFP franc (franc Pacifique) Currency'},
    {value: 'YER', viewValue: 'YER - Yemeni rial Currency'},
    {value: 'ZAR', viewValue: 'ZAR - South African rand Currency	'},
    {value: 'ZMK', viewValue: 'ZMK - Zambian kwacha Currency	'},
    {value: 'ZMW', viewValue: 'ZMW - Zambian kwacha Currency	'},
    {value: 'ZWD', viewValue: 'ZWD - Zimbabwean dollar Currency	'},
  ];
}

