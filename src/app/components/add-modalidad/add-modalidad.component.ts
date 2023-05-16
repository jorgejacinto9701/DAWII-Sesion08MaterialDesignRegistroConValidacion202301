import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Deporte } from 'src/app/models/deporte.model';
import { Modalidad } from 'src/app/models/modalidad.model';
import { DeporteService } from 'src/app/services/deporte.service';
import { ModalidadService } from 'src/app/services/modalidad.service';
import { Validators, FormBuilder } from "@angular/forms";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-modalidad',
  templateUrl: './add-modalidad.component.html',
  styleUrls: ['./add-modalidad.component.css']
})
export class AddModalidadComponent implements OnInit {

  lstDeportes: Deporte [] = [] ;
  objModalidad: Modalidad = {
    deporte:{
      idDeporte:-1,
    }
  };

  formsRegistra= this.formBuilder.group({
    nombre:  ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]],
    numHombres: ['', [Validators.required, Validators.pattern('[0-9]{1,2}')]],
    numMujeres: ['', [Validators.required, Validators.pattern('[0-9]{1,2}')]],
    edadMinima: ['', [Validators.required, Validators.pattern('[0-9]{2}'), Validators.min(18), Validators.max(25)]],
    edadMaxima: ['', [Validators.required, Validators.pattern('[0-9]{2}'), Validators.min(18), Validators.max(40), Validators.max(40)]],
    sede: ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]],
    deporte: ['', [Validators.min(0)]],
});



  constructor(private formBuilder: FormBuilder,private deporteService:DeporteService, private modalidadService: ModalidadService) { 
      this.deporteService.listaDeporte().subscribe(
          x => this.lstDeportes = x
      );
  }

  registra(){
      if (this.formsRegistra.valid) {
            this.modalidadService.registraModalidad(this.objModalidad).subscribe(
              x => Swal.fire({icon: 'info',title: 'Resultado del Registro',text: x.errores}) 
            );
      }
  }  

  ngOnInit(): void {
  }

  

}
