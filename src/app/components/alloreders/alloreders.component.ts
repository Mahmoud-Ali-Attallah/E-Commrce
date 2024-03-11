import { Component } from '@angular/core';
import { cartOwner } from 'src/app/shared/Interfaces/cart-owner';
import { CheckOutService } from 'src/app/shared/services/check-out.service';

@Component({
  selector: 'app-alloreders',
  templateUrl: './alloreders.component.html',
  styleUrls: ['./alloreders.component.css']
})
export class AlloredersComponent {
  Data : cartOwner[] = []
constructor(private _CheckOutService:CheckOutService) {}
getData(){
  this._CheckOutService.userOrder().subscribe({
    next : (response)=>{
      console.log(response) ;
      this.Data = response ;
    },
    error:(response)=>{
      console.log(response) ;

    }
  })
}
}
