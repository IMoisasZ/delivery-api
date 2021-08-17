import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

async function insertOrder(order) {
  const data = JSON.parse(await readFile(global.fileName));

  order = {
    id: data.nextId++,
    cliente: order.cliente,
    produto: order.produto,
    valor: order.valor,
    entregue: false,
    timestamp: new Date(),
  };

  data.pedidos.push(order);

  await writeFile(global.fileName, JSON.stringify(data, null, 2));

  return order;
}

async function updateOrder(order) {
  const data = JSON.parse(await readFile(global.fileName));

  const index = data.pedidos.findIndex((a) => a.id === order.id);

  if (index === -1) {
    throw new Error("Registro não encontrado!");
  }

  data.pedidos[index].cliente = order.cliente;
  data.pedidos[index].produto = order.produto;
  data.pedidos[index].valor = order.valor;
  data.pedidos[index].entregue = order.entregue;

  await writeFile(global.fileName, JSON.stringify(data, null, 2));

  return data.pedidos[index];
}

async function updateOrderId(id, status) {
  const data = JSON.parse(await readFile(global.fileName));
  const index = data.pedidos.findIndex((a) => a.id === parseInt(id));

  if (index === -1) {
    throw new Error("Registro não encontrado!");
  }

  data.pedidos[index].entregue = status;

  await writeFile(global.fileName, JSON.stringify(data, null, 2));

  return data.pedidos[index];
}

async function deleteOrder(id) {
  const data = JSON.parse(await readFile(global.fileName));

  data.pedidos = data.pedidos.filter((order) => order.id !== parseInt(id));

  await writeFile(global.fileName, JSON.stringify(data, null, 2));
}

async function searchOrder(id) {
  const data = JSON.parse(await readFile(global.fileName));

  const order = data.pedidos.filter((order) => order.id === parseInt(id));

  return order;
}

async function orderCliente(cliente) {
  const data = JSON.parse(await readFile(global.fileName));

  const clienteOrder = data.pedidos.filter(
    (order) => order.entregue == true && order.cliente === cliente
  );

  let totalPedidos = 0;
  clienteOrder.forEach((valorOrder) => {
    totalPedidos += valorOrder.valor;
  });

  return `${cliente}: ${totalPedidos}`;
}

async function orderProduto(produto) {
  const data = JSON.parse(await readFile(global.fileName));

  const produtoOrder = data.pedidos.filter(
    (prod) => prod.entregue == true && prod.produto === produto
  );

  let dadosProduto = [];
  let totalProdutos = 0;
  produtoOrder.forEach((valorOrder) => {
    totalProdutos += valorOrder.valor;
  });

  dadosProduto.push({
    produto: produto,
    total: totalProdutos,
  });

  return dadosProduto;
}

async function bestSellerProducts() {
    const data = JSON.parse(await readFile(global.fileName));

    const bestSeller = data.pedidos.filter((prod) => prod.entregue == true);
    
    let newList = [];
    bestSeller.forEach((product) => {
        newList.push(product.produto);
    });

    let result = newList.sort().reduce((init, current) => {
        if (init.length === 0 || init[init.length - 1] !== current) {
        init.push(current);
        }
        return init
    }, []);

    let products = []
    let valorTotalProduto = 0
    for(let i = 0; i<result.length; i++){
        for(let j = 0; j<bestSeller.length; j++){
            if(result[i] === bestSeller[j].produto){
                valorTotalProduto += bestSeller[j].valor
            }
        }
        products.push({
            produto: result[i],
            valorTotal: valorTotalProduto
        })
        valorTotalProduto = 0
    }

    products.sort(function (a, b){
        if(b.valorTotal > a.valorTotal){
            return 1
        }
        if(b.valorTotal < a.valorTotal){
            return -1
        }
        return 0;
    })

    return products

}

export default {
  insertOrder,
  updateOrder,
  updateOrderId,
  deleteOrder,
  searchOrder,
  orderCliente,
  orderProduto,
  bestSellerProducts,
};
