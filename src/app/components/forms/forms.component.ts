import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Pessoa } from 'src/app/models/pessoa/pessoa';
import { ViaCepModel } from 'src/app/models/via-cep-modal/via-cep-model';
import { PessoaService } from 'src/app/services/pessoa/pessoa.service';
import { ViaCepService } from 'src/app/services/via-cep/via-cep.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  formCadastro: ViaCepModel = {};

  showForm = new Subject<boolean>();

  formPessoa: Pessoa = new Pessoa({});

  okInsert: boolean = false;

  /* SOFT SKILLS */

  arraySoftSkills = [
    'Comunicativo',
    'Criativo',
    'Trabalho em equipe',
    'Quieto',
    'Curioso',
    'Trabalho melhor sozinho',
    'Blablabla',
    'Blablabla',
    'Blablabla',
    'Blablabla',
  ];

  softSkillsDesejadas = ['Comunicativo', 'Blablabla', 'Criativo'];

  softSkillsSelecionadas: string[] = [];

  /* HARD SKILLS */

  arrayHardSkills = [
    'HTML',
    'CSS',
    'Bootstrap',
    'Sass',
    'JavaScript',
    'React',
    'Angular',
    'Vue',
    'Java',
    'Spring Boot',
    'Python',
    'C#',
  ];

  hardSkillsSelecionadas: string[] = [];

  constructor(
    private cepService: ViaCepService,
    private pessoaService: PessoaService
  ) {}

  ngOnInit(): void {}

  /* SOFT SKILLS */

  onClickSoftSkill(skill: string): void {
    if (this.softSkillsSelecionadas.indexOf(skill) === -1) {
      this.softSkillsSelecionadas.push(skill);
    } else {
      this.softSkillsSelecionadas = this.softSkillsSelecionadas.filter(
        (x) => x !== skill
      );
    }
  }

  getSoftSkillStyle(skill: string): string {
    if (this.softSkillsSelecionadas.indexOf(skill) !== -1) {
      return 'btn-selecionada';
    }

    return 'btn-nao-selecionada';
  }

  /* HARD SKILLS */

  onClickHardSkill(skill: string): void {
    if (this.hardSkillsSelecionadas.indexOf(skill) === -1) {
      this.hardSkillsSelecionadas.push(skill);
    } else {
      this.hardSkillsSelecionadas = this.hardSkillsSelecionadas.filter(
        (x) => x !== skill
      );
    }
  }

  getHardSkillStyle(skill: string): string {
    if (this.hardSkillsSelecionadas.indexOf(skill) !== -1) {
      return 'btn-selecionada';
    }

    return 'btn-nao-selecionada';
  }

  getViaCEP(cep: FocusEvent) {
    if ((cep.target as HTMLInputElement)?.value) {
      let inputCEP = (cep.target as HTMLInputElement)?.value;
      const cepResponse = this.cepService.getCep(inputCEP);
      cepResponse.subscribe((cepModel) => {
        this.formCadastro = cepModel;
        this.showForm.next(true);
      });
    }
  }

  addPessoa() {
    this.pessoaService.postPessoa(this.formPessoa).subscribe((pessoa) => {
      if (!(typeof pessoa.idPessoa == 'undefined') && pessoa.idPessoa > 0) {
        this.okInsert = true;
        setTimeout(() => {
          this.okInsert = false;
          this.formPessoa = new Pessoa({});
        }, 5000);
      }
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cadastro realizado com sucesso!',
      text: 'Em breve entraremos em contato com você',
      showConfirmButton: false,
      timer: 2500,
    });
  }
  resetForm() {
    this.formPessoa = new Pessoa({});
  }
}
