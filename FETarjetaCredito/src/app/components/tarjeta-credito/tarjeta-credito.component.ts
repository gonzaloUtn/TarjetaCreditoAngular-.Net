import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {
  listTarjeta: any [] = [ 
  ]; 
  accion = "AGREGAR";
  id: number | undefined;

  form: FormGroup; // agrupar elementos 

  constructor(private fb: FormBuilder, 
    private toastr: ToastrService, 
    private _tarjetaService: TarjetaService) {
    this.form= this.fb.group({
      titular: ['',Validators.required],//se valida y requiere el valor 
      numeroTarjeta:['',[Validators.required, Validators.maxLength(16), Validators.minLength(16)]],//se valida y requiere un min y max de 16 caracteres
      fechaExpiracion:['',[Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv:['',[Validators.required, Validators.maxLength(3), Validators.minLength(3)]] 

    })
   }

  ngOnInit(): void {
    this.obtenerTarjeta();
  }

  obtenerTarjeta () {
    this._tarjetaService.getListTarjeta().subscribe ( data =>{
      console.log(data);
      this.listTarjeta = data; //para que aparezca la lista 
    }, error => {
      console.log (error);
    })
  }

  guardarTarjeta(): void {
    //traer los datos
    const tarjeta: any= {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value, 
    }


    if (this.id==undefined) {
      //agregamos tarjeta
      this._tarjetaService.sabeTarjeta(tarjeta).subscribe(data =>{
        this.toastr.success('La tarjeta fue registrada con exito!', 'Tarjeta registrada!');
        this.obtenerTarjeta();
        this.form.reset();
      }, error => {
        this.toastr.error('opss, ocurrio un error', 'error')
        console.log (error);
      })
    } else {
      //editamos
      tarjeta.id = this.id;
      this._tarjetaService.updateTarjeta(this.id, tarjeta).subscribe(data=> {
        this.form.reset();
        this.accion= "AGREGAR";
        this.id = undefined;
        this.toastr.info('La tarjeta fue actualizada con exito', 'Tarjeta Actualizada');
        this.obtenerTarjeta();
      }, error=> {
        console.log(error);
      })
    }

    
    
  }

  eliminarTarjeta(id: number){
    this._tarjetaService.deleteTarjeta(id).subscribe( data=> {
      this.toastr.error('la tarjeta fue elimianda con exito!','tarjeta eliminada');
      this.obtenerTarjeta();

    }, error=> {
      console.log (error);
      });
  }

  editarTarjeta(tarjeta: any) {
    this.accion="EDITAR";
    this.id = tarjeta.id;// setear id 

    this.form.patchValue({
      titular:tarjeta.titular,
      numeroTarjeta:tarjeta.numeroTarjeta,
      fechaExpiracion:tarjeta.fechaExpiracion,
      cvv:tarjeta.cvv
    });
  }
  

}
