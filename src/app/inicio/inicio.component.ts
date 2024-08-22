import { Component, OnInit } from '@angular/core';
import { Produto } from '../models/Produto.models';
import { ProdutoService } from '../produto.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{ //criar o metodo ngOnInit
  
  public produtos: Produto[]=[];

  constructor(private _produtoService:ProdutoService){}

  ngOnInit(): void {
      this.listarProdutos();//vai inicializar este métodos
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
}
