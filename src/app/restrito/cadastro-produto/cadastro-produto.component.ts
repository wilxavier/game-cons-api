import { Component } from '@angular/core';
import { Produto } from 'src/app/models/Produto.models';
import { Router } from '@angular/router';
import { ProdutoService } from 'src/app/produto.service';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent {

  public produto: Produto = new Produto(0,"","","",0);//só colocar o valor default, valor definido no modelo

  constructor(private _produtoService:ProdutoService, private _router:Router){}

  cadastrar():void{
    this._produtoService.cadastrarProduto(this.produto).subscribe(
      produto => {
        this.produto = new Produto(0,"","","",0);
        alert("Cadastro Efetuado com Sucesso!");
      },
      err => {
        alert("Erro ao Cadastrar");
      }
    );

    this._router.navigate(["restrito/lista"]);
  }

}
