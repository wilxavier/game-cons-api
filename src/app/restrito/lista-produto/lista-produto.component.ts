import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { Produto } from 'src/app/models/Produto.models';
import { ProdutoService } from 'src/app/produto.service';

@Component({
  selector: 'app-lista-produto',
  templateUrl: './lista-produto.component.html',
  styleUrls: ['./lista-produto.component.css']
})
export class ListaProdutoComponent  implements OnInit{

  public produtos: Produto[] = [];

  constructor(private _produtoService:ProdutoService, private _router:Router,
    private _loginService:LoginService){}// criar uma outra injecao de dependencia

  ngOnInit(): void {
      this.listarProdutos();
      this._loginService.setMostraMenu(false);// vai deixar o menu falso
  }

  listarProdutos():void{
    this._produtoService.getProdutos().subscribe(
      retornaProduto =>{
        this.produtos = retornaProduto.map(
          item => {
            return new Produto(
              item.id,
              item.produto,
              item.descricao,
              item.foto,
              item.preco
            );
          }
        )
      }
    )
  }

  //criar o excluir, conseguir identicar qual item, fazer a atualizacao na api, erron function
  excluir(id:number){
    this._produtoService.removerProduto(id).subscribe(
      produto => {
        this.listarProdutos();//vai exibir listar produto
      },
      err => {alert("Erro ao Excluir")} //tratamento - caso de erro
    );

    //redirecione para o listar usando o uma rota
    this._router.navigate(["/restrito/lista"]);
  }

}
