// FUNÇÃO PARA MOSTRAR AS SEÇÕES DO SITE

function mostrar(categoria) {

    // Seleciona todas as partes do site que possuem a classe "conteudo"
    var conteudos = document.querySelectorAll(".conteudo");

    // Percorre cada uma das seções encontradas
    conteudos.forEach(function(conteudo) {

        // Verifica se a categoria da seção é igual à categoria escolhida
        if (conteudo.dataset.categoria === categoria) {

            // Se for igual, mostra a seção
            conteudo.style.display = "block";

        } else {

            // Se for diferente, esconde a seção
            conteudo.style.display = "none";

        }

    });

}


// FUNÇÃO PARA REALIZAR O PEDIDO

function pedir() {

    // Pega o produto escolhido pelo cliente no HTML
    var opcoes = document.getElementById("opcao").value;

    // Pega a quantidade e transforma o texto em número
    var quantidade = Number(document.getElementById("qtd").value);

    // Pega a forma de pagamento escolhida
    var pagamento = document.getElementById("pagamento").value;

    // Variável que armazenará o preço do produto
    var preco;


    // VERIFICAÇÃO DOS CAMPOS

    // Confere se os campos foram preenchidos corretamente
    // Também verifica se a quantidade é um número inteiro positivo
    if (opcoes === "" || pagamento === "" || quantidade <= 0 ||
        !Number.isInteger(quantidade)) {

        // Mostra uma mensagem de erro caso algum campo esteja incorreto
        alert("Preencha todos os campos corretamente!");

        // Interrompe a função para não continuar o cálculo
        return;
    }


    // DEFINIÇÃO DOS PREÇOS DOS PRODUTOS

    // O switch verifica qual produto foi escolhido
    switch (opcoes) {

        // Se o cliente escolher bolo, o preço será R$ 99,90
        case "bolo":
            preco = 99.90;
            break;

        // Se escolher cupcake, o preço será R$ 29,50
        case "cupcake":
            preco = 29.50;
            break;

        // Se escolher cookie, o preço será R$ 15,60
        case "cookie":
            preco = 15.60;
            break;

        // Se escolher brigadeiro, o preço será R$ 60,50
        case "brigadeiro":
            preco = 60.50;
            break;

        // Caso nenhuma opção seja reconhecida, mostra um aviso
        default:
            alert("Volte ao cardápio para verificar nossos produtos!");
            return;
    }


    // CÁLCULO DO VALOR TOTAL

    // Multiplica o preço do produto pela quantidade escolhida
    var total = preco * quantidade;


    // DESCONTO PARA PIX OU DÉBITO

    // Verifica se a forma de pagamento é Pix OU débito
    if (pagamento === "pix" || pagamento === "debito") {

        // Multiplica o total por 0.95 para aplicar 5% de desconto
        total = total * 0.95;

    }


    // CÁLCULO DO PARCELAMENTO NO CRÉDITO

    // Cria uma variável para guardar as informações do pagamento
    var mensagem = "";

    // Verifica se o cliente escolheu pagar no crédito
    if (pagamento === "credito") {

        // Abre uma caixa perguntando em quantas vezes deseja parcelar
        var parcela = Number(
            prompt("Em quantas vezes você deseja parcelar? (Máximo de 10 vezes)")
        );

        // Verifica se o número de parcelas é inteiro e está entre 1 e 10
        if (!Number.isInteger(parcela) || parcela < 1 || parcela > 10) {

            // Mostra um aviso caso o parcelamento seja inválido
            alert("Escolha uma quantidade de parcelas entre 1 e 10.");

            // Interrompe a função
            return;
        }

        // Divide o valor total pela quantidade de parcelas
        var valorParcela = total / parcela;

        // Monta a mensagem com os dados do parcelamento
        mensagem = "Forma de pagamento: Crédito<br>" +
            "Quantidade de parcelas: " + parcela + "x<br>" +
            "Valor de cada parcela: " +

            // Formata o valor para aparecer em reais (R$)
            valorParcela.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

    }

    // INFORMAÇÕES PARA PIX OU DÉBITO
    else {

        // Informa a forma de pagamento e o desconto aplicado
        mensagem = "Forma de pagamento: " +
            pagamento.toUpperCase() + "<br>" +
            "Desconto aplicado: 5%";

    }


    // EXIBIÇÃO DO RESULTADO NA PÁGINA

    // Seleciona a área de resultado criada no HTML
    var resultado = document.getElementById("resultado");

    // Insere as informações do pedido dentro dessa área
    resultado.innerHTML =

        // Mostra uma mensagem confirmando o cálculo
        "<h3>Pedido realizado com sucesso!</h3>" +

        // Mostra o produto escolhido
        "<p>Produto: " + opcoes + "</p>" +

        // Mostra a quantidade escolhida
        "<p>Quantidade: " + quantidade + "</p>" +

        // Mostra as informações de pagamento
        "<p>" + mensagem + "</p>" +

        // Mostra o valor total formatado em reais
        "<h3>Valor total: " +

        total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        }) +

        "</h3>";

}