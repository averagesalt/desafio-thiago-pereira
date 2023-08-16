class CaixaDaLanchonete {
    calcularValorDaCompra(metodoDePagamento, itens) {
        const cardapio = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50
        };

        const descontoDinheiro = 0.05;
        const acrescimoCredito = 0.03;

        let valorTotal = 0;
        let possuiCafe = false;
        let possuiSanduiche = false;

        if (!["debito", "credito", "dinheiro"].includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        for (const itemInfo of itens) {
            const [item, quantidade] = itemInfo.split(',');

            const codigo = item;

            if (!cardapio[codigo]) {
                return "Item inválido!";
            }

            if (parseInt(quantidade) === 0) {
                return "Quantidade inválida!";
            }


            valorTotal += cardapio[codigo] * parseInt(quantidade);


            // validade dos extras
            if (codigo === "cafe") {
                possuiCafe = true;
            }
            if (codigo === "sanduiche") {
                possuiSanduiche = true;
            }
            if (codigo === "chantily" && !possuiCafe) {
                return "Item extra não pode ser pedido sem o principal";
            }
            if (codigo === "queijo" && !possuiSanduiche) {
                return "Item extra não pode ser pedido sem o principal";
            }
        }



        if (metodoDePagamento === "dinheiro") {
            valorTotal *= (1 - descontoDinheiro);
        } else if (metodoDePagamento === "credito") {
            valorTotal *= (1 + acrescimoCredito);
        } else if (metodoDePagamento !== "debito") {
            return "Forma de pagamento inválida!";
        }

        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete }